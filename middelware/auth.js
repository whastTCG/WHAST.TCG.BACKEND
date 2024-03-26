const jwt = require("jwt-simple");
const moment = require("moment");

const libjwt = require("../services/token/jwt");
const secret = libjwt.secret;

exports.auth = (req, res, next) => {

    //preguntamos si la cabecera de la peticion tiene el token de autentificacion
    if (!req.headers.authorization) {
        return res.status(403).send({
            status: "error",
            message: "la peticion no tiene la cabecera de autentificacion"
        });
    };

    //limpianos el token quitandole las comillas simples y dobles
    let token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        // usamos el metodo decode para decodificar el token y le pasamos el string secret que creamos para decodificar la pass
        const payload = jwt.decode(token, secret);
        //console.log(payload);
        //comprobamos la expiracion del token 
        if (payload.exp <= moment().unix()) {
            //mandamos 401 porque las crredenciales ya no sonv alidas en este caso el token expiro
            return res.status(401).send({
                status: "error",
                message: "token expirado"

            });
        }

        //agregar datos de usuarios a request
        req.user = payload;


    } catch (error) {
        return res.status(404).send({
            status: "error",
            message: "token invalido",
            error
        });
    }
    //pasar a la ejecucion de la ruta
    next();
}