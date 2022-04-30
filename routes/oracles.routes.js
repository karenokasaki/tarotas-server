const express = require("express")
const router = express.Router()

const userModel = require("../models/User.model")
const oracleModel = require("../models/Oracles.model")
const cardModel = require("../models/Cards.model")


const isAuth = require("../middlewares/isAuth")
const attachCurrentUser = require("../middlewares/attachCurrentUser")

//get all oracles publics
router.get("/list", async (req, res) => {
    try {
        const oracles = await oracleModel.find({ public: true }).populate("createBy")
        return res.status(200).json(oracles)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

//get one oracle by id
router.get("/:id", isAuth, attachCurrentUser, async (req, res) => {
    try {

        const { id } = req.params

        const oracle = await oracleModel.findById(id).populate('cards')

        return res.status(200).json(oracle)

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

//get all oracles of a user
router.get("/user/:id", isAuth, attachCurrentUser, async (req, res) => {
    try {

        const { id } = req.params

        const oracles = await oracleModel.find({ createBy: id }).populate('cards')

        return res.status(200).json(oracles)

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})






module.exports = router