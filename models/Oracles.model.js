const mongoose = require("mongoose")
const Schema = mongoose.Schema

const OracleSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    number_of_cards: {
        type: String
    },
    author: {
        type: String
    },
    createDate: { type: Date, required: true, default: Date.now },
    oracleIsActive: { type: Boolean, default: true },
    createBy: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    cards: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Card"
    }],
    public: {
        type: Boolean, default: false
    }
})

const OracleModel = mongoose.model("Oracle", OracleSchema)
module.exports = OracleModel