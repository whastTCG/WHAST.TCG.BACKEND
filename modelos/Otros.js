const {Schema, model} = require("mongoose");

const OtrosSchema = Schema (
    {
        cardText: {
            type: String,
            required: true
        },
        cardEdition: {
            type: String,
            required: true
        },
        cardImg: {
            type: String,
            default: "default.png"
        },
        cardPrice: {
            type: String,
            required: true
        },
        stock: {
            type: String,
            required:true
        }
    }
)

module.exports = model("Otros", CartaSchema, "Otros");

