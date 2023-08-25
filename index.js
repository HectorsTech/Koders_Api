require('dotenv').config();
const mongoose = require("mongoose");
const server = require("./src/server");

const DB_USER = process.env.DB_USER
const DB_PASWORD = process.env.DB_PASWORD
const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME


mongoose.connect(
        `mongodb+srv://${DB_USER}:${DB_PASWORD}@${DB_HOST}/${DB_NAME}`
        //"mongodb+srv://hectorsgpt:rWluz6rJ1c5bMw6x@cluster0.fjdwigw.mongodb.net/koders_db"
    )
    .then(() => {
        console.log("DB connected")
        server.listen(8080, () =>{
            console.log("server listening on port 8080");
        })
        
    })
    .catch((err) => {
        console.error("DB Error", err)
    })

