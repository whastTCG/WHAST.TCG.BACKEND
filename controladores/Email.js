
const jwt = require("../services/token/jwt");

const User = require('../modelos/User');

const { verificarCuenta } = require('../apiResend');
const pruebaEmail = (req, res) => {
    return res.status(200).send({
        status: "success",
        message: "metodo de prueba email"
    });
};


const verificarUsuario = async (req, res) => {
    const id = req.query._id;
    // const email = req.query.email

    try {

        // Obtener la fecha actual
        const now = new Date();

        // Obtener la información del usuario, incluida la fecha de expiración del enlace
        const consulta = await User.findOne({ _id: id, })



        const fechaExpiracionEnlace = new Date(consulta.fechaExpiracionEnlace);

        // Verificar si la fecha de expiración del enlace ha pasado
        if (fechaExpiracionEnlace < now) {
            return res.status(400).json({
                status: "expirado",
                message: "El enlace de verificación ha expirado"
            });
        }


        if (consulta.verifie === true) {
            return res.status(200).send({
                status: "success",
                message: "cuenta ya a sido verificada"
            });
        }

        consulta.verifie = true;

        await consulta.save();
        if (consulta) {
            return res.status(200).send({
                status: "success",
                //userUpdate: consulta,
                message: "cuenta verificada",
                consulta
            });
        } else {
            return res.status(200).json({
                status: "no encontrado",
                message: "usuario no encontrado",

            });
        }

    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: "Hubo un error al verificar el usuaario",
            error: error.message,
        });
    }
};

//metodo para reenviar link, tambien actualiza la expiracion de la verificacion de la cuenta
const reenviarEMail = async (req, res) => {

    try {
        const email = req.query.email;
        const _id = req.query._id;
        
        const buscarUsuario = await User.findOne({$or: [ {email}, {_id} ] });

        if (!buscarUsuario) {
            return res.status(404).send({
                status: "usuario no encontrado",
                message: "no se encontro el usuario ligado a este email",
                buscarUsuario,
                
            })
        };

        buscarUsuario.fechaExpiracionEnlace = new Date(Date.now() + (48 * 60 * 60 * 1000)); // Añadir 2 días

        // Guardar los cambios en la base de datos
        await buscarUsuario.save();

        await verificarCuenta(buscarUsuario.email, `http://localhost:3000/verificar-cuenta/${buscarUsuario._id}`);
        return res.status(200).json({
            status: "success",
            message: "Correo de verificación reenviado correctamente",
        });


    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: "Hubo un error al reenviar el correo",
            error: error.message,
        });
    }
}

module.exports = {
    pruebaEmail,
    verificarUsuario,
    reenviarEMail
}