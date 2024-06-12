require('dotenv').config();

const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT } = process.env;
const connPool = mysql.createPool({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    database: DB_DATABASE,
    port: DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(bodyParser.json());
app.use(cors());

function dbHandler(query, param, callback) {
    connPool.query(query, param, (err, results) => {
        if (err) {
            console.error("Erro ao realizar query", query, err);
            callback(err, null);
        } else {
            console.log("Query realizada com sucesso", query);
            callback(null, results);
        }
    });
}

app.post('/salvar-log', (req, res) => {
    const log = req.body;
    const query = "INSERT INTO gamegenius.logs (n_players, tipo_multiplayer, genero, plataforma) VALUES (?, ?, ?, ?)";
    const pars = [log.n_players, log.tipo_multiplayer, log.genero, log.plataforma];

    dbHandler(query, pars, (err, results) => {
        if (err) {
            res.status(500).send("Erro ao realizar consulta");
        } else {
            res.json(results);
        }
    });
});

app.post('/salvar-jogo', (req, res) => {
    const jogo = req.body;
    const query = "INSERT INTO gamegenius.jogos (nome, avaliacao, genero, plataforma, n_jogadores, descricao) VALUES (?, ?, ?, ?, ?, ?)";
    const pars = [jogo.nome, jogo.avaliacao, jogo.genero, jogo.plataforma, jogo.n_jogadores, jogo.descricao];

    dbHandler(query, pars, (err, results) => {
        if (err) {
            res.status(500).send("Erro ao realizar consulta");
        } else {
            res.json(results);
        }
    });
});

app.post('/jogo-existe', (req, res) => {
    const { nome } = req.body;
    const query = "SELECT jogo_id FROM gamegenius.jogos WHERE nome = ?";
    const pars = [nome];

    dbHandler(query, pars, (err, results) => {
        if (err) {
            res.status(500).send("Erro ao realizar consulta");
        } else {
            res.json(results);
        }
    });
});

const porta = 4002;
app.listen(porta, () => console.log("Gravação de Logs porta ", porta));
