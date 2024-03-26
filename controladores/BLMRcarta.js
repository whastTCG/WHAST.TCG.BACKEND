const validator = require("validator");
const Carta = require("../modelos/BLMRCarta");
const { validarArticulo } = require("./Helper/Validar");
const path = require("path");//toma un archivo y lo envia a otra ruta
const fs = require("fs");
const { json } = require("express");




const prueba = (req, res) => {
    return res.status(200).json({
        mensaje: "soy una accion de prueba en mi controlador Carta"
    });
}


const curso = (req, res) => {

    console.log("se ha ejecutado el endpoint probando");

    return res.status(200).json([{
        curso: "master en react",
        autor: "bryan camilo gutierrez santana",
        url: "google.cl"
    },
    {
        curso: "master en javascript",
        autor: "bryan camilo gutierrez santana",
        url: "google.cl"
    }
    ])

};


//agregar con validaciones
const crear = async (req, res) => {


    //recoger los parametros por post a guardar

    let parametros = req.body;

    //validar datos

    try {
        let validar_titulo = !validator.isEmpty(parametros.cardText) && validator.isLength(parametros.cardText, { min: 5, max: 20 });;
        let validar_edicion = !validator.isEmpty(parametros.cardEdition);
        let validar_precio = !validator.isEmpty(parametros.cardPrice);
        let validar_stock = !validator.isEmpty(parametros.stock)
        if (validar_titulo == false || validar_edicion == false || validar_precio == false || validar_stock == false) {
            throw new Error("no se ha validado la informacion");
        }
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensake: "faltan datos por enviar"
        })
    }

    //crear el objeto a guardar

    const articulo = new Carta(parametros);


    //asignar valores a objeto basado en el modelo (de forma manual o automatico)

    //guardar el articulo en la base de datos


    try {

        await articulo.save()
        return res.status(200).json({
            status: "success",
            article: articulo,
            msg: "Artículo guardado con éxito."
        })
    } catch (error) {

        return res.status(400).json({
            status: "error",
            msg: "No se ha guardado el artículo."
        })
    }

    //devolver el restultado

    return res.status(200).json({
        mensaje: "Accion de guardar",
        parametros
    })
}

//listar global
const listar = async (req, res) => {


    try {

        let consulta = await Carta.find({}).exec();
        return res.status(200).json({
            status: "success",
            consulta,
            mensaje: "Carta encontrados con exito"
        })
    } catch (error) {
        return res.status(404).json({
            status: "error",
            mensaje: "error por aweonao no se encontro nada aaa",
            
        });
    }



}

//listar primero los mas nuevos o ultimos agregados  con limite de 2 en este caso (que solo lista 2 )
const listarMasNuevo = async (req, res) => {
    try {
        let consulta = await Carta.find({}).sort({ fecha: -1 }).exec();

        let cantidad = req.params.ultimos
        if (req.params.ultimos) {
            consulta = await Carta.find({}).sort({ fecha: -1 }).limit(cantidad).exec();
        }

        return res.status(200).json({
            status: "success",
            parametros: req.params.ultimos,
            consulta,
            mensaje: "Carta encontrado del mas nuevo al mas viejo"
        });
    } catch (error) {
        return res.status(404).json({
            status: "error",
            mensaje: "error no se encontro nada"
        });
    }
}


//Buscar por id
const listarUno = async (req, res) => {

    try {


        let id = req.params.id;

        let consulta = await Carta.findById(id).exec();

        return res.status(200).json({
            status: "success",
            consulta,
            mensaje: "wea encontrada"
        });

    } catch (error) {
        return res.status(404).json({
            status: "error",
            parametro: req.params.id,
            mensaje: "no se encontro tu wea"
        });
    }
}

//eliminar por ID
const eliminarPorId = async (req, res) => {

    try {
        //recoge el id ingresado por parametro en la ruta
        let id = req.params.id;

        let consulta = await Carta.findByIdAndDelete(id).exec();

        return res.status(200).json({
            status: "success",
            mensaje: "wea Borrada",
            ItemBorrado: consulta
        });


    } catch (error) {
        return res.status(404).json({
            status: "error",
            error: error,
            mensaje: "no se encontro tu wea"
        });
    }
}

