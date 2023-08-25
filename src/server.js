const express = require("express")
const koderRouter = require("./routes/koders.router")
const practiceRouter = require("./routes/practice.koder")
const app = express();



app.use(express.json())

app.use("/koders", koderRouter);
app.use("/practices", practiceRouter);

app.get("/", (request, response) => {
    response.json({
        message: "koders apiv1"
    })
})

module.exports = app;