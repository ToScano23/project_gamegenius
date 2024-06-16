require('dotenv').config();

const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');


const currentdate = new Date();


//Este serviço utiliza conexão ao Aiven, em um banco de dados separado, para o serviço de relatórios
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

app.post('/relatorios', (req, res) => {
    const jogo = req.body;
    const query = "INSERT INTO gamegenius.relatorio (nome_jogo, avaliacao_jogo, genero_jogo, plataforma_jogo, n_jogadores_jogo, descricao_jogo, data_consulta) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const pars = [jogo.nome, jogo.avaliacao, jogo.genero, jogo.plataforma, jogo.n_jogadores, jogo.descricao, currentdate];

    dbHandler(query, pars, (err, results) => {
        if (err) {
            res.status(500).send("Erro ao realizar consulta");
        } else {
            res.status(200);
        }
    });
});

app.get('/relatorio_diario', (req,res) => {
    const query = "SELECT data_consulta as date, COUNT(*) as count FROM gamegenius.relatorio GROUP BY data_consulta ORDER BY data_consulta ASC";
    dbHandler(query, [], (err, results) => {
        if (err) {
            res.status(500).send("Erro ao realizar consulta");
        } else {
            res.status(200).send(results);
        }
    });
});

app.get('/relatorio_nome', (req,res) => {
    const query = "SELECT nome_jogo as nome, COUNT(*) as count FROM gamegenius.relatorio GROUP BY nome_jogo ORDER BY count DESC";
    dbHandler(query, [], (err, results) => {
        if (err) {
            res.status(500).send("Erro ao realizar consulta");
        } else {
            res.status(200).send(results);
            console.log(results);
        }
    });
});


const porta = 4003;
app.listen(porta, () => console.log("Gravação de relatórios porta ", porta));