//editar o actualizar
const Actualizar = async (req, res) => {

    //sacamos los datos de los parametros ingresados
    let id = req.params.id;
    let parametros = req.body;

    //validamos los datos ingresados  (estos datos los va a ingresar algun aweonao desde un formulario o algo asi)

    try {
        validarArticulo(parametros);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensake: "faltan datos por enviar"
        });
    }



    try {

        // hacemos la consulta a la base de datos por id y le pasamos los parametros
        consulta = await Carta.findOneAndUpdate({ _id: id }, parametros, { new: true }).exec();
        return res.status(200).json({
            status: "succes",
            artuculo: consulta,
            mensaje: "estoy squi loquito"
        })

    } catch (error) {
        return res.status(404).json({
            status: "error",
            id: id,
            mensaje: "no se encontro tu wea"
        })
    }



}

//metodo para subir imagenes
const subir = async (req, res) => {

    //configurar multer

    //recoger el fichero de la imagen subida
    if (!req.file && !req.files) {
        return res.status(400).json({
            status: "error",
            mensaje: "imagen invalida o no selecionada"
        })
    }
    console.log(req.file)

    //conseguir nombre del archivo
    let nombreArchivo = req.file.originalname;
    //conseguir la extension del archivo 
    let nombre_split = nombreArchivo.split("\.");
    let nombre_extension = nombre_split[1];

    //comprobar extension correcta
    if (nombre_extension != "png" && nombre_extension != "jpg" && nombre_extension != "jpeg" && nombre_extension != "gif") {
        //borrar archivo y dar respuesta para eso usa fs importalo arriba 
        fs.unlink(req.file.path, (error) => {
            return res.status(400).json({
                status: "error",
                mensaje: "imagen invalida"
            });
        })
    } else {




        try {

            // hacemos la consulta a la base de datos por id y le pasamos los parametros
            let id = req.params.id;
            consulta = await Carta.findOneAndUpdate({ _id: id }, { imagen: req.file.filename }, { new: true }).exec();
            return res.status(200).json({
                status: "succes",
                articulo: consulta,
                fichero: req.file,
                mensaje: "actualizado imagen"
            });

        } catch (error) {
            return res.status(404).json({
                status: "error",
                id: req.params.id,
                mensaje: "no se encontro tu wea"
            });
        }

    }



}


//actualiza la imagen y muestra imagen 
const imagen = (req, res) => {



    let fichero = req.params.fichero;
    let ruta_fisica = './imagenes/' + fichero;
    fs.stat(ruta_fisica, (error, existe) => {
        if (existe) {
            return res.sendFile(path.resolve(ruta_fisica));
        } else {
            return res.status(404).json({
                status: "error",
                mensaje: "la imagen no existe",
                existe,
                fichero,
                ruta_fisica
            })
        }

    });

}


const buscador = (req, res) => {


    try {
        //sacar el string de busqueda
        let busqueda = req.params.buqueda;
        //find or
        let consulta = Carta.find({
            "$or": [

                { "cardText": { "$regex": busqueda, "$options": "i" } },
                { "cardEdition": { "$regex": busqueda, "$options": "i" } },
            ]
        }).sort({ fecha: -1 }).then((articuloEncontrado) => {

            if (!articuloEncontrado ||  articuloEncontrado == null) {
                return res.status(404).json({
                    status: "error",
                    mensaje: "no se han encontrado Carta"
                });
            }

            return res.status(200).json({
                status: "success",
                busqueda,
                articuloEncontrado
                
            });
        })




    } catch (error) {
        return res.status(404).json({
            status: "error",
            mensaje: "no se han encontrado Carta"
        });
    }

    //ejecutar consulta

    //devolver resultado
}



module.exports = {
    prueba,
    curso,
    crear,
    listar,
    listarMasNuevo,
    listarUno,
    eliminarPorId,
    Actualizar,
    subir,
    imagen,
    buscador
}

