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
    
    res.status(200).send({msg: 'ok'})
}),

app.listen(4000, () => {
    console.log("Logs. Porta 4000")
})