const mysql = require('mysql2')

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Macaco123!',
    database: 'fordapi'
})

module.exports = conexao 