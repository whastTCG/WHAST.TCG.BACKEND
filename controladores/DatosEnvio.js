//exportacion del modelo
const DatosEnvio = require('../modelos/DatosEnvio');
const { valDatosUpdate } = require('../controladores/Helper/Validar');
const prueba = (req, res) => {
    //let IdUser = req.user.id;
    return res.status(200).json({
        mensaje: "soy una accion de prueba en mi controlador DatosEnvio",
        // IdUser
    });
}

//metodo que no usaremos por ahora ya que los datos personales se crean automaticamente cuando se ejecuta el end point de crear usuarios
const crearDatosEnvio = async (req, res) => {

    //sacamos el id del usuario logeado, este id lo sacamos del token que se crea al logear el cual contiene todos los datos del usuario registrado y logeado
    //ese token lo dejamos almacenado en las cookies y pero tambien esta en el header con el campo Authorization entonces podemos acceder al con el req.user. el dato que queramos del usuario 
    // ya que el metodo del middelware saca el token del header y nos devuelve un payload con el cual podemos acceder a esos datos con req.user
    let IdUser = req.user.id;

    //capturamos los parametros

    let params = req.body;



    //validamos los campos para que no puedan ingresas campos vacios 
    try {

        valDatosUpdate(params);


    } catch (error) {

        return res.status(400).send({
            message: "ingrese campos validos",
            status: "error",
            error
        })
    }

    // buscamos si el usuario logeado ya tiene sus datos creados 

    const consulta = await DatosEnvio.find({
        user: IdUser
    });

    // en caso que ya los tiene creado debemos retornar una respuesta con un mensaje que diga que este usuario ya tiene creado sus datos personales
    // en este caso permitiremos que tenga max 3 datos de envio el usuario
    if (consulta && consulta.length >= 3) {
        return res.status(200).send({
            status: "success",
            message: "no puede tener mas de 3 datos de envio",

        });
    }




    //creamos  los nuevos datos personales con el id del usuario logeado
    const newDatosEnvio = new DatosEnvio({
        user: IdUser,
        direccion: params.direccion,
        rut: params.rut,
        nombreCompleto: params.nombreCompleto,
        ciudad: params.ciudad,
        region: params.region,
        comuna: params.comuna,
        telefono: params.telefono
    })

    try {
        let DatosEnvio = await newDatosEnvio.save();
        return res.status(200).send({
            status: "success",
            message: "Datos de usuario creados correctamente",
            DatosEnvio,
            consulta
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "error en la peticion",
            error: error
        });
    }


}

const modificarDatos = async (req, res) => {

    const params = req.body;
    const userIdentity = req.user;
    const id = req.query.id;
   
    try {

        valDatosUpdate(params);
        try {
            consulta = await DatosEnvio.findOneAndUpdate({ user: userIdentity.id, _id:id }, params, { new: true }).exec();
            return res.status(200).send({
                message: "Datos actualizado",
                status: "success",
                datosUsuario: userIdentity,
                datosActualizados: consulta
            });
        } catch (error) {
            return res.status(400).send({
                message: "error en la peticion",
                status: "error",
                error
            })
        }


    } catch (error) {

        return res.status(400).send({
            message: "ingrese campos validos",
            status: "error",
            error
        })
    }
}

const listDireccionEnvio =  async(req, res) =>{


    const userIdentity = req.user.id;

    try {
        const consulta = await DatosEnvio.find({user:userIdentity}).exec();
        return res.status(200).send({
            message:'lista de envio',
            status:'success',
            listaEnvios:consulta ,
            usuario:req.user
        })
    } catch (error) {
        return res.status(400).send({
            message: "error en la peticion",
            status: "error",
            error
        })
    }


    return res.status(200).send({
        message:'metodo listar direeciones de envio del usuaario logeado',
        status:'success'
    })
}

const borrarPorId = async(req, res) =>{



    let id = req.query.id;

    try {
        
        const consulta = DatosEnvio.findByIdAndDelete(id).exec();
        return res.status(200).json({
            status: "success",
            message: "wea Borrada",
            consulta: consulta
        });

    
    } catch (error) {
        return res.status(400).send({
            message: "error en la peticion",
            status: "error",
            error
        });
    }
    return res.status(200).send({
        message:'metodo  para eliminar por ID',
        status:'success'
    })
}

module.exports = {
    prueba,
    crearDatosEnvio,
    modificarDatos,
    listDireccionEnvio,
    borrarPorId
}