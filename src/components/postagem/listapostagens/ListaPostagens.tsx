import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import CardPostagem from "../cardpostagem/CardPostagem";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaPostagens() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [postagens, setPostagens] = useState<Postagem[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", "erro");
            navigate("/");
        }
    }, [token]);

    useEffect(() => {
        buscarPostagens();
    }, [postagens.length]);

    async function buscarPostagens() {
        try {
            setIsLoading(true);

            await buscar("/postagens", setPostagens, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout();
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

            <section className="page-section">
                <div className="page-container flex flex-col">
                    {!isLoading && postagens.length === 0 && (
                        <span className="surface-card my-8 px-6 py-12 text-center text-xl font-semibold text-muted sm:text-2xl">
                            Nenhuma Postagem foi encontrada!
                        </span>
                    )}

                    <div
                        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {postagens.map((postagem) => (
                            <CardPostagem
                                key={postagem.id}
                                postagem={postagem}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
export default ListaPostagens;
