// Memanggil file model
let pelangganModel = require("../models/index").pelanggan 
let karyawanModel = require("../models/index").karyawan 
let mobilModel = require("../models/index").mobil
let modelSewa = require("../models/index").sewa 

exports.getDataSewa = async(request, response) => {
    let dataSewa = await modelSewa.findAll({
        include: ["pelanggan", "karyawan", "mobil"]
    })

    return response.json(dataSewa)
}

exports.addDataSewa = async(request, response) => {
    let mobil = await mobilModel.findOne({
        where: {
            id_mobil: request.body.id_mobil
        }
    })

    let harga = mobil.biaya_sewa_per_hari
    let sewa = new Date(request.body.tgl_sewa)
    let kembali = new Date(request.body.tgl_kembali)

    let total = kembali.getTime()-sewa.getTime()
    let hari = total/(1000*3600*24)
    let totalBayar = hari*harga  

    // menampung data request 
    let newSewa = {
        id_mobil: request.body.id_mobil,
        id_karyawan: request.body.id_karyawan,
        id_pelanggan: request.body.id_pelanggan,
        tgl_sewa: request.body.tgl_sewa,
        tgl_kembali: request.body.tgl_kembali,
        total_bayar: totalBayar
    }

    modelSewa.create(newSewa)
    .then(result => {
        return response.json({
            message: `Data Sewa inserted`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.editDataSewa = async(request, response) => {
    let id = request.params.id_sewa 

    let mobil = await mobilModel.findOne({
        where: {
            id_mobil: request.body.id_mobil
        }
    })

    let harga = mobil.biaya_sewa_per_hari
    let sewa = new Date(request.body.tgl_sewa)
    let kembali = new Date(request.body.tgl_kembali)

    let total = kembali.getTime()-sewa.getTime()
    let hari = total/(1000*3600*24)
    let totalBayar = hari*harga 

    // menampung data request 
    let dataSewa = {
        id_mobil: request.body.id_mobil,
        id_karyawan: request.body.id_karyawan,
        id_pelanggan: request.body.id_pelanggan,
        tgl_sewa: request.body.tgl_sewa,
        tgl_kembali: request.body.tgl_kembali,
        total_bayar: totalBayar
    }

    modelSewa.update(dataSewa, {
        where: {
            id_sewa: id 
        }
    })
    .then(result => {
        return response.json({
            message: `Data Sewa updated`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.deleteDataSewa = (request, response) => {
    let id = request.params.id_sewa 

    modelSewa.destroy({
        where: {
            id_sewa: id 
        }
    })
    .then(result => {
        return response.json({
            message: `Data Sewa deleted`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}