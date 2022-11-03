const express = require("express")
const cors = require("cors")

require("dotenv").config()

const {SERVER_PORT} = process.env

const port = process.env.PORT || 4000

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('public'))

const {getAllNft, getNftByName, seed, submitEmail} = require("./controller")

app.post("/seed", seed)

app.post("/emails", submitEmail)

app.get("/nfts", getAllNft)

app.get("/nfts/:name", getNftByName)









app.listen(port, () => console.log(`up on ${port}`))