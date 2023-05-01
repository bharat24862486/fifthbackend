const express = require("express")
const noteModel = require("../module/note.module")

const noteRouter = express.Router()

noteRouter.get("/", async(req,res)=>{
    try {
        let data = await noteModel.find()
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})


noteRouter.post("/addnote",async(req,res)=>{
    let body = req.body
    
    try {
        let data = new noteModel(body)
        console.log(data,"line 21")
        await data.save()
        res.send("note added successfully")
    } catch (error) {
        res.send(error)
    }
})


module.exports = noteRouter