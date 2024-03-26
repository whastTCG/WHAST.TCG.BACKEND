const express = require("express");
const multer = require("multer");
const OtrosController =  require("../controladores/Otros");


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


router.get("/ruta-de-prueba", OtrosController.prueba);
router.get("/curso", OtrosController.curso);
router.get("/listar", OtrosController.listar);
router.get("/listar-nuevos/:ultimos?", OtrosController.listarMasNuevo);  
router.get("/listar-uno/:id", OtrosController.listarUno);
router.get("/imagen/:fichero", OtrosController.imagen);
router.get("/buscar/:buqueda", OtrosController.buscador);
//ruta post para enviar datos a la DB
router.post("/crear", OtrosController.crear);
router.post("/subir-imagen/:id", subidas.single("file0"), OtrosController.subir);
//rutas para eliminar datos de la DB
router.delete("/borrar-uno/:id", OtrosController.eliminarPorId);
//rutas put para actualizar 
router.put("/actualizar/:id",  OtrosController.Actualizar);

module.exports = router;