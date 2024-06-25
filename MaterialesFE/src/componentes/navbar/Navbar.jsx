import 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/registro">Registro</Link></li>
          <li><Link to= "/listaUsuarios">Lista de Usuarios</Link></li>
          <li><Link to= "/CrearPerfil">CrearPerfil</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
