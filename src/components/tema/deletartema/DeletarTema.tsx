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
        <div className="container w-1/3 mx-auto">
            <h1 className="text-4xl text-center my-4">Deletar tema</h1>

            <p className="text-center font-semibold mb-4">
                Você tem certeza de que deseja apagar o tema a seguir?
            </p>

            <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
                <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
                    Tema
                </header>

                <p className="p-8 text-3xl bg-slate-200 h-full">
                    {tema.descricao}
                </p>

                <div className="flex">
                    <button
                        className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
                        onClick={retornar}
                    >
                        Não
                    </button>

                    <button
                        className="w-full text-slate-100 bg-indigo-400
                      hover:bg-indigo-600 flex items-center justify-center"
                        onClick={deletarTema}
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
    );
}
export default DeletarTema;
