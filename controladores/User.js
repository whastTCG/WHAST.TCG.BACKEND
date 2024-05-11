//exportacion del modelo
const User = require('../modelos/User');
// para encriptar el password
const bcrypt = require("bcrypt");
//para generar el token del usuario
const jwt = require("../services/token/jwt");
//borrar archivos multimedia 
const fs = require("fs");
// mostrar la imagen  en los endpoint requiridos
const path = require("path");
const { use } = require('../rutas/Carta');
const { isValidEmail, validarUser, validarPassowrd } = require("./Helper/Validar")
//libreria par alas cookies
const cookie = require('cookie');

const DatosPersonales = require('../modelos/DatosPersonales');
const { listen } = require('express/lib/application');

//metodo resned
const { verificarCuenta, recuperarContraseñaEmail, recuperarContraseñaEmailToken } = require('../apiResend');

//metodo para generar caracteres random ( para generar un password random)
const { generateRandomPassword } = require('../controladores/Helper/generarRandom');
//metodo de prueba

const crypto = require('crypto');

const pruebaUsuario = (req, res) => {
    return res.status(200).send({
        status: "success",
        message: "metodo de prueba usuario"
    });
};


const register = async (req, res) => {

    //recoger los datos de la peticion
    let params = req.body;

    //comprobar que los parametros fueron ingresado
    if (!params.name || !params.email || !params.password) {
        return res.status(400).send({
            message: "faltan datos por enviar",
            status: "error"
        })
    }

    //usamos el validarUser para verificar que el name y la pass vengan con las reglas de negocio adecuadas
    try {
        validarUser(params)
    } catch (error) {
        return res.status(400).send({
            message: "el nombre debe tener minimo 3 caracter y las password 5",
            status: "error"
        })
    }

    //comprobar si el correo viene bien
    if (!isValidEmail(params.email)) {
        return res.status(400).send({
            message: "correo invalido",
            status: "error"
        })
    }

    //crear el objeto y darle los parametros
    const userToSave = new User(params);

    try {
        //hacemos una consulta a la base de datos para saber si el usuario existe
        consulta = await User.find({
            $or: [
                { email: userToSave.email.toLowerCase() }

            ]
        }).exec();
        //si la consulta existe y los objetos que contiene son mayor a 1 entonces devolver
        // un success con un mensaje avisando que el usuario ya existe 
        if (consulta && consulta.length >= 1) {
            return res.status(200).send({
                status: "success",
                message: "usuario ya existe"
            })
        }
        //cifrar la pass

        const pass = await bcrypt.hash(userToSave.password, 10)

        userToSave.password = pass;
        await userToSave.save();

        //creamos los datos personales justo despues de guardar el usuario con el id del usuario registrado
        // estos datos tienen el id del usuario nuevo con datos por defectos los caules pueden ser modificados en la interfaz cuando el usuario ya este logeado en la api
        const datosToSave = new DatosPersonales({
            user: userToSave._id
        })
        await datosToSave.save();

        //cuando el usuario se guarde llamar al metodo para enviar el mail de verificacion a su correo
        //cambiar la ruta cuando entre en produccion por la del hosting
        await verificarCuenta(userToSave.email, `http://localhost:3000/verificar-cuenta/${userToSave._id}`);

        return res.status(200).send({
            status: "success",
            message: "usuario registrado correctamente",
            usuario: userToSave,
            datosPersonales: datosToSave
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "error al guardar el usuario",
            error
        })
    }
}


