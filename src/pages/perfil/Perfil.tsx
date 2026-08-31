import { useContext, useEffect } from "react";
import { PencilSimple } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Perfil() {
    const navigate = useNavigate();

    const { usuario } = useContext(AuthContext);

    const token = usuario.token;

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", "info");

            navigate("/");
        }
    }, [token]);

    return (
        <section className="page-section">
            <div className="page-container">
                <div className="mx-auto max-w-5xl">
                <img
                    className="h-56 w-full rounded-2xl border border-line object-cover shadow-sm sm:h-72"
                    src="https://i.imgur.com/ZZFAmzo.jpg"
                    alt="Capa do Perfil"
                />

                <img
                    className="relative z-10 mx-auto -mt-20 size-40 rounded-full border-4 border-panel object-cover shadow-xl ring-1 ring-line sm:-mt-28 sm:size-52"
                    src={usuario.foto}
                    alt={`Foto de perfil de ${usuario.nome}`}
                />

                <div className="surface-card relative -mt-20 flex flex-col items-center px-6 pb-10 pt-24 text-center sm:-mt-24 sm:pt-32">
                    <p className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                        {usuario.nome}
                    </p>
                    <p className="mt-2 text-base text-muted sm:text-lg">
                        {usuario.usuario}
                    </p>

                    {/* Botão de editar */}
                    <Link
                        to={`/atualizarusuario`}
                        className="button-primary mt-8 w-full sm:w-auto"
                    >
                        <PencilSimple
                            size={19}
                            weight="bold"
                            aria-hidden="true"
                        />
                        Editar Perfil
                    </Link>
                </div>
            </div>
            </div>
        </section>
    );
}

export default Perfil;
