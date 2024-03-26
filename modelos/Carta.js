const {Schema, model} = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const CartaSchema = Schema (
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
CartaSchema.plugin(mongoosePaginate);
module.exports = model("cartas", CartaSchema, "carta");

