require ('dotenv').config()

const express = require('express')
const app = express()
const mysql = require('mysql2')
const porta = 4000
const bodyParser = require('body-parser')

const  {DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT} = process.env
const connPool = mysql.createPool({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    database: DB_DATABASE,
    port: DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

app.use(bodyParser.json())

// -------------------------------------------

app.get('/teste', (req, res) => {
    res.send("Foi")
})

app.get('/jogos', (req, res) => {
    connPool.query("SELECT * FROM gamegenius.jogos", (err, results, fields) => {
        if (err){
            console.error("Erro ao realizar consulta", err)
            res.status(500).send("Erro ao realizar consulta")
        } else{
            console.log("Resultados:", results)
            // console.log("Campos:", fields)
            res.json(results)
        }
    })
})

app.post('/salvar-jogo', (req, res, next) => {
    const jogo = req.body
    const sql = "INSERT INTO gamegenius.jogos (nome, avaliacao, genero, plataforma, n_jogadores, descricao) VALUES (?, ?, ?, ?, ?, ?)"
    const pars = [jogo.nome, jogo.avaliacao, jogo.genero, jogo.plataforma, jogo.nJogadores, jogo.descricao]
    
    connPool.query(sql, pars, (err, results, fields) => {
        if (err){
            console.error("Erro ao realizar consulta", err)
            res.status(500).send("Erro ao realizar consulta")
        } else{
            console.log("Dado inserido")
            // console.log("Campos:", fields)
            res.json(results)
        }
    })
})

// -------------------------------------------

app.listen(porta, () => console.log("Executando servidor na porta:", porta))
