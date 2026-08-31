import {
    useEffect,
    useState,
    type ChangeEvent,
    type SyntheticEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Cadastro() {
    // Objeto responsavel por Redirecionar o usuario para outra rota
    const navigate = useNavigate();

    // Responsavel por controlar o loader(animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Estado Responsável por guardar os dados do usuario que serao
    // persistidos (gravados) no banco de dados da minha API
    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
    });
    // Estado responsavel por guardar senha no campo confirmar senha
    const [confirmarSenha, setConfirmarSenha] = useState<string>("");

    // tratar do efeito colateral do sucesso do cadastro e redirecionar para a página de login
    useEffect(() => {
        if (usuario.id !== 0) {
            retornar();
        }
    }, [usuario]);

    // Funçao responsavel por atualizar o estado usuario
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    }
    // Funçao responsavel por atualizar o estado confirmarSenha
    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value);
    }
    // Funçao responsavel por enviar uma requisição do tipo POST com os dados do usuário (estado usuario )

    async function cadastrarNovoUsuario(e: SyntheticEvent<HTMLFormElement>) {
        // impede o envio automatico do formulario
        e.preventDefault();

        // Validação da senha digitada
        if (confirmarSenha !== usuario.senha || usuario.senha.length < 8) {
            ToastAlerta(
                "Senhas não conferem e/ou não possuem pelo menos 8 caracteres", "erro"
            );
            setUsuario({ ...usuario, senha: "" });
            setConfirmarSenha("");
            return;
        }
        setIsLoading(true);

        try {
            await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
            ToastAlerta("Usuario cadastrado com sucesso!", "sucesso");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                ToastAlerta(`Erro ao cadastrar o usuário: ${error.response.status}`, "erro");
            } else {
                ToastAlerta(
                    "Erro ao cadastrar o usuário! Verifique a conexão com a API!", "erro"
                );
            }
        } finally {
            setIsLoading(false);
        }
    }

    // função para retornar a pagina de login
    function retornar() {
        navigate("/");
    }

    console.log(JSON.stringify(usuario));
    console.log(confirmarSenha);

    return (
        <>
            <div
                className="grid grid-cols-1 lg:grid-cols-2 h-screen
            place-items-center font-bold"
            >
                <div
                    className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat
                w-full min-h-screen bg-cover bg-center"
                ></div>
                <form
                    className="flex justify-center items-center flex-col w-2/3 gap-3"
                    onSubmit={cadastrarNovoUsuario}
                >
                    <h2 className="text-slate-900 text-5xl">Cadastrar</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Nome"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuario.nome}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                atualizarEstado(e)
                            }
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario">Usuario</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuario.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                atualizarEstado(e)
                            }
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="foto">Foto</label>
                        <input
                            type="text"
                            id="foto"
                            name="foto"
                            placeholder="Foto"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuario.foto}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                atualizarEstado(e)
                            }
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuario.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                atualizarEstado(e)
                            }
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="confirmarSenha">Confirmar Senha</label>
                        <input
                            type="password"
                            id="confirmarSenha"
                            name="confirmarSenha"
                            placeholder="Confirmar Senha"
                            className="border-2 border-slate-700 rounded p-2"
                            value={confirmarSenha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleConfirmarSenha(e)
                            }
                        />
                    </div>
                    <div className="flex justify-around w-full gap-8">
                        <button
                            type="reset"
                            className="rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2"
                            onClick={retornar}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="rounded text-white bg-indigo-400
                    hover:bg-indigo-900 w-1/2 py-2
                    flex justify-center"
                        >
                            {isLoading ? (
                                <ClipLoader color="#ffffff" size={24} />
                            ) : (
                                <span>Cadastrar</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Cadastro;
