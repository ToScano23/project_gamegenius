import axios from "axios"
const url1 = "http://10.2.127.49:4000/new-request"
const url2 = "http://10.2.127.49:4000/relatorio_diario"
const url3 = "http://10.2.127.49:4000/relatorio_nome"

export const submitjogo = (jogo) => axios.post(url1, jogo) 
export const consultaRelatorioDiario = () => axios.get(url2)
export const consultaRelatorioNome = () => axios.get(url3)