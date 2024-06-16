require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAI } = require('openai');

const { OPENAI_API_KEY } = process.env;
const openai = new OpenAI(OPENAI_API_KEY);

app.use(bodyParser.json());
app.use(cors());

function formatarPergunta(perguntaJson) {
    return `
        Me indique um jogo para ${perguntaJson.n_players} jogador(es).
        Se for multiplayer, no estilo ${perguntaJson.tipo_multiplayer}, sendo ${perguntaJson.genero} seu gênero principal.
        Quero jogar em ${perguntaJson.plataforma}.
        Me retorne a resposta em formato json com os seguintes parâmetros: nome, avaliacao, genero, plataforma, n_jogadores, descricao.
        Evite repetir jogos já mencionados anteriormente.
        Sendo que:
        - O nome é o nome comercial do jogo,
        - A avaliacao é a nota média do jogo de 0 a 10,
        - O genero é o gênero principal do jogo,
        - A plataforma são todas as plataformas disponíveis para o jogo separadas por vírgula,
        - O n_jogadores é número máximo de jogadores que o jogo suporta,
        - A descricao é uma breve descrição do jogo
    `;
}

async function perguntarChatgpt(pergunta) {
    const model = 'gpt-3.5-turbo';
    const role = 'user';
    const max_tokens = 250;

    const completion = await openai.chat.completions.create({
        messages: [{ role: role, content: pergunta }],
        model: model,
        max_tokens: max_tokens
    });

    return completion.choices[0].message.content;
}

app.post('/pergunta', async (req, res) => {
    const perguntaJson = req.body;
    const pergunta = formatarPergunta(perguntaJson);
    console.log(pergunta)
    const resposta = await perguntarChatgpt(pergunta);
    //console.log("Resposta do ChatGPT:", resposta);
    const respostaJson = JSON.parse(resposta);
    console.log("Resposta do ChatGPT (JSON):", respostaJson);
    res.status(200).send(respostaJson);
});

const porta = 4001;
app.listen(porta, () => console.log("ChatGPT rodando porta ", porta));
