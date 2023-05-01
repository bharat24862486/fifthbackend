const express = require("express")
const cors = require("cors")
const connection = require("./db")
const userRoute = require("./route/user.route")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const Auth = require("./middleware/auth.middleware")
const noteRouter = require("./route/note.route")

const app = express()

app.use(express.json())
app.get("/", (req, res) => {
    res.send({ msg: "welcome" })
})
app.use("/user", userRoute)

app.use(Auth)

app.use("/note", noteRouter)


app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("connect to the db")
    } catch (error) {
        console.log(error)
    }
    console.log("server is running 8080")
})