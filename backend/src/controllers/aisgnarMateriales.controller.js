const { ResponseStructure } = require('../helpers/ResponseStructure');
const validarCamposRequeridos = require('../middleware/camposrequeridos');
const {
    crearAsignarmateriales,
    obtenerAsignarmateriales,
    editarAsignarmateriales,
    deleteByidasignarmateriales,
    obtenerAsignarmaterialesPorUsuario
  } = require('../services/asigbarMateriales.Service');
const {findOneasignarmateriales} = require('../models/asignarMaterial.Model')


const controller = {}

controller.crearasignarmaterialesC = async (req, res, next) => {
  try {
    validarCamposRequeridos([ 'idUsuario', 'idMateriales', 'estado', 'cantidad'])(req, res, async () => {
      const asignarmaterialesData = req.body;

      const asignarmaterialesExistente= await findOneasignarmateriales(asignarmaterialesData. idUsuario,  asignarmaterialesData.idMateriales,  asignarmaterialesData.estado,  asignarmaterialesData.cantidad);
      if(asignarmaterialesExistente){
      return res.status(400).json({ ...ResponseStructure, status: 400, message: ' ya está registrado' });
      }
      const asignarmateriales = await crearAsignarmateriales(asignarmaterialesData);
      res.status(201).json({ ...ResponseStructure, message: 'creado exitosamente', data: asignarmateriales });
    });
  } catch (error) {
    next(error);
  }
};

controller.obtenerasignarmaterialesPorUsuarioC = async (req, res, next) => {
    try {
      const idUsuario = req.params.idUsuario;
      const listasignarmateriales = await obtenerAsignarmaterialesPorUsuario(idUsuario);
      res.status(200).json({ ...ResponseStructure, data: listasignarmateriales });
    } catch (error) {
      res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se obtuvieron los asignarmateriales para el usuario proporcionado' });
    }
  };
  
controller.obtenerasignarmaterialesC = async (req, res, next) => {
  try {
    const listasignarmateriales = await obtenerAsignarmateriales();
    res.status(200).json({ ...ResponseStructure, data: listasignarmateriales });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se obtuvieron los asignarmateriales' });
  }
};

controller.editarasignarmaterialesC = async (req, res, next) => {
  try {
    const idasignarMateriales = req.params.idasignarMateriales;
    const nuevoasignarmaterialesData = req.body;

    // Verificar si el cuerpo de la solicitud está vacío
    if (Object.keys(nuevoasignarmaterialesData).length === 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud está vacío' });
    }

    // Verificar si todos los campos recibidos están en el cuerpo de la solicitud
    const asignarmaterialesActualizado = await editarAsignarmateriales(idasignarMateriales, nuevoasignarmaterialesData);
    res.status(200).json({ ...ResponseStructure, message: 'asignarmateriales actualizado exitosamente', data: asignarmaterialesActualizado });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se actualizó ningún asignarmateriales con el ID proporcionado' });
  }
};


controller.eliminarasignarmaterialesC = async (req, res, next) => {
  try {
    const idasignarMateriales = req.params.idasignarMateriales;
    await deleteByidasignarmateriales(idasignarMateriales);
    res.status(200).json({ ...ResponseStructure, message: 'perfil eliminado exitosamente' });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: `No se encontró ningún perfil con el ID ${req.params.idasignarmateriales} proporcionado` });
  }
};

module.exports = controller;
