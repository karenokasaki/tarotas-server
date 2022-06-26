const express = require("express")
const router = express.Router()

const isAuth = require("../middlewares/isAuth")
const attachCurrentUser = require("../middlewares/attachCurrentUser")

const userModel = require("../models/User.model")
const cardModel = require("../models/Cards.model")
const oracleModel = require("../models/Oracles.model")

//create a card
router.post("/create-card", isAuth, attachCurrentUser, async (req, res) => {
    try {
        console.log(req)
        const card = await cardModel.create({
            ...req.body,
            createBy: req.currentUser._id
        })
        console.log(card)

        const addOracle = await oracleModel.findByIdAndUpdate(req.body.oracle, {
            $push: {
                cards: card._id
            }
        })

        return res.status(201).json(card)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})



module.exports = router