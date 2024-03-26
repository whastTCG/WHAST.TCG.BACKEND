//exportacion del modelo
const DatosPersonales = require('../modelos/DatosPersonales');
const { valDatosUpdate } = require('../controladores/Helper/Validar');
const prueba = (req, res) => {
    //let IdUser = req.user.id;
    return res.status(200).json({
        mensaje: "soy una accion de prueba en mi controlador DatosPersonales",
        // IdUser
    });
}

//metodo que no usaremos por ahora ya que los datos personales se crean automaticamente cuando se ejecuta el end point de crear usuarios
const crearDatosPersonales = async (req, res) => {

    //sacamos el id del usuario logeado, este id lo sacamos del token que se crea al logear el cual contiene todos los datos del usuario registrado y logeado
    //ese token lo dejamos almacenado en las cookies y pero tambien esta en el header con el campo Authorization entonces podemos acceder al con el req.user. el dato que queramos del usuario 
    // ya que el metodo del middelware saca el token del header y nos devuelve un payload con el cual podemos acceder a esos datos con req.user
    let IdUser = req.user.id;

    // buscamos si el usuario logeado ya tiene sus datos creados 

    const consulta = await DatosPersonales.find({
        user: IdUser
    });


    // en caso que ya los tiene creado debemos retornar una respuesta con un mensaje que diga que este usuario ya tiene creado sus datos personales
    if (consulta && consulta.length >= 1) {
        return res.status(200).send({
            status: "success",
            message: "usuario con datos ya creados",

        });
    }


    //creamos  los nuevos datos personales con el id del usuario logeado
    const newDatosPersonales = new DatosPersonales({
        user: IdUser
    })

    try {
        let datosPersonales = await newDatosPersonales.save();
        return res.status(200).send({
            status: "success",
            message: "Datos de usuario creados correctamente",
            datosPersonales,
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

    try {

        valDatosUpdate(params);
        try {
            consulta = await DatosPersonales.findOneAndUpdate({user:userIdentity.id} , params, { new: true }).exec();
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

module.exports = {
    prueba,
    crearDatosPersonales,
    modificarDatos
}