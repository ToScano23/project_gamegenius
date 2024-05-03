require ('dotenv').config()

const express = require('express')
const app = express()
const mysql = require('mysql2')
const porta = 4000
const bodyParser = require('body-parser')

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

// -------------------------------------------

function formatarPergunta(perguntaJson){
    return `
        Me indique um jogo para ${perguntaJson.n_players} jogadore(s).
        Se for multiplayer, no estilo ${perguntaJson.tipo_multiplayer}, sendo ${perguntaJson.genero} seu gênero principal.
        Quero jogar em ${perguntaJson.plataforma}.
        Me retorne a resposta em formato json com os seguintes parâmetros: nome, avaliacao, genero, plataforma, n_jogadores, descricao, 
        sendo que:
        - O nome é o nome comercial do jogo,
        - A avaliacao é a nota média do jogo,
        - O genero é o gênero principal do jogo,
        - A plataforma é a plataforma principal ao qual o jogo foi desenvolvido,
        - O n_jogadores é quantos jogadores o jogo suporta,
        - A descricao é uma breve descrição do jogo, de no máximo 10 palavras
    `
}

async function perguntarChatgpt(pergunta){
    const model = 'gpt-3.5-turbo'
    const role = 'user'
    const max_tokens = 150

    const completion = await openai.chat.completions.create({
        messages: [ {role: role, content: pergunta} ],
        model: model,
        max_tokens: max_tokens
    })
    console.log("chegou aqui", completion.choices[0].message.content)
    return completion.choices[0].message.content
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

    connPool.query(queryInsertLog, parsLog, (err, results) => {
        if (err){
            console.error("Erro ao inserir dados de log", err)
            res.status(500).send("Erro ao inserir dados de log")
        } else {
            console.log("Log inserido com sucesso")
            res.json(results)
        }
    })

    // FORMATAR PERGUNTA
    const pergunta = formatarPergunta(log)
    console.log(pergunta)

    // PERGUNTAR AO CHATGPT
    const resposta = await perguntarChatgpt(pergunta)//.then(() => console.log(resposta))
    console.log("a resposta é:",resposta)
    

    // VERIFICAR SE JOGO RESPOSTA EXISTE

    // INSERIR JOGO (SE NECESSÁRIO)
    const jogo = JSON.parse(resposta)
    console.log(jogo.nome)
    /* const queryInsertJogo = "INSERT INTO gamegenius.jogos (nome, avaliacao, genero, plataforma, n_jogadores, descricao) VALUES (?, ?, ?, ?, ?, ?)"
    const parsJogo = [jogo.nome, jogo.avaliacao, jogo.genero, jogo.plataforma, jogo.n_jogadores, jogo.descricao]
    
    connPool.query(queryInsertJogo, parsJogo, (err, results) => {
        if (err){
            console.error("Erro ao inserir dados de jogo", err)
            res.status(500).send("Erro ao inserir dados de jogo")
        } else{
            console.log("Dado inserido com sucesso")
        }
    }) */

    // ASSOCIAR JOGO AO LOG

    // MOSTRAR RESPOSTA

    // console.log("Erro na aplicação")

    // process.exit()
})

// -------------------------------------------

app.listen(porta, () => console.log("Executando servidor na porta:", porta))
