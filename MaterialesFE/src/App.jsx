import React from 'react';
import LandingPage from './componentes/landing/landingPage';
import Dashboard from './componentes/dashboard/dashborad'
import Navbar from './componentes/navbar/Navbar';
import found from './componentes/found/found';
import RegistroUsuario from './views/registrarUsuario/registrar';
import ListarUsuarios from './views/listarUsers/listarUsuarios';
import CrearPerfil from './views/perfiles/crearPerfil/creapP';
import CrearMateriales from './views/materiales/crear/crearMaterial';
import ListarMateriales from './views/materiales/listar/listarMateriales';
import CrearAsignarMateriales from './views/asignarMateriales/crear/crearAsignarMateriales';
import ListaMaterialesAsignados from './views/asignarMateriales/listar/listarSignarMaterial';
import ListarMaterialesPorUsuario from './views/asignarMateriales/listar/listarXestudiante/listar';

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
      <Route path='/CrearMateriales' element= {<CrearMateriales />} />
      <Route path='/listaMateriales' element= {<ListarMateriales />} />
      <Route path='/AsignarMaterial' element= {<CrearAsignarMateriales />} />
      <Route path='/MaterialesAsignados' element= {<ListaMaterialesAsignados />} />
      <Route path='/ListMaterialesAsignados' element= {<ListarMaterialesPorUsuario />} />
      <Route path='**' element={<found/>}/>
    </Routes>
  </Router>
  );
}

export default App;
