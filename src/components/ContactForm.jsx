import Button from './Button.jsx';

export default function ContactForm() {
  return (
    <form
      name="contacto-neugreen"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      className="rounded-md border border-neugreen-line bg-white p-5 shadow-industrial sm:p-7"
    >
      <input type="hidden" name="form-name" value="contacto-neugreen" />
      <p className="hidden">
        <label>
          No llenar: <input name="bot-field" />
        </label>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-neugreen-ink">
          Nombre
          <input className="focus-ring rounded-md border border-neugreen-line px-4 py-3 font-medium" name="nombre" required />
        </label>
        <label className="grid gap-2 text-sm font-bold text-neugreen-ink">
          Empresa
          <input className="focus-ring rounded-md border border-neugreen-line px-4 py-3 font-medium" name="empresa" required />
        </label>
        <label className="grid gap-2 text-sm font-bold text-neugreen-ink">
          Teléfono
          <input className="focus-ring rounded-md border border-neugreen-line px-4 py-3 font-medium" name="telefono" type="tel" required />
        </label>
        <label className="grid gap-2 text-sm font-bold text-neugreen-ink">
          Correo
          <input className="focus-ring rounded-md border border-neugreen-line px-4 py-3 font-medium" name="correo" type="email" required />
        </label>
      </div>

      <label className="mt-5 grid gap-2 text-sm font-bold text-neugreen-ink">
        Línea de interés
        <select className="focus-ring rounded-md border border-neugreen-line px-4 py-3 font-medium" name="linea" required>
          <option value="">Seleccionar</option>
          <option>Productos</option>
          <option>Maquila</option>
          <option>Industrial</option>
        </select>
      </label>

      <label className="mt-5 grid gap-2 text-sm font-bold text-neugreen-ink">
        Mensaje
        <textarea
          className="focus-ring min-h-36 rounded-md border border-neugreen-line px-4 py-3 font-medium"
          name="mensaje"
          required
        />
      </label>

      <Button type="submit" variant="dark" className="mt-6 w-full sm:w-auto">
        Enviar solicitud
      </Button>
    </form>
  );
}
