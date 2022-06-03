// memanggil file model untuk pelanggan
let modelPelanggan = require("../models/index").pelanggan 

exports.getDataPelanggan = (request, response) => {
    modelPelanggan.findAll()
    .then(result => {
        return response.json(result)
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.addDataPelanggan = (request, response) => {
    // menampung data pelanggan
    let newPelanggan = {
        nama_pelanggan: request.body.nama_pelanggan,
        alamat_pelanggan: request.body.alamat_pelanggan,
        kontak: request.body.kontak  
    }

    modelPelanggan.create(newPelanggan)
    .then(result =>{
        return response.json({
            message: `Data Pelanggan inserted`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.editDataPelanggan = (request, response) => {
    let id = request.params.id_pelanggan
    let dataPelanggan = {
        nama_pelanggan: request.body.nama_pelanggan,
        alamat_pelanggan: request.body.alamat_pelanggan,
        kontak: request.body.kontak 
    }

    modelPelanggan.update(dataPelanggan, {
        where: {
            id_pelanggan: id 
        }
    })

    .then(result => {
        return response.json({
            message: `Data Pelanggan updated`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.deleteDataPelanggan = (request, response) => {
    let id = request.params.id_pelanggan 

    modelPelanggan.destroy({
        where: {
            id_pelanggan: id 
        }
    })
    
    .then(result => {
        return response.json({
            message: `Data Pelanggan deleted`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}