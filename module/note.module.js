const mongoose = require("mongoose")

const noteSchema = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:String,required:true},
    authorName:{type:String,required:true},
    authorID:{type:String,required:true}
})

const noteModel = mongoose.model("/notes",noteSchema)

module.exports = noteModel