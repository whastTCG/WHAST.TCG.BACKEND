const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    bio: String,
    nick: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    roll: {
        type: String,
        default: "role_user"
    },
    image: {
        type: String,
        default: "default.png"
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    verifie: {
        type: Boolean,
        default: false
    },
    fechaExpiracionEnlace: {
        type: Date,
        default: () => Date.now() + (48 * 60 * 60 * 1000) // Por ejemplo, 48 horas a partir de la fecha actual
    },

    resetContrasenaToken: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    }

});

module.exports = model("User", UserSchema, "users");

