var express = require('express')
var app = express()
// var firebird = require('node-firebird')
const mysql = require('mysql2/promise');


const conn = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '123456',
    database :'sean_db'
})

const conectando = async() =>{
    try {
        const connection = await conn
   

        try {
            const [ results, fields ] = await connection.query('select * from usuarios')
           
        } catch (error) {
            console.log('Erro ao fazer a consulta: ', error)
    } 
    } catch (error) {
        console.log('Erron na conexão com a base de dados: ', error)
    }
}

// connection.query('select * from usuarios', (err, results, fields)=>{
//     console.log('Teste de conexão na base de dados', err, results, fields)
// })
conectando()
const conexao = () => {
    var options = {};

    options.host = 'localhost';
    options.port = 3050;
    options.database = 'C:/Desenvolvimento/BaseDados/DATATESTE.FDB';
    // options.database = 'C:/TEK-SYSTEM/DADOS/DADOSMC.fdb';
    options.user = 'SYSDBA';
    options.password = 'masterkey';
    options.lowercase_keys = false; // set to true to lowercase keys
    options.role = null; // default
    options.pageSize = 4096;

    return options
}


module.exports = { conexao, conectando } 