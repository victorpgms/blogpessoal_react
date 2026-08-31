import {
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
import { FOTO_PADRAO } from "../../utils/imagemPadrao";
import { normalizarEmail } from "../../utils/normalizarEmail";

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

    // Funçao responsavel por atualizar o estado usuario
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        const valor =
            e.target.name === "usuario"
                ? normalizarEmail(e.target.value)
                : e.target.value;

        setUsuario({
            ...usuario,
            [e.target.name]: valor,
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
            const usuarioNormalizado = {
                ...usuario,
                usuario: normalizarEmail(usuario.usuario),
                foto: usuario.foto.trim() || FOTO_PADRAO,
            };

            await cadastrarUsuario(
                `/usuarios/cadastrar`,
                usuarioNormalizado,
                setUsuario,
            );
            ToastAlerta("Usuario cadastrado com sucesso!", "sucesso");
            navigate("/");
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

    return (
        <div className="grid min-h-screen grid-cols-1 bg-app lg:grid-cols-2">
            <div
                className="relative hidden min-h-screen w-full bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] bg-cover bg-center before:absolute before:inset-0 before:bg-slate-950/20 lg:block dark:before:bg-slate-950/40"
                role="img"
                aria-label="Paisagem decorativa"
            />
            <div className="flex items-center justify-center px-4 py-10 sm:px-8">
                <form
                    className="form-card flex max-w-xl flex-col gap-4"
                    onSubmit={cadastrarNovoUsuario}
                >
                    <div className="mb-1 text-center">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                            Junte-se à comunidade
                        </p>
                        <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                            Cadastrar
                        </h1>
                        <p className="mt-3 font-normal text-muted">
                            Crie seu perfil e comece a compartilhar suas ideias.
                        </p>
                    </div>
                    <div>
                        <label className="field-label" htmlFor="nome">
                            Nome
                        </label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Nome"
                            className="form-field"
                            value={usuario.nome}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                atualizarEstado(e)
                            }
                        />
                    </div>
                    <div>
                        <label className="field-label" htmlFor="usuario">
                            Usuario
                        </label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className="form-field"
                            value={usuario.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                atualizarEstado(e)
                            }
                        />
                    </div>
                    <div>
                        <label className="field-label" htmlFor="foto">
                            Foto
                        </label>
                        <input
                            type="text"
                            id="foto"
                            name="foto"
                            placeholder="Foto"
                            className="form-field"
                            value={usuario.foto}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                atualizarEstado(e)
                            }
                        />
                    </div>
                    <div>
                        <label className="field-label" htmlFor="senha">
                            Senha
                        </label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="form-field"
                            value={usuario.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                atualizarEstado(e)
                            }
                        />
                    </div>
                    <div>
                        <label
                            className="field-label"
                            htmlFor="confirmarSenha"
                        >
                            Confirmar Senha
                        </label>
                        <input
                            type="password"
                            id="confirmarSenha"
                            name="confirmarSenha"
                            placeholder="Confirmar Senha"
                            className="form-field"
                            value={confirmarSenha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleConfirmarSenha(e)
                            }
                        />
                    </div>
                    <div className="flex w-full flex-col-reverse gap-3 pt-2 sm:flex-row">
                        <button
                            type="reset"
                            className="button-secondary w-full"
                            onClick={retornar}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="button-primary w-full"
                            disabled={isLoading}
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
        </div>
    );
}

export default Cadastro;
