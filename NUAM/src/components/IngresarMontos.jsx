import { useState, useEffect } from "react";

export default function IngresarMontos({ onClose, onSubmit, selectedData }) {
  const [form, setForm] = useState({
    ejercicio: "",
    instrumento: "",
    fechaPago: "",
    descripcion: "",
    mercado: "",
    origen: "",
    periodo: "",
    secuencia: "",
    factores: {},
  });

  const [showConfirm, setShowConfirm] = useState(false);

  // ✅ Precargar datos si viene algo seleccionado
  useEffect(() => {
    if (selectedData) {
      const prefill = {
        id: selectedData.id,
        ejercicio: selectedData.ejercicio,
        instrumento: selectedData.instrumento,
        fechaPago: selectedData.fechaPago,
        descripcion: selectedData.descripcion,
        mercado: selectedData.mercado,
        origen: selectedData.origen,
        periodo: selectedData.periodo,
        secuencia: selectedData.secuencia,
        factores: {}, // Inicializamos vacío para los factores
      };

      // Cargar factores
      for (let i = 8; i <= 37; i++) {
        prefill.factores[`factor${i}`] = selectedData[`factor${i}`] || "";
      }

      setForm(prefill);
    }
  }, [selectedData]);

  // ✅ Manejo de cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFactorChange = (i, val) => {
    setForm((f) => ({
      ...f,
      factores: { ...f.factores, [`factor${i}`]: val },
    }));
  };

  // ✅ Cálculo de factores (simplemente genera números aleatorios por ahora)
  const recalcularFactores = () => {
    const nuevos = {};
    for (let i = 8; i <= 37; i++) {
      nuevos[`factor${i}`] = (Math.random() * 1.5 + 0.5).toFixed(2);
    }
    setForm((f) => ({ ...f, factores: nuevos }));
  };

  const handleConfirm = () => setShowConfirm(true);

  const confirmarGuardar = () => {
    console.log("GUARDAR → Registro actualizado o nuevo:", form);
    onSubmit({ ...form, ...form.factores });
    setShowConfirm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-[#F4F4F4] border border-gray-300 rounded-md shadow-lg w-[900px] max-h-[90vh] overflow-y-auto relative">
        <div className="border-b border-gray-300 bg-white px-5 py-2 flex justify-between">
          <h2 className="text-[var(--nar)] font-bold text-[16.5px]">
            {selectedData ? "Modificar Registro" : "Ingresar por Montos"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black font-bold text-lg"
          >
            ×
          </button>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="p-5 space-y-5">
          {/* Campos de texto previos */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="font-medium">Mercado:</label>
              <input
                name="mercado"
                value={form.mercado}
                onChange={handleChange}
                className="w-full border p-1 rounded"
                type="text"
              />
            </div>

            <div>
              <label className="font-medium">Instrumento:</label>
              <input
                name="instrumento"
                value={form.instrumento}
                onChange={handleChange}
                className="w-full border p-1 rounded"
                type="text"
              />
            </div>

            <div>
              <label className="font-medium">Descripción:</label>
              <input
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                className="w-full border p-1 rounded"
                type="text"
              />
            </div>

            <div>
              <label className="font-medium">Fecha Pago:</label>
              <input
                name="fechaPago"
                type="date"
                value={form.fechaPago}
                onChange={handleChange}
                className="w-full border p-1 rounded"
              />
            </div>

            <div>
              <label className="font-medium">Secuencia:</label>
              <input
                name="secuencia"
                value={form.secuencia}
                onChange={handleChange}
                className="w-full border p-1 rounded"
                type="text"
              />
            </div>

            <div>
              <label className="font-medium">Dividendo:</label>
              <input
                name="dividendo"
                value={form.dividendo}
                onChange={handleChange}
                className="w-full border p-1 rounded"
                type="text"
              />
            </div>

            <div>
              <label className="font-medium">Valor Histórico:</label>
              <input
                name="valorHistorico"
                value={form.valorHistorico}
                onChange={handleChange}
                className="w-full border p-1 rounded"
                type="text"
              />
            </div>
          </div>

          {/* Factores */}
          <div className="p-5">
            <h3 className="font-semibold text-[var(--nar)] mb-2">Factores</h3>
            <div className="grid grid-cols-6 gap-2 max-h-[250px] overflow-y-auto border p-3 rounded">
              {Array.from({ length: 30 }, (_, i) => {
                const n = i + 8;
                return (
                  <div key={n} className="flex flex-col">
                    <label className="text-xs text-gray-600">Factor-{n}</label>
                    <input
                      value={form.factores[`factor${n}`] || ""}
                      onChange={(e) => handleFactorChange(n, e.target.value)}
                      className="border p-1 rounded text-sm"
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end mt-4 gap-3">
              <button
                onClick={recalcularFactores}
                className="bg-[var(--nar)] text-white font-semibold px-5 py-1.5 rounded hover:opacity-90"
              >
                Recalcular
              </button>
              <button
                onClick={handleConfirm}
                className="bg-[var(--nar)] text-white font-semibold px-5 py-1.5 rounded hover:opacity-90"
              >
                Guardar
              </button>
              <button
                onClick={onClose}
                className="border border-gray-400 px-5 py-1.5 rounded hover:bg-gray-100"
              >
                Cancelar
              </button>
            </div>
          </div>

          {/* Confirmación */}
          {showConfirm && (
            <div className="absolute inset-0 bg-black/30 flex justify-center items-center">
              <div className="bg-[#F4F4F4] border border-gray-400 rounded-md shadow-lg px-10 py-6 text-center">
                <h3 className="text-[var(--nar)] font-bold mb-4">
                  ¿Desea guardar los cambios realizados?
                </h3>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={confirmarGuardar}
                    className="bg-[var(--nar)] text-white font-semibold px-5 py-1.5 rounded hover:opacity-90"
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="border border-gray-400 px-5 py-1.5 rounded hover:bg-gray-100"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
