const express = require(`express`)
const app = express()

app.use(express.json())

// Memanggil controller sewa
let sewaController = require("../controllers/sewaController")

// Memanggil file middleware
let authorization = require("../middlewares/authorization")

// end-point Get Data sewa
app.get("/", authorization.authorization, sewaController.getDataSewa)

// end-point Add Data sewa
app.post("/", authorization.authorization, sewaController.addDataSewa)

// end-point Edit Data sewa
app.put("/:id_sewa", authorization.authorization, sewaController.editDataSewa)

// end-point Delete Data sewa
app.delete("/:id_sewa", authorization.authorization, sewaController.deleteDataSewa)

module.exports = app 