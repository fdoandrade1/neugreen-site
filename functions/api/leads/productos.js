export async function onRequestPost({ request }) {
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

    console.log('Lead productos Neugreen:', lead);

    return Response.redirect(new URL('/gracias-productos', request.url), 303);
  } catch (error) {
    console.error('Error al procesar lead de productos:', error);
    return new Response('Error al procesar la solicitud', { status: 500 });
  }
}
