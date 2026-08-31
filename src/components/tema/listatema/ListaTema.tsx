import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar } from "../../../services/Service";
import CardTema from "../cardtema/CardTema";
import { SyncLoader } from "react-spinners";
import axios from "axios";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaTemas() {
    // Objeto responsavel por redirecionar o usuario para outra rota
    const navigate = useNavigate();

    // Estado responsavel por controlar o loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Estado responsavel por armazenas todos os temas persistidos no backENd API
    const [temas, setTemas] = useState<Tema[]>([]);

    // Consumo da Context para Obter os dados do usuario autenticado (estado usuario)
    //e a função handlelogout para efetuar logout caso o token seja invalido
    const { usuario, handleLogout } = useContext(AuthContext);

    const token = usuario.token;

    // useEffect para monitorar o token
    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!","erro");
            navigate("/");
        }
    }, [token]);

    //  useEffect responsável por executar a função buscarTemas
    useEffect(() => {
        buscarTemas();
    }, [temas.length]);

    // Função responsavel por buscar todos os temas do backend (api)
    async function buscarTemas() {
        try {
            setIsLoading(true);

            await buscar("/tema", setTemas, {
                headers: { Authorization: token },
            });
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                ToastAlerta(`Erro ao consultar os temas: ${error.response.status}`, "erro");

                handleLogout();
            } else {
                ToastAlerta(
                    "Erro ao consultar os temas! Verifique a conexão com a API!", "erro"
                );
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {isLoading && (
                <div className="flex w-full justify-center py-14 text-brand">
                    <SyncLoader color="var(--app-brand)" size={14} />
                </div>
            )}

            <section className="page-section min-h-[70vh]">
                <div className="page-container flex flex-col">
                    {!isLoading && temas.length === 0 && (
                        <span className="surface-card my-8 px-6 py-12 text-center text-xl font-semibold text-muted sm:text-2xl">
                            Nenhum Tema foi encontrado!
                        </span>
                    )}

                    <div
                        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {temas.map((tema) => (
                            <CardTema key={tema.id} tema={tema} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default ListaTemas;