//metodo  de autentificacion
const login = async (req, res) => {
    //recoger los parametros
    const params = req.body;

    //verificar si quiere ser recordada la sesion
    const remember = req.query.remember;

    //si se ingresa con los campos vacio enviar un mensaje
    if (!params.email || !params.password) {
        return res.status(400).send({
            status: "error",
            message: "falta el correo o la contrasena"
        })
    }

    try {
        //buscar si existe el usuario que esta intentando ingresar
        const userLogin = await User.
            findOne({ email: params.email }).
            select({ "create_at": 0 });
        //preguntamos si no existe el usuario ingresado    
        if (!userLogin) {
            return res.status(404).send({
                status: "no existe",
                message: "no existe el usuario"
            });
        }



        //comprobar su password con compareSync se compara el password que llega por parametro ( el que ingresa el usuario) vs
        //el que encontramos con la consulta de arriba que es el que esta en la bd en caso de que los mail coincidan
        const pwd = bcrypt.compareSync(params.password, userLogin.password);

        if (!pwd) {
            return res.status(400).send({
                status: "error password",
                message: "password incorrecto"
            });
        }

        //verificar si la cuenta esta verificada
        if (!userLogin.verifie) {
            return res.status(403).send({
                status: "no verificado",
                message: "la cuenta no esta verificada. Por favor, verificar su cuenta antes de iniciar sesion."
            })
        }

        //si es correcta devolvemos el token 
        const token = jwt.createToken(userLogin);

        // Configurar la cookie con el token si remember es igual a true ponemos el token para que expire en 30 dias sino que expire en media hora
        if (remember === "true") {
            const cookieOptions = {
                httpOnly: true,
                maxAge: 2592000,
                sameSite: 'none',
                secure: true,
                path: '/'
            };
            res.setHeader('Set-Cookie', cookie.serialize('token', token, cookieOptions));
        } else {
            const cookieOptions = {
                httpOnly: true,
                maxAge: 1800,
                sameSite: 'none',
                secure: true,
                path: '/'
            };
            res.setHeader('Set-Cookie', cookie.serialize('token', token, cookieOptions));
        }



        //devolver datos del usuario
        return res.status(200).send({
            status: "success",
            message: "te has identificado correctamente",
            userLogin: {
                id: userLogin._id,
                name: userLogin.name,
                nick: userLogin.nick,
                roll: userLogin.roll,
                email: userLogin.email
            },
            token,
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: error
        })
    }


}

//metodo para verificar el perfil del usuario
const profile = async (req, res) => {
    //recoger el id del usuario
    const id = req.params.id;

    //consulta para sacar los datos del usuario logeado

    try {
        const consulta = await User.findById(id).select({ password: 0 }).exec();
        if (!consulta) {
            return res.status(404).send({
                status: "error",
                message: "el usuario no existe o hay un error"
            });
        }
        return res.status(200).send({
            status: "success",
            userProfile: consulta,
            userIdentity: req.user

        });

    } catch (error) {
        return res.status(404).send({
            status: "error",
            error
        });
    }
}

//metodo para limpiar las cookies del tpken  en caso de que uses httponly 
const cleanCookies = (req, res) => {
    let nameCookies = req.query.cookie;

    try {
        // Limpiar la cookie desde el servidor
        res.clearCookie(nameCookies, { path: '/', secure: true, sameSite: 'none' });

        return res.status(200).send({
            status: "success",
            message: "Se han limpiado las cookies con el nombre " + nameCookies
        });
    } catch (error) {
        return res.status(404).send({
            status: "error",
            error
        });
    }
}

const obtenerCookie = (req, res) => {


    try {
        // Parsear las cookies desde la cabecera
        const cookies = cookie.parse(req.headers.cookie || '');

        // Acceder a una cookie específica
        const miCookie = cookies.token; // Reemplaza 'miCookie' con el nombre de tu cookie
        if (miCookie) {
            return res.status(200).send({
                status: "success",
                message: "cookie con el nombre token obtenida",
                miCookie
            })
        } else {
            return res.status(404).send({
                status: "error",
                message: "la cookie ya no existe o a expirado",

            });
        }
    } catch (error) {
        return res.status(500).send({
            status: "error",
            error
        });
    }

}


const update = async (req, res) => {
    //let id = req.params.id
    let userToUpdate = req.body;
    let userIdentity = req.user;

    delete userToUpdate.iat;
    delete userToUpdate.exp;
    delete userToUpdate.roll;
    delete userToUpdate.imagen;


    //comprobar si el usuario ya existe
    //controll de usuarios duplicados

    try {
        validarUser(userToUpdate)

        //comprobar si el correo viene bien
        if (!isValidEmail(userToUpdate.email)) {
            return res.status(400).send({
                message: "correo invalido",
                status: "error"
            })
        }

        let consulta = await User.find({
            $or: [
                { email: userToUpdate.email.toLowerCase() }
            ]
        }).exec()

        let userIsset = false;

        consulta.forEach(element => {
            if (element && element._id != userIdentity.id) {
                userIsset = true;
            }
        });

        if (userIsset == true) {
            return res.status(200).send({
                status: "success",
                message: "usuario ya existe"
            })
        }


        try {
            //cifrar la pass
            if (userToUpdate.password) {
                let pwd = await bcrypt.hash(userToUpdate.password, 10);
                userToUpdate.password = pwd;

            }



            consulta = await User.findOneAndUpdate({ _id: userIdentity.id }, userToUpdate, { new: true }).exec();
            return res.status(200).send({
                status: "success",
                //userUpdate: consulta,
                message: "usuario actualizado",
                userToUpdate
            });

        } catch (error) {
            return res.status(404).json({
                status: "error",
                message: 'error',
                error
            });
        }


    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Email invalido o password invalido"
        })
    }

}


