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

//get one oracle by id public
router.get("/:id", isAuth, attachCurrentUser, async (req, res) => {
    try {

        const { id } = req.params

        const loggedUser = req.currentUser;


        if (loggedUser) {
            const oracle = await oracleModel.findById(id)
                .populate("cards")
                .populate("createBy")

            console.log(oracle)
            return res.status(200).json(oracle)
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

//get all oracles of a user
router.get("/user/:id", isAuth, attachCurrentUser, async (req, res) => {
    try {

        const { id } = req.params
        const loggedUser = req.currentUser

        const oracles = await oracleModel.findById(id).populate('cards')
        console.log(oracles)
        return res.status(200).json(oracles)

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

//create a oracle
router.post("/create", isAuth, attachCurrentUser, async (req, res) => {
    try {
        const oracle = await oracleModel.create({
            ...req.body,
            createBy: req.currentUser._id
        })

        await userModel.findByIdAndUpdate(req.currentUser._id, {
            $push: { favorite: oracle._id }
        })
        return res.status(201).json(oracle)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})






module.exports = router