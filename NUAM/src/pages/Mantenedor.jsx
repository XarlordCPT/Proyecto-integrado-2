import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { initialCalificaciones } from "../data/calificaciones";
import UserIcon from "../components/UserIcon";
import { useNavigate } from "react-router-dom";

// MODALES
import Ingresar from "../components/Ingresar";
import IngresarMontos from "../components/IngresarMontos";
import IngresarFactores from "../components/IngresarFactores";
import Cargar from "../components/Cargar";

export default function Mantenedor() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    ejercicio: "",
    instrumento: "",
    fechaPago: "",
    descripcion: "",
    mercado: "",
    origen: "",
    periodo: "",
  });

  const [selectedRow, setSelectedRow] = useState(null);

  // Modales (idénticos a tu versión)
  const [showModal, setShowModal] = useState(false);
  const [showModalMontos, setShowModalMontos] = useState(false);
  const [showModalFactores, setShowModalFactores] = useState(false);
  const [showModalCarga, setShowModalCarga] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("calificaciones");
    if (stored) {
      setData(JSON.parse(stored));
    } else {
      localStorage.setItem("calificaciones", JSON.stringify(initialCalificaciones));
      setData(initialCalificaciones);
    }
  }, []);

  // agregar / modificar / eliminar registros (igual a tu lógica)
  const handleAgregar = (nuevo) => {
    const registro = {
      id: nuevo.id ?? data.length + 1,
      ejercicio: nuevo.año || nuevo.ejercicio || 2025,
      instrumento: nuevo.instrumento || "Nuevo Registro Tributario",
      fechaPago: nuevo.fechaPago || "2025-11-09",
      descripcion: nuevo.descripcion || "Registro añadido desde el mantenedor.",
      mercado: nuevo.mercado || "Primario",
      origen: nuevo.origen || "Nacional",
      periodo: nuevo.periodo || "Trimestre 1",
      secuencia: nuevo.secuencia || "SEQ-" + (2000 + data.length),
      ...Object.fromEntries(
        Array.from({ length: 30 }, (_, j) => [
          `factor${j + 8}`,
          nuevo[`factor${j + 8}`] || (Math.random() * 1.8 + 0.2).toFixed(2),
        ])
      ),
    };

    // Edición si hay fila seleccionada
    if (selectedRow) {
      const updated = data.map((r) => (r.id === selectedRow.id ? registro : r));
      setData(updated);
      localStorage.setItem("calificaciones", JSON.stringify(updated));
      setSelectedRow(null);
    } else {
      const updated = [...data, registro];
      setData(updated);
      localStorage.setItem("calificaciones", JSON.stringify(updated));
    }
  };

  const handleEliminar = () => {
    if (!selectedRow) return;
    setShowConfirmDelete(true);
  };

  const confirmarEliminar = () => {
    const updated = data.filter((r) => r.id !== selectedRow.id);
    setData(updated);
    localStorage.setItem("calificaciones", JSON.stringify(updated));
    setSelectedRow(null);
    setShowConfirmDelete(false);
  };

  const handleLogout = () => {
    console.log("CERRAR SESIÓN → usuario desconectado");
    navigate("/login");
  };

  const handleClearFilters = () => {
    setFilters({
      ejercicio: "",
      instrumento: "",
      fechaPago: "",
      descripcion: "",
      mercado: "",
      origen: "",
      periodo: "",
    });
  };

  const filteredData = data.filter((item) =>
    Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      return item[key]?.toString().toLowerCase().includes(value.toLowerCase());
    })
  );

  const columns = [
    { name: "Ejercicio", selector: (row) => row.ejercicio, width: "100px" },
    { name: "Instrumento", selector: (row) => row.instrumento, width: "150px" },
    { name: "Fecha Pago", selector: (row) => row.fechaPago, width: "130px" },
    { name: "Descripción", selector: (row) => row.descripcion, width: "220px" },
    { name: "Secuencia", selector: (row) => row.secuencia, width: "120px" },
    ...Array.from({ length: 30 }, (_, i) => ({
      name: `Factor-${i + 8}`,
      selector: (row) => row[`factor${i + 8}`],
      width: "110px",
    })),
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "var(--fondo)",
        color: "#000",
        fontWeight: "bold",
        borderRight: "1px solid #ccc",
        whiteSpace: "nowrap",
      },
    },
    cells: {
      style: {
        borderRight: "1px solid #ddd",
        padding: "6px 8px",
        whiteSpace: "nowrap",
      },
    },
  };

  return (
    <div className="min-h-screen bg-[var(--fondo)] flex flex-col">
      {/* Header */}
      <div className="bg-[#323232] p-4 flex justify-between items-center text-white">
        <h1 className="font-bold text-lg">Mantenedor de Calificaciones Tributarias</h1>
        <div className="flex items-center gap-2">
          <UserIcon className="h-6 w-6 text-[var(--nar)]" />
          <button
            onClick={handleLogout}
            className="bg-[var(--nar)] text-black px-3 py-1 rounded font-semibold hover:opacity-90"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="flex flex-1 p-6 gap-6">
        {/* Panel lateral (mismos espacios que tenías) */}
        <aside className="w-[220px] bg-white p-4 rounded-lg shadow-md flex flex-col gap-3">
          <label className="text-sm font-semibold">Mercado:</label>
          <select
            value={filters.mercado}
            onChange={(e) => setFilters({ ...filters, mercado: e.target.value })}
            className="border p-1 rounded text-sm"
          >
            <option value="">Seleccionar</option>
            <option value="Primario">Primario</option>
            <option value="Secundario">Secundario</option>
          </select>

          <label className="text-sm font-semibold">Origen:</label>
          <select
            value={filters.origen}
            onChange={(e) => setFilters({ ...filters, origen: e.target.value })}
            className="border p-1 rounded text-sm"
          >
            <option value="">Seleccionar</option>
            <option value="Nacional">Nacional</option>
            <option value="Internacional">Internacional</option>
          </select>

          <label className="text-sm font-semibold">Periodo:</label>
          <select
            value={filters.periodo}
            onChange={(e) => setFilters({ ...filters, periodo: e.target.value })}
            className="border p-1 rounded text-sm"
          >
            <option value="">Seleccionar</option>
            <option value="Trimestre 1">Trimestre 1</option>
            <option value="Trimestre 2">Trimestre 2</option>
            <option value="Trimestre 3">Trimestre 3</option>
            <option value="Trimestre 4">Trimestre 4</option>
          </select>

          <section className="p-2"></section>
          <button className="bg-[var(--nar)] text-white rounded py-1 text-sm mt-2 hover:opacity-90">
            Buscar
          </button>

          <section className="p-2"></section>
          <button
            onClick={handleClearFilters}
            className="bg-[var(--nar)] rounded py-1 text-sm text-white hover:opacity-90"
          >
            Limpiar filtros
          </button>

          <section className="p-7"></section>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[var(--nar)] text-white rounded py-1 text-sm hover:opacity-90"
          >
            Ingresar
          </button>

          <section className="p-2"></section>
          <button
            onClick={() => setShowModalCarga(true)}
            className="bg-white border text-black rounded py-1 text-sm hover:bg-gray-100"
          >
            Carga
          </button>

          <section className="p-7"></section>
          <button
            onClick={() => selectedRow && setShowModalMontos(true)}
            disabled={!selectedRow}
            className={`border rounded py-1 text-sm ${
              selectedRow
                ? "bg-white text-black hover:bg-gray-100"
                : "bg-gray-200 text-gray-500 cursor-not-allowed opacity-50"
            }`}
          >
            Modificar
          </button>

          <section className="p-2"></section>
          <button
            onClick={handleEliminar}
            disabled={!selectedRow}
            className={`rounded py-1 text-sm ${
              selectedRow
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-red-300 text-white opacity-50 cursor-not-allowed"
            }`}
          >
            Eliminar
          </button>
        </aside>

        {/* Tabla */}
        <main className="flex-1 bg-white rounded-lg shadow-md p-3 overflow-x-auto">
          <DataTable
            columns={columns}
            data={filteredData}
            customStyles={customStyles}
            dense
            highlightOnHover
            selectableRows
            selectableRowsSingle
            onSelectedRowsChange={(state) => {
              setSelectedRow(state.selectedRows[0] || null);
            }}
            fixedHeader
            fixedHeaderScrollHeight="calc(100vh - 250px)"
          />
        </main>
      </div>

      {/* MODALES (idénticos a tu wiring original) */}
      {showModal && (
        <Ingresar
          onClose={() => setShowModal(false)}
          onSubmit={handleAgregar}
          onMontos={() => {
            setShowModal(false);
            setShowModalMontos(true);
          }}
          onFactores={() => {
            setShowModal(false);
            setShowModalFactores(true);
          }}
        />
      )}

      {showModalMontos && (
        <IngresarMontos
          onClose={() => setShowModalMontos(false)}
          onSubmit={handleAgregar}
          selectedData={selectedRow}
        />
      )}

      {showModalFactores && (
        <IngresarFactores
          onClose={() => setShowModalFactores(false)}
          onSubmit={handleAgregar}
        />
      )}

      {showModalCarga && (
        <Cargar
          onClose={() => setShowModalCarga(false)}
          onSubmit={(nuevos) => {
            const updated = [...data, ...nuevos];
            setData(updated);
            localStorage.setItem("calificaciones", JSON.stringify(updated));
          }}
        />
      )}

      {/* CONFIRMAR ELIMINACIÓN (igual al que ya usabas) */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white border border-gray-300 rounded-lg shadow-xl w-[420px] p-6 text-center relative">
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 text-red-600 rounded-full h-14 w-14 flex items-center justify-center text-3xl">
                ⚠️
              </div>
            </div>

            <h3 className="text-red-600 font-bold text-lg mb-2">
              ¿Eliminar registro permanentemente?
            </h3>
            <p className="text-gray-600 text-sm mb-5 px-4">
              Esta acción <span className="font-semibold text-red-500">no se puede deshacer</span>.
              El registro seleccionado será eliminado de forma permanente del mantenedor.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={confirmarEliminar}
                className="bg-red-500 text-white font-semibold px-6 py-2 rounded hover:bg-red-600 transition-all"
              >
                Eliminar
              </button>
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="border border-gray-400 px-6 py-2 rounded hover:bg-gray-100 transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
