const express = require("express");
const router = express.Router();
const DatosPersonalesController = require("../controladores/DatosPersonales");
const check = require("../middelware/auth");



//metodos get
router.get("/prueba", check.auth, DatosPersonalesController.prueba);
router.post("/crear-datos-personales", check.auth, DatosPersonalesController.crearDatosPersonales);
router.put("/update", check.auth, DatosPersonalesController.modificarDatos);



module.exports = router;

