const express = require("express");
const cors = require("cors");
const morgan = require('morgan');

const userRoutes = require('../routes/usuario.Routes')
const perfilRoutes = require ('../routes/perilRoutes')
const materialesRoutes = require('../routes/materiales.Routes')
const asignarMaterialesRoutes = require('../routes/asignarMateriales.Routes')

const materiales = express();
const port = 3006;
materiales.use(cors());
materiales.use(express.json());
materiales.use(morgan("dev"));

materiales.use(userRoutes)
materiales.use(perfilRoutes)
materiales.use(materialesRoutes)
materiales.use(asignarMaterialesRoutes)

materiales.set("port", process.env.PORT || port);


module.exports = materiales;
