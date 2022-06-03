const express = require(`express`)
const app = express()

app.use(express.json())

// Memanggil controller karyawan
let karyawanController = require("../controllers/karyawanController")

// Memanggil file middleware
const karyawanValidator = require("../middlewares/karyawanValidator")
const authorization = require("../middlewares/authorization")

// end-point Get Data karyawan
app.get("/", authorization.authorization, karyawanController.getDataKaryawan)

// end-point Add Data karyawan
app.post("/",  karyawanValidator.validate, karyawanController.addDataKaryawan)

// end-point Edit Data karyawan
app.put("/:id_karyawan", authorization.authorization, karyawanValidator.validate, karyawanController.editDataKaryawan)

// end-point Delete Data karyawan
app.delete("/:id_karyawan", authorization.authorization, karyawanController.deleteDataKaryawan)

app.post("/auth", karyawanController.authentication)

module.exports = app 