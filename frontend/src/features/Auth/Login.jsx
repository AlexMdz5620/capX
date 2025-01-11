import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/apiService";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  // Manejo de errores
  const [error, setError] = useState("");
  // Manejar el estado para la carga
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setError(""); 
    try {
      const data = await loginUser(credentials);
      alert("Inicio de sesión exitoso");
      console.log(data);
      navigate("/"); 
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Correo o contraseña incorrectos. Inténtalo de nuevo."); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="form-login">
        <h2>Inicio de Sesión</h2>
        {error && <p className="error">{error}</p>}
        <label>
          Correo:
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>
        <div className="form-buttons">
          <button type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
          <button type="button" onClick={() => navigate("/register")} disabled={loading}>
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
