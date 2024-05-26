const express = require('express')
const axios = require('axios')
const app = express()
app.use(express.json())


app.post('/eventos', (req, res) => {
    const evento = req.body
    // Envia o evento para o microsserviço de backend
    axios.post('http://localhost:4000/eventos', evento)
    res.status(200).send({msg: 'ok'})
})

app.listen(10000, () => {
    console.log('Barramento de eventos. Porta 10000.')
})