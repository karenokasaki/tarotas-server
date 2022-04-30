const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CardSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    description_short: {
        type: String
    },
    description_reverse: {
        type: String
    },
    number: {
        type: String
    },
    oracle: {
        type: mongoose.Schema.Types.ObjectId, ref: "Oracle"
    },
    translate: {
        type: String
    },
    image: {
        type: String
    },
    createDate: { type: Date, required: true, default: Date.now },
    cardIsActive: { type: Boolean, default: true },

    createBy: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },

})


const CardModel = mongoose.model("Card", CardSchema)

module.exports = CardModel