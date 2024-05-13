import axios from "axios"
const url1 = "http://localhost:4000/new-request"

export const submitjogo = (jogo) => axios.post(url1, jogo) 