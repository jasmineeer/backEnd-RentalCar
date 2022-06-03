const md5 = require("md5")
const jwt = require(`jsonwebtoken`)
const { validationResult } = require(`express-validator`)

// memanggil file model untuk karyawan
let modelKaryawan = require("../models/index").karyawan 

exports.getDataKaryawan = (request, response) => {
    modelKaryawan.findAll()
    .then(result => {
        return response.json(result)
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.addDataKaryawan = (request, response) => {
    // menampung data karyawan
    let newKaryawan = {
        nama_karyawan: request.body.nama_karyawan,
        alamat_karyawan: request.body.alamat_karyawan,
        kontak_karyawan: request.body.kontak_karyawan,
        username: request.body.username,
        password: md5(request.body.password)   
    }

    modelKaryawan.create(newKaryawan)
    .then(result =>{
        return response.json({
            message: `Data Karyawan inserted`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.editDataKaryawan = (request, response) => {
    let id = request.params.id_karyawan
    let dataKaryawan = {
        nama_karyawan: request.body.nama_karyawan,
        alamat_karyawan: request.body.alamat_karyawan,
        kontak_karyawan: request.body.kontak_karyawan,
        username: request.body.username,
        password: md5(request.body.password)  
    }

    modelKaryawan.update(dataKaryawan, {
        where: {
            id_karyawan: id 
        }
    })

    .then(result => {
        return response.json({
            message: `Data Karyawan updated`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.deleteDataKaryawan = (request, response) => {
    let id = request.params.id_karyawan 

    modelKaryawan.destroy({
        where: {
            id_karyawan: id 
        }
    })
    
    .then(result => {
        return response.json({
            message: `Data Karyawan deleted`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.authentication = async(request, response) => {
    let data = {
        username: request.body.username,
        password: md5(request.body.password) 
    }

    // validasi 
    let result = await modelKaryawan.findOne({
        where: data
    })

    if (result) {
        // payload adalah data/informasi yg akan dienkripsi
        let payload = JSON.stringify(result) // konversi dari bentuk objek ke JSON
        let secretKey = `Rental Mobil`

        // generate token
        let token = jwt.sign(payload, secretKey)
        return response.json({
            logged: true,
            token: token,
            dataKaryawan: result 
        })
    } else{
        return response.json({
            logged: false,
            message: `Invalid username or password`
        })
    }
}