import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar } from "../../../services/Service";
import CardTema from "../cardtema/CardTema";
import { SyncLoader } from "react-spinners";
import axios from "axios";

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
            alert("Você precisa estar logado!");
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
                alert(`Erro ao consultar os temas: ${error.response.status}`);

                handleLogout();
            } else {
                alert(
                    "Erro ao consultar os temas! Verifique a conexão com a API!",
                );
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {isLoading && (
                <div className="flex justify-center w-full my-8">
                    <SyncLoader color="#312e81" size={32} />
                </div>
            )}

            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    {!isLoading && temas.length === 0 && (
                        <span className="text-3xl text-center my-8">
                            Nenhum Tema foi encontrado!
                        </span>
                    )}

                    <div
                        className="grid grid-cols-1 md:grid-cols-2
                        lg:grid-cols-3 gap-8"
                    >
                        {temas.map((tema) => (
                            <CardTema key={tema.id} tema={tema} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaTemas;
