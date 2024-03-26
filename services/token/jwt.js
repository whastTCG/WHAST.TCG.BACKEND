const jwt = require("jwt-simple");
const moment = require("moment");


const secret = "exl-Wn07cO89GVtS";

const createToken = (user) =>{
    const payload = {
        id: user._id,
        name:user.name,
        surname:user.surname,
        nick:user.nick,
        email:user.email,
        roll:user.roll,
        imagen:user.image,
        iat:moment().unix(),
        exp:moment().add(30, "day").unix()
    };

    return jwt.encode(payload, secret);
};

module.exports = {
    createToken,
    secret
};