const updatePassword = async (req, res) => {

    let userIdentity = req.user;
    let newPass = req.body.pass


    try {

        validarPassowrd(newPass)
        try {


            //cifrar la pass
            if (newPass) {
                let pwd = await bcrypt.hash(newPass, 10);
                newPass = pwd;

            }

            consulta = await User.findOneAndUpdate({ _id: userIdentity.id }, { password: newPass }, { new: true }).exec();
            return res.status(200).send({
                status: "success",
                //userUpdate: consulta,
                message: "password actualizado",
                consulta
            });


        } catch (error) {
            return res.status(404).json({
                status: "error",
                message: 'error',
                error
            });
        }


    } catch (error) {
        return res.status(404).json({
            status: "error",
            message: 'error el password debe tener minimo 5 caracteres',
            error
        });
    }


}

const recuperarContraseña = async (req, res) => {

    let queryEmail = req.query.email;


    try {

        const nuevaContrasena = generateRandomPassword()

        const buscarUsuario = await User.findOne({ email: queryEmail });

        if (!buscarUsuario) {
            return res.status(404).send({
                status: "error",
                message: "usuario no encontrado"
            })
        }
        //cifrar password
        let pwd;

        try {

            pwd = await bcrypt.hash(nuevaContrasena, 10);

        } catch (error) {

            return res.status(400).json(
                {
                    status: "error",
                    message: 'Error al cifrar la contraseña',
                    error: error
                });
        }

        buscarUsuario.password = pwd;

        await buscarUsuario.save();

        await recuperarContraseñaEmail(queryEmail, nuevaContrasena);

        return res.status(200).send({
            status: "success",
            message: "contrasena cambiada correctamente",
            nuevoPass: nuevaContrasena
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: 'error al ejecutar la funcion',

        });
    }
}

const recuperarContrasenaToken = async (req, res) => {

    let queryEmail = req.query.email;

    try {

        const usuario = await User.findOne({ email: queryEmail });

        if (!usuario) {
            return res.status(404).send({
                status: "error",
                message: "usuario no encontrado"
            });
        }

        //generar un token unico
        const token = crypto.randomBytes(20).toString('hex');
        usuario.resetContrasenaToken = token;
        usuario.resetPasswordExpires = Date.now() + 3600000; // 1 hora de expiracion

        await usuario.save();

        // enviar al correo electronico de recuperacion
        await recuperarContraseñaEmailToken(queryEmail, token);
        return res.status(200).send({
            status: "success",
            message: "correo de recuperacion enviado",
        })

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: "error",
            message: "error al ejecutar la funcion"
        })
    }
}


const updatearContrasenaToken = async (req, res) => {

    const { email, token, contrasena } = req.body;
   // console.log(email);
    //console.log(token);
    //console.log(contrasena);

    try {
        const usuario = await User.findOne({ email: email, resetContrasenaToken: token, resetPasswordExpires: { $gt: Date.now() } });
        console.log(usuario)

        if (!usuario) {
            return res.status(400).json({ status: 'error', message: 'Token inválido o expirado' });
        }
        if (contrasena.length<=3 ) {
            return res.status(400).json({ status: 'error', message: 'password debe ser mayor a 3 caracteres' });

        }
        const pwd = await bcrypt.hash(contrasena, 10);
        usuario.password = pwd;
        usuario.recuperarContrasenaToken = null;
        usuario.resetPasswordExpires = null;

        await usuario.save();

        return res.status(200).json({ status: 'success', message: 'Contraseña actualizada correctamente' });


    } catch (error) {
        console.error(error);
        return res.status(500).json({status:"Error", message: 'Error al actualizar la contraseña' });
    }
}



module.exports = {
    pruebaUsuario,
    register,
    login,
    profile,
    cleanCookies,
    obtenerCookie,
    update,
    updatePassword,
    recuperarContraseña,
    recuperarContrasenaToken,
    updatearContrasenaToken

};