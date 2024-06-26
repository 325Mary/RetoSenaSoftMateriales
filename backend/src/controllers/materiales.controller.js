const {
    crearMateriales,
    obtenerMaterialess,
    editarMateriales,
    eliminarMaterial
 
}= require ('../services/materiales.service')

const { ResponseStructure } = require('../helpers/ResponseStructure');
const validarCamposRequeridos = require('../middleware/camposrequeridos');
const {findOnemateriales} = require('../models/materiales.Model')


const controller = {}

controller.crearMaterialC = async (req, res, next) => {
  try {
    validarCamposRequeridos(['descripcionMaterial'])(req, res, async () => {
      const MaterialData = req.body;

      const MaterialExistente= await findOnemateriales(MaterialData.descripcionMaterial);
      if(MaterialExistente){
      return res.status(400).json({ ...ResponseStructure, status: 400, message: 'El Material  ya está registrado' });
      }
      const Material = await crearMateriales(MaterialData);
      res.status(201).json({ ...ResponseStructure, message: 'Material creado exitosamente', data: Material });
    });
  } catch (error) {
    next(error);
  }
};

controller.obtenerMaterialesC = async (req, res, next) => {
  try {
    const listMateriales = await obtenerMaterialess();
    res.status(200).json({ ...ResponseStructure, data: listMateriales });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se obtuvieron los Materiales' });
  }
};

controller.editarMaterialC = async (req, res, next) => {
  try {
    const idMateriales = req.params.idMateriales;
    const nuevoMaterialData = req.body;

    // Verificar si el cuerpo de la solicitud está vacío
    if (Object.keys(nuevoMaterialData).length === 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud está vacío' });
    }

    // Verificar si todos los campos recibidos están en el cuerpo de la solicitud
    const MaterialActualizado = await editarMateriales(idMateriales, nuevoMaterialData);
    res.status(200).json({ ...ResponseStructure, message: 'Material actualizado exitosamente', data: MaterialActualizado });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se actualizó ningún Material con el ID proporcionado' });
  }
};


controller.eliminarMaterialC = async (req, res, next) => {
  try {
    const idMateriales = req.params.idMateriales;
    await eliminarMaterial(idMateriales);
    res.status(200).json({ ...ResponseStructure, message: 'Material eliminado exitosamente' });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: `No se encontró ningún Material con el ID ${req.params.idMateriales} proporcionado` });
  }
};

module.exports = controller;
