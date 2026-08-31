import {
    useContext,
    useEffect,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormPostagem() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [temas, setTemas] = useState<Tema[]>([]);

    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: "",
    });

    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: "",
        texto: "",
        data: "",
        tema: null,
        usuario: null,
    });

    const { id } = useParams<{ id: string }>();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarTemaPorId(id: string) {
        try {
            await buscar(`/tema/${id}`, setTema, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout();
            }
        }
    }

    async function buscarPostagemPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout();
            }
        }
    }

    async function buscarTemas() {
        try {
            await buscar("/tema", setTemas, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado", "erro");
            navigate("/");
        }
    }, [token]);

    useEffect(() => {
        buscarTemas();

        if (id !== undefined) {
            buscarPostagemPorId(id);
        }
    }, [id]);

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
        });
    }, [tema]);

    function atualizarEstado(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario,
        });
    }

    function retornar() {
        navigate("/postagens");
    }

    async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        if (id !== undefined) {
            try {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });

                ToastAlerta("Postagem atualizada com sucesso", "sucesso");
            } catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout();
                } else {
                    ToastAlerta("Erro ao atualizar a Postagem", "erro");
                }
            }
        } else {
            try {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });

                ToastAlerta("Postagem cadastrada com sucesso", "sucesso");
            } catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout();
                } else {
                    ToastAlerta("Erro ao cadastrar a Postagem", "erro");
                }
            }
        }

        setIsLoading(false);
        retornar();
    }

    const carregandoTema = tema.descricao === "";

    return (
        <section className="form-page page-section min-h-[70vh]">
            <div className="page-container max-w-3xl">
                <h1 className="mb-8 text-center text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                    {id !== undefined
                        ? "Editar Postagem"
                        : "Cadastrar Postagem"}
                </h1>

                <form
                    className="form-page-card form-card flex flex-col gap-5"
                    onSubmit={gerarNovaPostagem}
                >
                    <div>
                        <label className="field-label" htmlFor="titulo">
                            Título da Postagem
                        </label>
                        <input
                            type="text"
                            id="titulo"
                            placeholder="Título"
                            name="titulo"
                            required
                            className="form-field"
                            value={postagem.titulo}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                atualizarEstado(e)
                            }
                        />
                    </div>

                    <div>
                        <label className="field-label" htmlFor="texto">
                            Texto da Postagem
                        </label>
                        <textarea
                            id="texto"
                            name="texto"
                            placeholder="Escreva o texto da postagem"
                            required
                            rows={5}
                            className="form-field min-h-32 resize-y"
                            value={postagem.texto}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                atualizarEstado(e)
                            }
                        />
                    </div>

                    <div>
                        <label className="field-label" htmlFor="tema">
                            Tema da Postagem
                        </label>
                        <select
                            name="tema"
                            id="tema"
                            className="form-field"
                            defaultValue=""
                            onChange={(e) =>
                                buscarTemaPorId(e.currentTarget.value)
                            }
                        >
                            <option value="" disabled>
                                Selecione um Tema
                            </option>

                            {temas.map((tema) => (
                                <option key={tema.id} value={tema.id}>
                                    {tema.descricao}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="button-primary mt-2 w-full sm:mx-auto sm:w-auto sm:min-w-48"
                        disabled={carregandoTema || isLoading}
                    >
                        {isLoading ? (
                            <ClipLoader color="#ffffff" size={24} />
                        ) : (
                            <span>
                                {id === undefined ? "Cadastrar" : "Atualizar"}
                            </span>
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default FormPostagem;
