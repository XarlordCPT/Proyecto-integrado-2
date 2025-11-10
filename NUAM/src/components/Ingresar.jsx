import { useState } from "react";

export default function Ingresar({ onClose, onMontos, onFactores }) {
  const [registro, setRegistro] = useState({
    mercado: "",
    instrumento: "",
    descripcion: "",
    fechaPago: "",
    secuencia: "",
    dividendo: "",
    valorHistorico: "",
    factorActualizacion: "",
    año: "",
    isfut: false,
    ingresoMontos: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistro((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (field) => {
    setRegistro((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const goMontos = () => onMontos(registro); // Traspasar datos al modal Montos
  const goFactores = () => onFactores(registro); // Traspasar datos al modal Factores

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-[#F4F4F4] border border-gray-300 rounded-md shadow-lg w-[850px] max-h-[90vh] overflow-y-auto relative">
        <div className="border-b border-gray-300 bg-white px-5 py-2">
          <h2 className="text-[var(--nar)] font-bold text-[16.5px]">
            Ingresar Calificación
          </h2>
        </div>

        <form className="p-5 space-y-5 text-[15px]">
          <div className="grid grid-cols-2 gap-6">
            {/* Izquierda */}
            <div className="space-y-3">
              <div>
                <label className="font-medium">Mercado:</label>
                <input
                  name="mercado"
                  value={registro.mercado}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded px-2 py-1"
                  type="text"
                />
              </div>

              <div>
                <label className="font-medium">Instrumento:</label>
                <input
                  name="instrumento"
                  value={registro.instrumento}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded px-2 py-1"
                  type="text"
                />
              </div>

              <div>
                <label className="font-medium">Descripción:</label>
                <input
                  name="descripcion"
                  value={registro.descripcion}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded px-2 py-1"
                  type="text"
                />
              </div>

              <div>
                <label className="font-medium">Fecha Pago:</label>
                <input
                  name="fechaPago"
                  value={registro.fechaPago}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded px-2 py-1"
                  type="date"
                />
              </div>

              <div>
                <label className="font-medium">Secuencia Evento:</label>
                <input
                  name="secuencia"
                  value={registro.secuencia}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded px-2 py-1"
                  type="text"
                />
              </div>

              <div>
                <label className="font-medium">Dividendo:</label>
                <input
                  name="dividendo"
                  value={registro.dividendo}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded px-2 py-1"
                  type="text"
                />
              </div>

              <div>
                <label className="font-medium">Valor Histórico:</label>
                <input
                  name="valorHistorico"
                  value={registro.valorHistorico}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded px-2 py-1"
                  type="text"
                />
              </div>
            </div>

            {/* Derecha */}
            <div className="space-y-3">
              <div>
                <label className="font-medium">Factor de actualización:</label>
                <input
                  name="factorActualizacion"
                  value={registro.factorActualizacion}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded px-2 py-1"
                  type="text"
                />
              </div>

              <div>
                <label className="font-medium">Año:</label>
                <input
                  name="año"
                  value={registro.año}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded px-2 py-1"
                  type="text"
                />
              </div>

              <div className="flex items-center gap-3 mt-4">
                <label className="font-medium">ISFUT:</label>
                <div
                  onClick={() => handleToggle("isfut")}
                  className={`w-10 h-5 rounded-full cursor-pointer transition-all ${
                    registro.isfut ? "bg-[var(--nar)]" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      registro.isfut ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  ></div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="font-medium">Ingreso por Montos:</label>
                <div
                  onClick={() => handleToggle("ingresoMontos")}
                  className={`w-10 h-5 rounded-full cursor-pointer transition-all ${
                    registro.ingresoMontos ? "bg-[var(--nar)]" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      registro.ingresoMontos
                        ? "translate-x-5"
                        : "translate-x-0.5"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Botones inferiores */}
          <div className="flex justify-center gap-6 mt-6">
            {registro.ingresoMontos ? (
              <button
                type="button"
                onClick={goMontos}
                className="bg-[var(--nar)] text-white font-semibold px-6 py-1.5 rounded hover:opacity-90 transition-all"
              >
                Ir a Ingreso por Montos
              </button>
            ) : (
              <button
                type="button"
                onClick={goFactores}
                className="bg-[var(--nar)] text-white font-semibold px-6 py-1.5 rounded hover:opacity-90 transition-all"
              >
                Ir a Ingreso por Factores
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="border border-gray-400 px-6 py-1.5 rounded hover:bg-gray-100 transition-all"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
