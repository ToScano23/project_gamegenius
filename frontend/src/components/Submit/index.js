import axios from "axios"
const url1 = "http://localhost:4000/new-request"
//const url2 = "http://localhost:4000/consulta-chatgpt"


export const submitjogo = (jogo) => axios.post(url1, jogo)