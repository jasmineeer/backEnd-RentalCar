const express = require(`express`)
const app = express()

app.use(express.json())

// Memanggil controller mobil
let mobilController = require("../controllers/mobilController")

// Memanggil file middleware
let uploadImage = require("../middlewares/uploadImage")
let authorization = require("../middlewares/authorization")

// end-point Get Data mobil
app.get("/", authorization.authorization, mobilController.getDataMobil)

// end-point Add Data mobil
app.post("/", uploadImage.upload.single(`image`), authorization.authorization, mobilController.addDataMobil)

// end-point Edit Data mobil
app.put("/:id_mobil", uploadImage.upload.single(`image`), authorization.authorization, mobilController.editDataMobil)

// end-point Delete Data mobil
app.delete("/:id_mobil", authorization.authorization, mobilController.deleteDataMobil)

module.exports = app 