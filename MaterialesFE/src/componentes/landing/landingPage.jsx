import  { useState } from 'react';
import './landingPage.css';
import { iniciarSesion } from "../../services/login/iniciarSesion";
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [emailUsuario, setEmailUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userData = await iniciarSesion(emailUsuario, password);
      console.log('Usuario autenticado:', userData);
      navigate('/dashboard');
    } catch (error) {
      setError('Credenciales inválidas. Por favor, intenta nuevamente.');
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="landing-page">
      <div className="card"> 
        <h3>Iniciar Sesión</h3>
        <div className="card-body">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="emailUsuario">Email:</label>
              <input
                type="text"
                id="emailUsuario"
                value={emailUsuario}
                onChange={(e) => setEmailUsuario(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />      
            </div> 
            {error && <p className="error-message">{error}</p>}
            <button type="submit">Ingresar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
