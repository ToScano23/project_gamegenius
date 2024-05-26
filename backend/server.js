require ('dotenv').config()

const express = require('express')
const app = express()
const mysql = require('mysql2')
const porta = 4000
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const  {OPENAI_API_KEY, DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT} = process.env
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

const { OpenAI } = require('openai')
const openai = new OpenAI(OPENAI_API_KEY)

app.use(bodyParser.json())
app.use(cors())

// -------------------------------------------

function formatarPergunta(perguntaJson){
    return `
        Me indique um jogo para ${perguntaJson.n_players} jogador(es).
        Se for multiplayer, no estilo ${perguntaJson.tipo_multiplayer}, sendo ${perguntaJson.genero} seu gênero principal.
        Quero jogar em ${perguntaJson.plataforma}.
        Me retorne a resposta em formato json com os seguintes parâmetros: nome, avaliacao, genero, plataforma, n_jogadores, descricao.
        Sendo que:
        - O nome é o nome comercial do jogo,
        - A avaliacao é a nota média do jogo de 0 a 10,
        - O genero é o gênero principal do jogo,
        - A plataforma são todas as plataformas disponíveis para o jogo separadas por vírgula,
        - O n_jogadores é número máximo de jogadores que o jogo suporta,
        - A descricao é uma breve descrição do jogo
    `
}

async function perguntarChatgpt(pergunta){
    const model = 'gpt-3.5-turbo'
    const role = 'user'
    const max_tokens = 250

    const completion = await openai.chat.completions.create({
        messages: [ {role: role, content: pergunta} ],
        model: model,
        max_tokens: max_tokens
    })

    return completion.choices[0].message.content
}

function dbHandler(query, param){
    connPool.query(query, param, (err, results) => {
        if (err){
            console.error("Erro ao realizar query", query, err)
            res.status(500).send("Erro ao realizar query", query)
        } else{
            console.log("Query realizada com sucesso", query)
            return results
        }
    })
}

// -------------------------------------------

// app.get('/teste', (req, res) => {
//     res.send("Foi")
// })

// app.get('/jogos', (req, res) => {
//     connPool.query("SELECT * FROM gamegenius.jogos", (err, results) => {
//         if (err){
//             console.error("Erro ao realizar consulta", err)
//             res.status(500).send("Erro ao realizar consulta")
//         } else{
//             console.log("Resultados:", results)
//             res.json(results)
//         }
//     })
// })

// app.get('/logs', (req, res) => {
//     connPool.query("SELECT * FROM gamegenius.logs", (err, results) => {
//         if (err){
//             console.error("Erro ao realizar consulta", err)
//             res.status(500).send("Erro ao realizar consulta")
//         } else{
//             console.log("Resultados:", results)
//             res.json(results)
//         }
//     })
// })

// app.post('/salvar-log', (req, res) => {
//     const log = req.body
//     const query = "INSERT INTO gamegenius.logs (n_players, tipo_multiplayer, genero, plataforma) VALUES (?, ?, ?, ?)"
//     const pars = [log.n_players, log.tipo_multiplayer, log.genero, log.plataforma]

//     connPool.query(query, pars, (err, results) => {
//         if (err){
//             console.error("Erro ao realizar consulta", err)
//             res.status(500).send("Erro ao realizar consulta")
//         } else{
//             console.log("Dado inserido com sucesso")
//             res.json(results)
//         }
//     })
// })

// app.post('/salvar-jogo', (req, res, next) => {
//     const jogo = req.body
//     const query = "INSERT INTO gamegenius.jogos (nome, avaliacao, genero, plataforma, n_jogadores, descricao) VALUES (?, ?, ?, ?, ?, ?)"
//     const pars = [jogo.nome, jogo.avaliacao, jogo.genero, jogo.plataforma, jogo.n_jogadores, jogo.descricao]
    
//     connPool.query(query, pars, (err, results) => {
//         if (err){
//             console.error("Erro ao realizar consulta", err)
//             res.status(500).send("Erro ao realizar consulta")
//         } else{
//             console.log("Dado inserido com sucesso")
//             res.json(results)
//         }
//     })
// })

app.post('/new-request', async (req, res) => {
    // INSERIR LOG NO DB
    const log = req.body
    const queryInsertLog = "INSERT INTO gamegenius.logs (n_players, tipo_multiplayer, genero, plataforma) VALUES (?, ?, ?, ?)"
    const parsLog = [log.n_players, log.tipo_multiplayer, log.genero, log.plataforma]

    dbHandler(queryInsertLog, parsLog)

    // FORMATAR PERGUNTA
    const pergunta = formatarPergunta(log)

    // PERGUNTAR AO CHATGPT
    const resposta = await perguntarChatgpt(pergunta)

    console.log("Resposta do CHATGPT:", resposta)
    const jogo = JSON.parse(resposta)

    // VERIFICAR SE JOGO RESPOSTA EXISTE NA BASE
    console.log("Buscando jogo na base")
    const querySelectJogo = "SELECT jogo_id FROM gamegenius.jogos WHERE nome = ?"
    const parsSelect = [jogo.nome]

    const selectResult = dbHandler(querySelectJogo, parsSelect)
    console.log(selectResult)

    // SE NAO EXISTIR, ADICIONAR JOGO
    const queryInsertJogo = "INSERT INTO gamegenius.jogos (nome, avaliacao, genero, plataforma, n_jogadores, descricao) VALUES (?, ?, ?, ?, ?, ?)"
    const parsJogo = [jogo.nome, jogo.avaliacao, jogo.genero, jogo.plataforma, jogo.n_jogadores, jogo.descricao]
        
    dbHandler(queryInsertJogo, parsJogo)

    // SE EXISTIR, NAO ADICIONAR
    
    // ASSOCIAR JOGO AO LOG

    // ENVIAR RESPOSTA PARA O FRONT
    res.status(200).send(jogo)
})

app.post('/eventos', (req, res) => {
    console.log(req.body)
    res.status(200).send({msg: 'Ok'})
})

// -------------------------------------------

app.listen(porta, () => console.log("Executando servidor na porta", porta))
