const express = require("express")
const userModel = require("../module/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRoute = express.Router()

userRoute.get("/", async (req, res) => {
    try {
        let data = await userModel.find()
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

userRoute.post("/register", async (req, res) => {
    let { email, name, password } = req.body
    let second = req.body
    try {
        let check = await userModel.findOne({ email: email })
        if (check) {
            res.send("user already exist")
        }
        else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (hash) {
                    let data = new userModel({ email, name, password: hash })
                    await data.save()
                    res.send("user added successfully")
                } else {
                    res.send({ "err": err.message })
                }
            });
        }
    } catch (error) {
        res.send(error)
    }
})

userRoute.post("/login", async (req, res) => {
    let { email, password } = req.body
    let check = await userModel.findOne({ email: email })
    if (check) {
        bcrypt.compare(password, check.password, async (err, result) => {
            if (result) {
                const token = jwt.sign({ authorID:check._id, authorName:check.name }, "bharat")
                res.send({"msg":"user login seccesfully", token})
            } else{
                res.send({"err":"invalid password"})
            }
        });
    } else{
        res.send("invalid email")
    }
})


module.exports = userRoute