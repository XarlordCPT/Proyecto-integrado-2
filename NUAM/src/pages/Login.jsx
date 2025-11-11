import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo_Nuam from "../assets/Logo_Nuam.png";
import Logo_Inacap from "../assets/Logo_Inacap.png";
import UserIcon from "../components/UserIcon";
import { useAuth } from "../context/AuthContext";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function onLoginSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(username, password);
      
      if (result.success) {
        navigate("/mantenedor");
      } else {
        setError(result.error || "Error al iniciar sesión");
      }
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="min-h-[100dvh]">
      <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 min-h-[100dvh]">
        <section className="bg-[var(--fondo)] text-black grid place-items-center p-8">
          <div className="text-center space-y-2">
            <img src={Logo_Nuam} alt="Logo" className="h-15 w-auto max-w-[400px] " />
            
            <section className="p-10"></section>
            
            <span className="inline-flex items-center gap-2 font-bold text-black ">
              <span> Made By: </span>
              <img src={Logo_Inacap} alt="Logo" className="h-10 w-auto max-w-[400px]" />
            </span>

            <section className="p-10"></section>

            <span className="inline-flex items-center gap-3 font-bold ">
              <span> Powered By: </span>
              <ul className="text-justify">
                <li>Duarte Benjamin</li>
                <li>Medina Cristobal</li>
                <li>Villalobos Patricio</li>
              </ul>
            </span>
          </div>
        </section>
        <section className="bg-[var(--nar)] grid place-items-center p-8">

          <div className="relative w-full h-[500px] max-w-md bg-white rounded-2xl shadow-xl  p-8 md:p-10 pt-12">
            <section className="p-5"></section>
            <div className="relative -top-6 left-1/2 -translate-x-1/2
                            h-16 w-16 rounded-full grid place-items-center
                            bg-[var(--nar)]">
              <UserIcon className="h-6 w-6" />
            </div>
              
            <div className="text-center">
              <h2 className="text-xl font-semibold text-slate-800">Iniciar sesión</h2>
              <p className="text-sm text-slate-500">Usa tus credenciales</p>
            </div>


            <form onSubmit={onLoginSubmit} className="mt-6 space-y-4">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
                  {error}
                </div>
              )}
              <input
                className="w-full rounded border border-slate-300 bg-white px-3 py-2"
                placeholder="Usuario"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
              />
              <input
                className="w-full rounded border border-slate-300 bg-white px-3 py-2"
                placeholder="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button 
                type="submit" 
                className="w-full rounded bg-[var(--nar)] py-2.5 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </button>
            </form>


          </div>

        </section>
      </div>
    </div>
  );
}


