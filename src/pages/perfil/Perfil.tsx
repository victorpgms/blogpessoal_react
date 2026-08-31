import { useContext, useEffect } from "react";
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
        <div className="flex justify-center mx-4">
            <div className="container mx-auto my-4 rounded-2xl overflow-hidden">
                <img
                    className="w-full h-72 object-cover border-b-8 border-white"
                    src="https://i.imgur.com/ZZFAmzo.jpg"
                    alt="Capa do Perfil"
                />

                <img
                    className="rounded-full w-56 mx-auto -mt-32 border-8 border-white relative z-10"
                    src={usuario.foto}
                    alt={`Foto de perfil de ${usuario.nome}`}
                />

                <div
                    className="relative -mt-24 h-90 flex flex-col 

                    bg-sky-500 text-white text-2xl items-center justify-center"
                >
                    <p>Nome: {usuario.nome} </p>
                    <p>Email: {usuario.usuario}</p>

                    {/* Botão de editar */}
                    <Link
                        to={`/atualizarusuario`}
                        className="mt-8 w-full md:w-auto"
                    >
                        <button className="w-full md:w-auto bg-linear-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2">
                            Editar Perfil
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Perfil;
