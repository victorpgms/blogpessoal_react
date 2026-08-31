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
        <div className="grid min-h-screen grid-cols-1 bg-app lg:grid-cols-2">
            <div className="flex items-center justify-center px-4 py-10 sm:px-8">
                <form
                    className="form-card flex max-w-md flex-col gap-5"
                    onSubmit={login}
                >
                    <div className="mb-1 text-center">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                            Blog Pessoal
                        </p>
                        <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                            Entrar
                        </h1>
                        <p className="mt-3 font-normal text-muted">
                            Boas-vindas de volta. Acesse sua conta para
                            continuar.
                        </p>
                    </div>
                    <div>
                        <label className="field-label" htmlFor="usuario">
                            Usuário
                        </label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className="form-field"
                            value={usuarioLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                atualizarEstado(e)
                            }
                            autoComplete="username"
                            required
                        />
                    </div>
                    <div>
                        <label className="field-label" htmlFor="senha">
                            Senha
                        </label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="form-field"
                            value={usuarioLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                atualizarEstado(e)
                            }
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="button-primary w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ClipLoader color="#ffffff" size={22} />
                        ) : (
                            <span>Entrar</span>
                        )}
                    </button>

                    <hr className="w-full border-line" />

                    <p className="text-center font-normal text-muted">
                        Ainda não tem uma conta?{" "}
                        <Link
                            to="/cadastro"
                            className="font-semibold text-brand hover:text-brand-hover hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                        >
                            Cadastre-se
                        </Link>
                    </p>
                </form>
            </div>
            <div
                className="relative hidden min-h-screen w-full bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] bg-cover bg-center before:absolute before:inset-0 before:bg-slate-950/20 lg:block dark:before:bg-slate-950/40"
                role="img"
                aria-label="Paisagem decorativa"
            />
        </div>
    );
}

export default Login;
