import {
    useContext,
    useEffect,
    useState,
    type ChangeEvent,
    type SyntheticEvent,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormTema() {
    // Objeto responsável redirecionar o tema para uma outra rota
    const navigate = useNavigate();

    // Estado responsável por controlar o loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Estado responsável por armazenar os dados do tema que será persistido no Backend (API)
    const [tema, setTema] = useState<Tema>({} as Tema);

    // Consumo da Context para obter os dados do tema autenticado (estado usuario)
    // e a função handleLogout para efetuar logout caso o token seja inválido
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    // Acessar o parâmetro da rota (id do tema)
    const { id } = useParams<{ id: string }>();

    // Função responsável por buscar um tema pelo ID no Backend (API)
    async function buscarTemaPorId() {
        setIsLoading(true);

        try {
            await buscar(`/tema/${id}`, setTema, {
                headers: { Authorization: token },
            });
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                ToastAlerta(
                    `Erro ao consultar o tema: ${error.response.status}`,
                    "erro",
                );
                handleLogout();
            }
        } finally {
            setIsLoading(false);
        }
    }

    // useEffect para monitorar o id (parâmetro da rota)
    useEffect(() => {
        if (id !== undefined) {
            buscarTemaPorId();
        }
    }, [id]);

    // useEffect para monitorar o token
    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", "erro");
            navigate("/");
        }
    }, [token]);

    // Função responsável por atualizar  o estado tema
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value,
        });
    }

    // Função responsável por enviar uma requisição do tipo POST ou PUT
    // com oa dados do tema (estado tema)
    async function gerarNovoTema(e: SyntheticEvent<HTMLFormElement>) {
        // Impede o envio automático do formulário
        e.preventDefault();

        setIsLoading(true);

        if (id !== undefined) {
            try {
                await atualizar(`/tema`, tema, setTema, {
                    headers: { Authorization: token },
                });
                ToastAlerta("Tema atualizado com sucesso!", "sucesso");
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    ToastAlerta(
                        `Erro ao atualizar o tema: ${error.response?.status}`,
                        "erro",
                    );
                    if (error.response?.status === 401) {
                        handleLogout();
                    }
                }
                return;
            } finally {
                setIsLoading(false);
            }
        } else {
            try {
                await cadastrar(`/tema`, tema, setTema, {
                    headers: { Authorization: token },
                });
                ToastAlerta("Tema cadastrado com sucesso!", "sucesso");
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    ToastAlerta(
                        `Erro ao cadastrar o tema: ${error.response?.status}`,
                        "erro",
                    );
                    if (error.response?.status === 401) {
                        handleLogout();
                    }
                }
                return;
            } finally {
                setIsLoading(false);
            }
        }

        retornar();
    }

    function retornar() {
        navigate("/tema");
    }

    return (
        <section className="page-section min-h-[70vh]">
            <div className="page-container max-w-2xl">
                <h1 className="mb-8 text-center text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                    {id === undefined ? "Cadastrar" : "Editar"} Tema
                </h1>

                <form
                    className="form-card flex flex-col gap-5"
                    onSubmit={gerarNovoTema}
                >
                    <div>
                    <label className="field-label" htmlFor="descricao">
                        Descrição do Tema
                    </label>
                    <input
                        type="text"
                        id="descricao"
                        placeholder="Descreva aqui seu tema"
                        name="descricao"
                        className="form-field"
                        value={tema.descricao || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            atualizarEstado(e)
                        }
                    />
                    </div>
                    <button
                        className="button-primary mt-2 w-full sm:mx-auto sm:w-auto sm:min-w-48"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ClipLoader color="#ffffff" size={24} />
                        ) : (
                            <span>
                                {id === undefined ? "Cadastrar" : "Atualizar"}{" "}
                                Tema
                            </span>
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default FormTema;
