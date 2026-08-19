import axios from "axios";

const api = axios.create({
    baseURL: 'https://blogpessoal-6s9u.onrender.com'
})

//funcao para cadastrar usuários
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) =>{
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

//funcao para autenticar usuários
export const login = async (url: string, dados: Object, setDados: Function) =>{
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}


