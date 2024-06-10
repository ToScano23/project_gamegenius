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

app.post('/eventos', (req, res) => {   
    
    res.status(200).send({msg: 'ok'})
}),

app.listen(3000, () => {
    console.log("Perguntas. Porta 3000")
})