import React from 'react';
import LandingPage from './componentes/landing/landingPage';
import Dashboard from './componentes/dashboard/dashborad'
import Navbar from './componentes/navbar/Navbar';
import found from './componentes/found/found';
import RegistroUsuario from './views/registrarUsuario/registrar';
import ListarUsuarios from './views/listarUsers/listarUsuarios';
import CrearPerfil from './views/perfiles/crearPerfil/creapP';



import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import './App.css';

function App() {
  return (
    // <div>
    //   <LandingPage />
    // </div> 
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='/registro' element={<RegistroUsuario />} />
      <Route path='/listaUsuarios' element={<ListarUsuarios />} />
      <Route path='/CrearPerfil' element= {<CrearPerfil />} />
      <Route path='**' element={<found/>}/>
    </Routes>
  </Router>
  );
}

export default App;
