import Button from './Button.jsx';

export default function ContactForm() {
  return (
    <form name="contacto-neugreen" method="POST" data-netlify="true"
      netlify-honeypot="bot-field"
      className="rounded-xl border border-ng-line bg-white p-6 shadow-lift sm:p-8">
      <input type="hidden" name="form-name" value="contacto-neugreen" />
      <p className="hidden"><label>No llenar: <input name="bot-field" /></label></p>

      <div className="grid gap-5 sm:grid-cols-2">
        {[
          { label: 'Nombre *',  name: 'nombre',  type: 'text',  ph: 'Tu nombre' },
          { label: 'Empresa *', name: 'empresa', type: 'text',  ph: 'Nombre de la empresa' },
          { label: 'Teléfono *',name: 'telefono',type: 'tel',   ph: '444 000 0000' },
          { label: 'Correo *',  name: 'correo',  type: 'email', ph: 'correo@empresa.com' },
        ].map(({ label, name, type, ph }) => (
          <label key={name} className="flex flex-col gap-1.5 text-sm font-semibold text-ng-ink">
            {label}
            <input type={type} name={name} placeholder={ph} required
              className="focus-ring rounded-lg border border-ng-line px-4 py-3 text-sm font-normal placeholder:text-ng-steel/50 focus:border-ng-blue transition" />
          </label>
        ))}
      </div>

      <label className="mt-5 flex flex-col gap-1.5 text-sm font-semibold text-ng-ink">
        Línea de interés *
        <select name="linea" required
          className="focus-ring rounded-lg border border-ng-line px-4 py-3 text-sm font-normal focus:border-ng-blue transition">
          <option value="">Seleccionar línea…</option>
          <option value="Productos">Productos de línea (limpieza y desinfección)</option>
          <option value="Maquila">Maquila y marca privada</option>
          <option value="Industrial">Soluciones industriales y tratamiento de agua</option>
        </select>
      </label>

      <label className="mt-5 flex flex-col gap-1.5 text-sm font-semibold text-ng-ink">
        Mensaje o requerimiento *
        <textarea name="mensaje" required placeholder="Describe tu necesidad: tipo de cliente, volúmenes estimados, sector…"
          className="focus-ring min-h-[120px] rounded-lg border border-ng-line px-4 py-3 text-sm font-normal placeholder:text-ng-steel/50 focus:border-ng-blue transition resize-none" />
      </label>

      <div className="mt-6 flex items-center justify-between gap-4">
        <Button type="submit" variant="dark" className="sm:w-auto">
          Enviar solicitud →
        </Button>
        <p className="text-xs text-ng-steel">Respondemos en máx. 24 horas hábiles.</p>
      </div>
    </form>
  );
}
