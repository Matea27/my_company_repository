const express = require("express")
const cors = require("cors")
require("./db/mongoose")
const companyRouter = require("./routers/company")
const ownerRouter = require("./routers/owner")

const app = express()
const port = 3000

app.use(cors())
// configuring express.json to automatically parse incoming JSON into a JavaScript object which we access on req.body
app.use(express.json())
app.use(companyRouter)
app.use(ownerRouter)

app.listen(port, ()=> {
    console.log("Server is up on port " + port)
})