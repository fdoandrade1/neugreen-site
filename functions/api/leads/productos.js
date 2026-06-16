async function getZohoAccessToken(env) {
  const tokenUrl = `${env.ZOHO_ACCOUNTS_URL}/oauth/v2/token`;
  const body = new URLSearchParams({
    refresh_token: env.ZOHO_REFRESH_TOKEN,
    client_id: env.ZOHO_CLIENT_ID,
    client_secret: env.ZOHO_CLIENT_SECRET,
    grant_type: 'refresh_token',
  });

  const response = await fetch(tokenUrl, {
    method: 'POST',
    body,
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || !result.access_token) {
    throw new Error(`Zoho token error ${response.status}: ${JSON.stringify(result)}`);
  }

  return result.access_token;
}

async function createBiginContact(env, accessToken, lead) {
  const contactUrl = `${env.ZOHO_API_DOMAIN}/bigin/v2/Contacts`;
  const payload = {
    data: [
      {
        Last_Name: lead.nombre || 'Lead Web',
        Email: lead.email,
        Mobile: lead.telefono,
        Phone: lead.telefono,
        Account_Name: lead.empresa,
        Description: `Lead web - Productos

Empresa: ${lead.empresa}
Teléfono / WhatsApp: ${lead.telefono}
Correo: ${lead.email}
Línea de interés: ${lead.linea_interes}
Fuente: ${lead.fuente}
Página origen: ${lead.pagina_origen}

Mensaje:
${lead.mensaje}`,
      },
    ],
  };

  const response = await fetch(contactUrl, {
    method: 'POST',
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const resultText = await response.text();
  let result;
  try {
    result = JSON.parse(resultText);
  } catch {
    result = resultText;
  }

  if (!response.ok) {
    console.error('Respuesta Zoho Bigin no exitosa', {
      status: response.status,
      statusText: response.statusText,
      body: result,
    });
    throw new Error(`Zoho Bigin contact error ${response.status}`);
  }

  return result;
}

export async function onRequestPost({ request, env }) {
  try {
    const formData = await request.formData();
    const lead = {
      nombre: formData.get('nombre') || '',
      empresa: formData.get('empresa') || '',
      telefono: formData.get('telefono') || '',
      email: formData.get('email') || '',
      linea_interes: formData.get('linea_interes') || '',
      mensaje: formData.get('mensaje') || '',
      fuente: formData.get('fuente') || '',
      pagina_origen: formData.get('pagina_origen') || '',
    };

    console.log('Lead productos recibido', lead.email);

    try {
      const accessToken = await getZohoAccessToken(env);
      await createBiginContact(env, accessToken, lead);
      console.log('Contacto creado en Bigin');
    } catch (error) {
      console.error('Error Zoho Bigin', error);
    }

    return Response.redirect(new URL('/gracias-productos', request.url), 303);
  } catch (error) {
    console.error('Error al procesar lead de productos:', error);
    return new Response('Error al procesar la solicitud', { status: 500 });
  }
}
