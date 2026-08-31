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

            setUser((user) => ({ ...user, senha: "" }));
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
        setUser({
            ...user,
            [e.target.name]: e.target.value,
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
            await atualizar(`/usuarios/atualizar`, user, setUser, {
                headers: {
                    Authorization: token,
                },
            });

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
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="container mx-auto max-w-7xl">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]">
                        {/* Seção da foto */}
                        <div className="bg-indigo-500 p-8 flex flex-col items-center justify-center">
                            <div className="relative">
                                <img
                                    src={user.foto}
                                    alt={user.nome}
                                    className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-lg"
                                />
                            </div>

                            <h2 className="text-white text-2xl font-bold mt-6 text-center">
                                {user.nome}
                            </h2>

                            <p className="text-indigo-100 text-base mt-2">
                                {user.usuario}
                            </p>
                        </div>

                        {/* Seção do formulário */}
                        <div className="p-8 lg:p-12">
                            <h1 className="text-4xl text-center my-2">
                                Editar Perfil
                            </h1>

                            <form
                                onSubmit={atualizarUsuario}
                                className="space-y-4"
                            >
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="nome"
                                        className="font-bold mb-1"
                                    >
                                        Nome
                                    </label>

                                    <input
                                        type="text"
                                        id="nome"
                                        name="nome"
                                        placeholder="Nome"
                                        className="px-4 py-2 border-2 border-slate-700 rounded focus:outline-none"
                                        value={user.nome || ""}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>,
                                        ) => atualizarEstado(e)}
                                        required
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label
                                        htmlFor="usuario"
                                        className="font-bold mb-1"
                                    >
                                        Usuario
                                    </label>

                                    <input
                                        type="email"
                                        id="usuario"
                                        name="usuario"
                                        placeholder="Usuario"
                                        className="px-4 py-2 border-2 border-slate-700 rounded bg-gray-100 cursor-not-allowed"
                                        disabled
                                        value={user.usuario || ""}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>,
                                        ) => atualizarEstado(e)}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label
                                        htmlFor="foto"
                                        className="font-bold mb-1"
                                    >
                                        Foto
                                    </label>

                                    <input
                                        type="url"
                                        id="foto"
                                        name="foto"
                                        placeholder="Foto"
                                        className="px-4 py-2 border-2 border-slate-700 rounded focus:outline-none"
                                        value={user.foto || ""}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>,
                                        ) => atualizarEstado(e)}
                                        required
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label
                                        htmlFor="senha"
                                        className="font-bold mb-1"
                                    >
                                        Senha
                                    </label>

                                    <input
                                        type="password"
                                        id="senha"
                                        name="senha"
                                        placeholder="Senha"
                                        className="px-4 py-2 border-2 border-slate-700 rounded focus:outline-none"
                                        value={user.senha || ""}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>,
                                        ) => atualizarEstado(e)}
                                        required
                                        minLength={8}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label
                                        htmlFor="confirmarSenha"
                                        className="font-bold mb-1"
                                    >
                                        Confirmar Senha
                                    </label>

                                    <input
                                        type="password"
                                        id="confirmarSenha"
                                        name="confirmarSenha"
                                        placeholder="Confirmar Senha"
                                        className="px-4 py-2 border-2 border-slate-700 rounded focus:outline-none"
                                        value={confirmarSenha}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>,
                                        ) => handleConfirmarSenha(e)}
                                        required
                                        minLength={8}
                                    />
                                </div>

                                <div className="flex justify-around gap-8 pt-4">
                                    <button
                                        type="button"
                                        className="rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2 font-bold"
                                        onClick={retornar}
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="submit"
                                        className="rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2 py-2 flex justify-center font-bold"
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
