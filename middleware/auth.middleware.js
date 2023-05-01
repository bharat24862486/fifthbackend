const jwt = require("jsonwebtoken")

const Auth = (req,res,next)=>{
    let token = req.headers.authorization

    if (token) {
        token = token.split(" ")[1]
        jwt.verify(token, "bharat", function (err, decoded) {
            if (decoded) {
                req.body.authorID = decoded.authorID
                req.body.authorName = decoded.authorName

                next()
            } else {
                res.send("invalid token")
            }
        })
    } else{
        res.send("please provide token")
    }
}

module.exports = Auth