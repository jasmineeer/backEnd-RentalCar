const express = require(`express`)
const app = express()

app.use(express.json())

// Memanggil controller pelanggan
let pelangganController = require("../controllers/pelangganController")

// Memanggil file middleware
let authorization = require("../middlewares/authorization")

// end-point Get Data pelanggan
app.get("/", authorization.authorization, pelangganController.getDataPelanggan)

// end-point Add Data pelanggan
app.post("/", authorization.authorization, pelangganController.addDataPelanggan)

// end-point Edit Data pelanggan
app.put("/:id_pelanggan", authorization.authorization, pelangganController.editDataPelanggan)

// end-point Delete Data pelanggan
app.delete("/:id_pelanggan", authorization.authorization, pelangganController.deleteDataPelanggan)

module.exports = app 