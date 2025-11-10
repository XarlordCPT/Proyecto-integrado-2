import { useState } from "react";

export default function IngresarFactores({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    mercado: "",
    instrumento: "",
    fechaPago: "",
    eventoCapital: "",
    descripcion: "",
    valorHistorico: "",
    año: "",
    secuencia: "",
    factores: Object.fromEntries(
      Array.from({ length: 30 }, (_, i) => [`factor${i + 8}`, ""])
    ),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFactorChange = (e, key) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      factores: { ...prev.factores, [key]: value },
    }));
  };

  const handleGrabar = () => {
    console.log("GRABAR → Calificación por Factores:", formData);
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-[#F4F4F4] border border-gray-300 rounded-md shadow-lg w-[850px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-300 bg-white px-5 py-2">
          <h2 className="text-[var(--nar)] font-bold text-[16.5px]">
            Ingresar Calificación Por Factores
          </h2>
        </div>

        {/* Contenido */}
        <div className="p-6 text-[14px]">
          {/* Campos principales superiores */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-4">
            {/* Columna izquierda */}
            <div className="flex flex-col gap-2">
              <label className="flex flex-col">
                Mercado:
                <input
                  name="mercado"
                  value={formData.mercado}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-2 py-1 bg-white"
                />
              </label>

              <label className="flex flex-col">
                Fecha Pago:
                <input
                  type="date"
                  name="fechaPago"
                  value={formData.fechaPago}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-2 py-1 bg-white"
                />
              </label>

              <label className="flex flex-col">
                Secuencia Evento:
                <input
                  name="secuencia"
                  value={formData.secuencia}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-2 py-1 bg-white"
                />
              </label>
            </div>

            {/* Columna derecha */}
            <div className="flex flex-col gap-2">
              <label className="flex flex-col">
                Instrumento:
                <input
                  name="instrumento"
                  value={formData.instrumento}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-2 py-1 bg-white"
                />
              </label>

              <label className="flex flex-col">
                Descripción:
                <input
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-2 py-1 bg-white"
                />
              </label>

              <label className="flex flex-col">
                Valor Histórico:
                <input
                  name="valorHistorico"
                  value={formData.valorHistorico}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-2 py-1 bg-white"
                />
              </label>
            </div>
          </div>

          {/* Factores 08–37 */}
          <div className="grid grid-cols-6 gap-2">
            {Object.keys(formData.factores).map((key, i) => (
              <label key={key} className="flex flex-col text-[13px]">
                {`Factor - ${i + 8}:`}
                <input
                  value={formData.factores[key]}
                  onChange={(e) => handleFactorChange(e, key)}
                  className="border border-gray-300 rounded px-1 py-1 bg-white text-sm"
                />
              </label>
            ))}
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 mt-5">
            <button
              onClick={handleGrabar}
              className="bg-[var(--nar)] text-white font-semibold px-6 py-1.5 rounded hover:opacity-90"
            >
              Grabar
            </button>
            <button
              onClick={onClose}
              className="border border-gray-400 px-6 py-1.5 rounded hover:bg-gray-100"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
