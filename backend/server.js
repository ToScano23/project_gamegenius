const http = require('http')
const express = require('express')
const app = express()
const porta = 4000
const bodyParser = require('body-parser')
const gameSample = [
    {
    nome: "Mario Odisey",
    avaliacao: "5",
    genero: "Plataforma",
    plataforma: "Nintendo switch",
    n_jogadores: "1-2",
    descricao: "Explore lugares incríveis longe do Reino Cogumelo com o Mario e o novo aliado Cappy em uma imensa aventura 3D ao redor do mundo. Use novas habilidades incríveis – como o poder de capturar e controlar objetos, animais, e inimigos – para coletar Power Moons, ligar a aeronave Odyssey e salvar a princesa Peach de se casar com o Bowser!"
    }
]

app.set('port', porta)
app.set(bodyParser.json())

app.get('/teste', (req, res, next) => {
    res.send('Hellou')
})

app.post('/save-game', (req, res, next) => {
    const gameSample = req.body
    gameSample.push({})
    console.log(game)
    res.status(201).json(game)
})

const server = http.createServer(app)
server.listen(porta)