const express = require("express")
const userModel = require("../module/user.model")

const userRoute = express.Router()

userRoute.get("/", async(req,res)=>{
    try {
        let data = await userModel.find()
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

userRoute.post("/register", async(req,res)=>{
    let body = req.body
    try {
        let data = new userModel(body)
        await data.save()
        res.send("user added succesfully")
    } catch (error) {
        res.send(error)
    }
})


module.exports= userRoute