// _lib/jwt.js — verificación del JWT de Cloudflare Access (RS256) con WebCrypto.
//
// Access ya bloquea la ruta en el borde, pero verificamos la firma en cada
// petición como defensa en profundidad: si alguien alcanzara el Function por
// otra vía (bypass de reglas, request interno), sin JWT válido no pasa.

// Caché de JWKS por dominio de equipo. Los Functions reutilizan el isolate
// entre peticiones, así que esto evita ir por las llaves en cada request.
const cacheJwks = new Map(); // dominio -> { llaves, expira }
const TTL_JWKS_MS = 60 * 60 * 1000; // 1 h

/**
 * Normaliza la configuración de audiencias a una lista.
 *
 * El AUD es POR APLICACIÓN de Access, y hay más de una en juego: la app que
 * protege el dominio de producción y la que Pages crea sola al restringir los
 * despliegues de preview ("neugreen-site - Cloudflare Pages"). Cada una firma
 * tokens con su propio aud, así que la configuración admite varios separados
 * por coma. Un solo valor sin comas sigue funcionando igual.
 *
 * @param {string|string[]} valor
 * @returns {string[]}
 */
export function normalizarAudiencias(valor) {
  const lista = Array.isArray(valor) ? valor : String(valor || '').split(',');
  return lista.map((a) => String(a).trim()).filter(Boolean);
}

function base64UrlADatos(s) {
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/');
  const pad = b64.length % 4 ? '='.repeat(4 - (b64.length % 4)) : '';
  const bin = atob(b64 + pad);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function base64UrlAJson(s) {
  return JSON.parse(new TextDecoder().decode(base64UrlADatos(s)));
}

async function obtenerLlaves(teamDomain) {
  const ahora = Date.now();
  const cacheado = cacheJwks.get(teamDomain);
  if (cacheado && cacheado.expira > ahora) return cacheado.llaves;

  const url = `https://${teamDomain}/cdn-cgi/access/certs`;
  const res = await fetch(url, { cf: { cacheTtl: 3600 } });
  if (!res.ok) throw new Error(`No se pudieron leer las llaves de Access (${res.status})`);

  const cuerpo = await res.json();
  const llaves = cuerpo.keys || [];
  if (!llaves.length) throw new Error('El endpoint de certs no devolvió llaves');

  cacheJwks.set(teamDomain, { llaves, expira: ahora + TTL_JWKS_MS });
  return llaves;
}

/**
 * Verifica el JWT de Access y devuelve sus claims.
 * Lanza Error con mensaje descriptivo si algo no cuadra.
 *
 * @param {string} token  valor del header Cf-Access-Jwt-Assertion
 * @param {string} teamDomain  ej. "neugreen.cloudflareaccess.com"
 * @param {string|string[]} aud  uno o varios Application Audience Tag
 *        (cadena separada por comas o arreglo)
 */
export async function verificarJwtAccess(token, teamDomain, aud) {
  const partes = String(token).split('.');
  if (partes.length !== 3) throw new Error('El token no tiene formato JWT');

  const [cabeceraB64, cargaB64, firmaB64] = partes;

  let cabecera, carga;
  try {
    cabecera = base64UrlAJson(cabeceraB64);
    carga = base64UrlAJson(cargaB64);
  } catch {
    throw new Error('No se pudo decodificar el token');
  }

  if (cabecera.alg !== 'RS256') throw new Error(`Algoritmo no admitido: ${cabecera.alg}`);
  if (!cabecera.kid) throw new Error('El token no trae kid');

  // --- firma ---
  const llaves = await obtenerLlaves(teamDomain);
  const jwk = llaves.find((k) => k.kid === cabecera.kid);
  if (!jwk) throw new Error('El kid del token no corresponde a ninguna llave vigente');

  const llave = await crypto.subtle.importKey(
    'jwk',
    jwk,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify'],
  );

  const firmado = new TextEncoder().encode(`${cabeceraB64}.${cargaB64}`);
  const ok = await crypto.subtle.verify(
    'RSASSA-PKCS1-v1_5',
    llave,
    base64UrlADatos(firmaB64),
    firmado,
  );
  if (!ok) throw new Error('Firma inválida');

  // --- expiración / vigencia (30 s de tolerancia por desfase de reloj) ---
  const ahora = Math.floor(Date.now() / 1000);
  const margen = 30;
  if (typeof carga.exp !== 'number') throw new Error('El token no trae exp');
  if (carga.exp + margen < ahora) throw new Error('El token expiró');
  if (typeof carga.nbf === 'number' && carga.nbf - margen > ahora) throw new Error('El token aún no es válido');
  if (typeof carga.iat === 'number' && carga.iat - margen > ahora) throw new Error('El token viene del futuro');

  // --- audiencia ---
  // Basta con que UNA de las audiencias del token esté entre las permitidas:
  // preview y producción son aplicaciones de Access distintas y cada una
  // firma con su propio aud. El estándar permite que aud venga como arreglo.
  const permitidas = normalizarAudiencias(aud);
  if (!permitidas.length) throw new Error('No hay audiencias configuradas');

  const delToken = (Array.isArray(carga.aud) ? carga.aud : [carga.aud])
    .map((a) => String(a).trim())
    .filter(Boolean);

  if (!delToken.some((a) => permitidas.includes(a))) {
    throw new Error(
      `La audiencia del token no coincide con ninguna de las ${permitidas.length} configuradas`,
    );
  }

  // --- emisor ---
  const emisorEsperado = `https://${teamDomain}`;
  if (carga.iss !== emisorEsperado) throw new Error('El emisor del token no coincide');

  if (!carga.email) throw new Error('El token no trae email');

  return carga;
}
