import {
    type ChangeEvent,
    type SyntheticEvent,
    useContext,
    useEffect,
    useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { ClipLoader } from "react-spinners";

import { AuthContext } from "../../contexts/AuthContext";

import type Usuario from "../../models/Usuario";

import { atualizar, buscar } from "../../services/Service";

import axios from "axios";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { FOTO_PADRAO } from "../../utils/imagemPadrao";
import { normalizarEmail } from "../../utils/normalizarEmail";

function AtualizarPerfil() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [user, setUser] = useState<Usuario>({} as Usuario);

    const [confirmarSenha, setConfirmarSenha] = useState<string>("");

    const { usuario, handleLogout } = useContext(AuthContext);

    const token = usuario.token;

    const id: string = usuario.id.toString();

    async function buscarUsuarioPorId() {
        try {
            await buscar(`/usuarios/${id}`, setUser, {
                headers: {
                    Authorization: token,
                },
            });

            setUser((user) => ({
                ...user,
                usuario: normalizarEmail(user.usuario || ""),
                senha: "",
            }));
            setConfirmarSenha("");
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout();
            } else {
                ToastAlerta("Usuário não encontrado!", "erro");
                retornar();
            }
        }
    }

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!","erro");
            navigate("/");
        }
    }, [token]);

    useEffect(() => {
        setUser({} as Usuario);
        setConfirmarSenha("");
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (id !== undefined) {
            buscarUsuarioPorId();
        }
    }, [id]);

    function retornar() {
        navigate("/perfil");
    }

    function sucesso() {
        handleLogout();
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        const valor =
            e.target.name === "usuario"
                ? normalizarEmail(e.target.value)
                : e.target.value;

        setUser({
            ...user,
            [e.target.name]: valor,
        });
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value);
    }

    async function atualizarUsuario(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        if (confirmarSenha !== user.senha || user.senha.length < 8) {
            ToastAlerta(
                "Senhas não conferem e/ou não possuem pelo menos 8 caracteres", "erro"
            );

            setUser({ ...user, senha: "" });
            setConfirmarSenha("");

            return;
        }

        setIsLoading(true);

        try {
            const usuarioNormalizado = {
                ...user,
                usuario: normalizarEmail(user.usuario || ""),
                foto: user.foto?.trim() || FOTO_PADRAO,
            };

            await atualizar(
                `/usuarios/atualizar`,
                usuarioNormalizado,
                setUser,
                {
                    headers: {
                        Authorization: token,
                    },
                },
            );

            ToastAlerta(
                "Usuário atualizado com sucesso! \n Efetue o Login Novamente!", "sucesso"
            );

            sucesso();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                ToastAlerta(
                    `Erro ao atualizar o usuário (${error.response?.status})`, "erro"
                );

                return;
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="page-section min-h-screen bg-app">
            <div className="page-container">
                <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-line bg-panel shadow-xl">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]">
                        {/* Seção da foto */}
                        <div className="flex flex-col items-center justify-center border-b border-line bg-panel-muted p-8 lg:border-b-0 lg:border-r">
                            <div className="relative">
                                <img
                                    src={user.foto?.trim() || FOTO_PADRAO}
                                    alt={user.nome}
                                    className="size-44 rounded-full border-4 border-panel object-cover shadow-lg ring-1 ring-line sm:size-48"
                                    onError={(event) => {
                                        event.currentTarget.onerror = null;
                                        event.currentTarget.src = FOTO_PADRAO;
                                    }}
                                />
                            </div>

                            <h2 className="mt-6 text-center text-2xl font-bold text-ink">
                                {user.nome}
                            </h2>

                            <p className="mt-2 text-base text-muted">
                                {user.usuario}
                            </p>
                        </div>

                        {/* Seção do formulário */}
                        <div className="p-8 lg:p-12">
                            <h1 className="mb-8 text-center text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                                Editar Perfil
                            </h1>

                            <form
                                onSubmit={atualizarUsuario}
                                className="space-y-4"
                            >
                                <div>
                                    <label
                                        htmlFor="nome"
                                        className="field-label"
                                    >
                                        Nome
                                    </label>

                                    <input
                                        type="text"
                                        id="nome"
                                        name="nome"
                                        placeholder="Nome"
                                        className="form-field"
                                        value={user.nome || ""}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>,
                                        ) => atualizarEstado(e)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="usuario"
                                        className="field-label"
                                    >
                                        Usuario
                                    </label>

                                    <input
                                        type="email"
                                        id="usuario"
                                        name="usuario"
                                        placeholder="Usuario"
                                        className="form-field"
                                        disabled
                                        value={user.usuario || ""}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>,
                                        ) => atualizarEstado(e)}
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="foto"
                                        className="field-label"
                                    >
                                        Foto
                                    </label>

                                    <input
                                        type="url"
                                        id="foto"
                                        name="foto"
                                        placeholder="Foto"
                                        className="form-field"
                                        value={user.foto || ""}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>,
                                        ) => atualizarEstado(e)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="senha"
                                        className="field-label"
                                    >
                                        Senha
                                    </label>

                                    <input
                                        type="password"
                                        id="senha"
                                        name="senha"
                                        placeholder="Senha"
                                        className="form-field"
                                        value={user.senha || ""}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>,
                                        ) => atualizarEstado(e)}
                                        required
                                        minLength={8}
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="confirmarSenha"
                                        className="field-label"
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
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>,
                                        ) => handleConfirmarSenha(e)}
                                        required
                                        minLength={8}
                                    />
                                </div>

                                <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row">
                                    <button
                                        type="button"
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
                                            <ClipLoader
                                                color="#ffffff"
                                                size={24}
                                            />
                                        ) : (
                                            <span>Atualizar</span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AtualizarPerfil;
