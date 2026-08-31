import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarTema() {
    // Objeto responsável redirecionar o tema para uma outra rota
    const navigate = useNavigate();

    // Estado responsável por controlar o loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Estado responsável por armazenar os dados do tema que será deletado no Backend (API)
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
            if (axios.isAxiosError(error)) {
                ToastAlerta(`Erro ao deletar o tema: ${error.response?.status}`, "erro");
                if (error.response?.status === 401) {
                    handleLogout();
                }
            }
            return;
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
            ToastAlerta("Você precisa estar logado!","erro");
            navigate("/");
        }
    }, [token]);

    // Função responsável por deletar um tema pelo ID no Backend (API)
    async function deletarTema() {
        setIsLoading(true);

        try {
            await deletar(`/tema/${id}`, {
                headers: { Authorization: token },
            });

            ToastAlerta("Tema deletado com sucesso!","sucesso");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                ToastAlerta(`Erro ao consultar o tema: ${error.response?.status}`,"erro");
                if (error.response?.status === 401) {
                    handleLogout();
                }
            }
        } finally {
            setIsLoading(false);
        }

        retornar();
    }

    function retornar() {
        navigate("/tema");
    }

    return (
        <section className="page-section min-h-[70vh]">
            <div className="page-container max-w-2xl">
            <h1 className="mb-3 text-center text-3xl font-bold tracking-tight text-ink sm:text-4xl">Deletar tema</h1>

            <p className="mb-8 text-center font-medium text-muted">
                Você tem certeza de que deseja apagar o tema a seguir?
            </p>

            <div className="surface-card flex flex-col overflow-hidden">
                <header className="border-b border-line bg-panel-muted px-6 py-4 text-xl font-bold text-ink">
                    Tema
                </header>

                <p className="h-full p-8 text-2xl font-semibold text-ink">
                    {tema.descricao}
                </p>

                <div className="flex flex-col-reverse gap-3 border-t border-line p-4 sm:flex-row">
                    <button
                        className="button-secondary w-full"
                        onClick={retornar}
                    >
                        Não
                    </button>

                    <button
                        className="button-danger w-full"
                        onClick={deletarTema}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ClipLoader color="#ffffff" size={24} />
                        ) : (
                            <span>Sim</span>
                        )}
                    </button>
                </div>
            </div>
            </div>
        </section>
    );
}
export default DeletarTema;
