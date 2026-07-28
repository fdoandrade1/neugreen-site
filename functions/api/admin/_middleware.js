// functions/api/admin/_middleware.js
//
// Corre ANTES que cualquier endpoint bajo /api/admin/. Cloudflare Access ya
// bloquea estas rutas en el borde; aquí se vuelve a verificar la firma del
// JWT en cada petición como defensa en profundidad. Si alguien alcanzara el
// Function por otra vía —una regla de Access mal aplicada, una petición
// interna—, sin token válido no pasa.
//
// El email SIEMPRE sale del token verificado, nunca del body: es lo que se
// escribe en actualizado_por y editado_por.

import { verificarJwtAccess } from './_lib/jwt.js';
import { error } from './_lib/http.js';

function normalizarDominioEquipo(valor) {
  const v = String(valor || '').trim().replace(/^https?:\/\//, '').replace(/\/+$/, '');
  if (!v) return '';
  return v.includes('.') ? v : `${v}.cloudflareaccess.com`;
}

function leerCookie(request, nombre) {
  const cookies = request.headers.get('Cookie') || '';
  for (const parte of cookies.split(';')) {
    const [k, ...resto] = parte.trim().split('=');
    if (k === nombre) return resto.join('=');
  }
  return null;
}

export async function onRequest(context) {
  const { request, env } = context;

  // --- configuración ---
  const dominioEquipo = normalizarDominioEquipo(env.CF_ACCESS_TEAM_DOMAIN);
  const aud = String(env.CF_ACCESS_AUD || '').trim();

  if (!dominioEquipo || !aud) {
    // Config incompleta: fallar cerrado y decir exactamente qué falta.
    const faltan = [
      !dominioEquipo && 'CF_ACCESS_TEAM_DOMAIN',
      !aud && 'CF_ACCESS_AUD',
    ].filter(Boolean);
    return error(500, 'La API editorial no está configurada', { variables_faltantes: faltan });
  }

  if (!env.DB) {
    return error(500, 'Falta el binding D1 "DB"');
  }

  // --- token ---
  const token = request.headers.get('Cf-Access-Jwt-Assertion') || leerCookie(request, 'CF_Authorization');
  if (!token) {
    return error(403, 'Sin credencial de Access');
  }

  let claims;
  try {
    claims = await verificarJwtAccess(token, dominioEquipo, aud);
  } catch (e) {
    // El motivo se registra pero no se devuelve: no ayudamos a afinar un ataque.
    console.warn('Access JWT rechazado:', e && e.message ? e.message : String(e));
    return error(403, 'Credencial de Access inválida');
  }

  const email = String(claims.email || '').toLowerCase();
  if (!email.endsWith('@neugreen.mx')) {
    console.warn('Email fuera de dominio:', email);
    return error(403, 'Cuenta no autorizada');
  }

  context.data.usuario = { email, sub: claims.sub || null };

  return await context.next();
}
