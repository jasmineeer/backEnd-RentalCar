const { body } = require(`express-validator`)

exports.validate = [
    // validasi password 
    body(`password`)
    .isLength({ min: 5})
    .withMessage(`Password at least 5 characters`)
    .notEmpty()
    .withMessage(`Password must be filled`),

    // validasi username 
    body(`username`)
    .notEmpty()
    .withMessage(`Username must be filled`),

    // validasi nama karyawan
    body(`nama_karyawan`)
    .notEmpty()
    .withMessage(`Name must be filled`)
]