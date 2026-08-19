import {
    useContext,
    useEffect,
    useState,
    type ChangeEvent,
    type SyntheticEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import type UsuarioLogin from "../../models/UsuarioLogin";
import { AuthContext } from "../../contexts/AuthContext";
import { ClipLoader } from "react-spinners";

function Login() {
    const navigate = useNavigate();

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin,
    );

    // Consumir os estados e funções da context (AuthContext)
    // usando o hook useContext (Consumer)
    const { usuario, handleLogin, isLoading } = useContext(AuthContext);
    useEffect(() => {
        if (usuario.token !== "") {
            navigate("/home");
        }
    }, [usuario]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value,
        });
    }

    function login(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        handleLogin(usuarioLogin);
    }

    console.log(JSON.stringify(usuarioLogin));
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold ">
                <form
                    className="flex justify-center items-center flex-col w-1/2 gap-4"
                    onSubmit={login}
                >
                    <h2 className="text-slate-900 text-5xl ">Entrar</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario">Usuário</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuarioLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                atualizarEstado(e)
                            }
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuarioLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                atualizarEstado(e)
                            }
                        />
                    </div>
                    {isLoading ? (
                        <ClipLoader color="#ffffff" size={24} />
                    ) : (
                        <span>Entrar</span>
                    )}
                    <button
                        type="submit"
                        className="rounded bg-indigo-400 flex justify-center
                                   hover:bg-indigo-900 text-white w-1/2 py-2"
                    >
                        <span>Entrar</span>
                    </button>

                    <hr className="border-slate-800 w-full" />

                    <p>
                        Ainda não tem uma conta?{" "}
                        <Link
                            to="/cadastro"
                            className="text-indigo-800 hover:underline"
                        >
                            Cadastre-se
                        </Link>
                    </p>
                </form>
                <div
                    className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat
                            w-full min-h-screen bg-cover bg-center"
                ></div>
            </div>
        </>
    );
}

export default Login;
