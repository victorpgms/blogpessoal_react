import axios from "axios";

const api = axios.create({
    baseURL: "https://blogpessoal-6s9u.onrender.com",
});

// Função  cadastrar Usuario

export const cadastrarUsuario = async (
    url: string,
    dados: Object,
    setDados: Function,
) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
};

// Função  autenticar Usuario

export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
};

// Função consultar com token
export const buscar = async (
    url: string,
    setDados: Function,
    header: Object,
) => {
    const resposta = await api.get(url, header);
    setDados(resposta.data);
};

// Função cadastrar com token
export const cadastrar = async (
    url: string,
    dados: Object,
    setDados: Function,
    header: Object,
) => {
    const resposta = await api.post(url, dados, header);
    setDados(resposta.data);
};

// Função atualizar com token
export const atualizar = async (
    url: string,
    dados: Object,
    setDados: Function,
    header: Object,
) => {
    const resposta = await api.put(url, dados, header);
    setDados(resposta.data);
};

// Função Deletar com token

export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header);
};
