require("dotenv").config()
const cors = require("cors")
const express = require("express")
const routes = require("./Routes/allRoutes")

const storeXServer = express()
require('./Config/dbConnection')

storeXServer.use(cors())
storeXServer.use(express.json())
storeXServer.use(routes)
storeXServer.use("/uploads",express.static("./uploads"))

const PORT = process.env.PORT || 3000;

storeXServer.listen(PORT, () => {
    console.log(`Server Started running in PORT : ${PORT}`)
})

storeXServer.get("/", (req,res) => {
    res.status(200).send("<h1> StoreX Server</h1>")
})

storeXServer.use((err, req, res, next)=>{
    res.status(500).json(err.message)
})