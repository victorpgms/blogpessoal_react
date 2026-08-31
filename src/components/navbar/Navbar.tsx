import { Moon, SignOut, Sun } from "@phosphor-icons/react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useTheme } from "../../hooks/useTheme";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
    const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext);
    const { theme, toggleTheme } = useTheme();
    const token = usuario.token;

    function logout() {
        handleLogout();
        ToastAlerta("Usuário desconectado com sucesso!", "sucesso");
        navigate("/");
    }

    if (token === "") return null;

    const themeLabel =
        theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro";

    return (
        <header className="sticky top-0 z-40 w-full border-b border-line bg-panel/95 shadow-sm backdrop-blur-md">
            <div className="page-container flex min-h-16 flex-wrap items-center justify-between gap-y-2 py-2">
                <Link
                    to="/"
                    className="rounded-lg text-xl font-bold tracking-tight text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                >
                    Blog <span className="text-brand">Pessoal</span>
                </Link>

                <nav
                    className="order-3 flex w-full items-center gap-1 overflow-x-auto border-t border-line pt-2 sm:order-2 sm:w-auto sm:border-0 sm:pt-0"
                    aria-label="Navegação principal"
                >
                    <Link to="/postagens" className="nav-link">
                        Postagens
                    </Link>
                    <Link to="/tema" className="nav-link">
                        Temas
                    </Link>
                    <Link to="/cadastrartema" className="nav-link">
                        Cadastrar tema
                    </Link>
                    <Link to="/perfil" className="nav-link">
                        Perfil
                    </Link>
                    <Link onClick={logout} to="" className="nav-link gap-2">
                        <SignOut size={18} aria-hidden="true" />
                        Sair
                    </Link>
                </nav>

                <button
                    type="button"
                    className="icon-button order-2 sm:order-3"
                    onClick={toggleTheme}
                    title={themeLabel}
                    aria-label={themeLabel}
                >
                    {theme === "dark" ? (
                        <Sun size={21} weight="bold" aria-hidden="true" />
                    ) : (
                        <Moon size={21} weight="bold" aria-hidden="true" />
                    )}
                </button>
            </div>
        </header>
    );
}

export default Navbar;
