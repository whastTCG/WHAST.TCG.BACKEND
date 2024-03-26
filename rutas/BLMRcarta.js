const express = require("express");
const multer = require("multer");
const CartaController =  require("../controladores/BLMRcarta");


const router = express.Router();

//almacenamiento para subir imagenes multer
const almacenamiento = multer.diskStorage({
    destination: function(req, file, cb)  {
        cb(null, './imagenes/');
    },

    filename: function(req, file, cb)  {
        cb(null, "carta" + Date.now() + file.originalname);
    }
})

const subidas = multer({storage: almacenamiento});



//rutas de pruebas

//rutas get para obtener datos de la DB
router.get("/ruta-de-prueba", CartaController.prueba);
router.get("/curso", CartaController.curso);
router.get("/listar", CartaController.listar);
router.get("/listar-nuevos/:ultimos?", CartaController.listarMasNuevo);  
router.get("/listar-uno/:id", CartaController.listarUno);
router.get("/imagen/:fichero", CartaController.imagen);
router.get("/buscar/:buqueda", CartaController.buscador);
//ruta post para enviar datos a la DB
router.post("/crear", CartaController.crear);
router.post("/subir-imagen/:id", subidas.single("file0"), CartaController.subir);
//rutas para eliminar datos de la DB
router.delete("/borrar-uno/:id", CartaController.eliminarPorId);
//rutas put para actualizar 
router.put("/actualizar/:id",  CartaController.Actualizar);

module.exports = router;