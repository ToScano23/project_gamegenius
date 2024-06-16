

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

app.use(bodyParser.json());
app.use(cors());

const LOG_SERVICE_URL = 'http://localhost:4002';
const CHATGPT_SERVICE_URL = 'http://localhost:4001';
const REPORTS_SERVICE_URL = 'http://localhost:4003';

app.post('/new-request', async (req, res) => {
    const input = req.body;

    // Salvar log no banco de dados
    await axios.post(`${LOG_SERVICE_URL}/salvar-log`, input);

    // Enviar a pergunta ao ChatGPT
    const resposta = await axios.post(`${CHATGPT_SERVICE_URL}/pergunta`, input);
    //console.log(resposta)
    const jogo = resposta.data;
    
    // Verificar se o jogo já existe no banco de dados
    const jogoExistente = await axios.post(`${LOG_SERVICE_URL}/jogo-existe`, { nome: jogo.nome });

    // Se o jogo não existe, adicioná-lo
    if (jogoExistente.data.length === 0) {
        await axios.post(`${LOG_SERVICE_URL}/salvar-jogo`, jogo);
    }

    // Salvar log no banco de dados de relatórios
    axios.post(`${REPORTS_SERVICE_URL}/relatorios`, jogo);

    // Enviar resposta para o frontend
    res.status(200).send(jogo);
});

app.get(`/relatorio_diario`, async (req, res) => {
    const response = await axios.get(`${REPORTS_SERVICE_URL}/relatorio_diario`);
    res.status(200).send(response.data);
});

app.get(`/relatorio_nome`, async (req, res) => {
    const response = await axios.get(`${REPORTS_SERVICE_URL}/relatorio_nome`);
    res.status(200).send(response.data);
});

const porta = 4000;
app.listen(porta, () => console.log("Barramento de Eventos porta ", porta));
