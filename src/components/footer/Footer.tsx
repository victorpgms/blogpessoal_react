import { Briefcase, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { useContext, type ReactNode } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Footer() {
    const data = new Date().getFullYear();

    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

    let component: ReactNode;

    if (token !== "") {
        component = (
            <footer className="mt-auto border-t border-line bg-panel text-ink">
                <div className="page-container flex flex-col items-center gap-2 py-8 text-center">
                    <p className="font-semibold tracking-tight">
                        Blog Pessoal Victor Pedro | Copyright: {data}
                    </p>
                    <p className="text-sm text-muted">Conecte-se comigo!</p>
                    <div className="mt-1 flex gap-2 text-muted">
                        <a
                            href="https://www.linkedin.com/in/victor-pgms/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Acessar meu LinkedIn"
                            title="LinkedIn"
                            className="icon-button"
                        >
                            <LinkedinLogo size={26} weight="bold" />
                        </a>

                        <a
                            href="https://github.com/victorpgms"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Acessar meu GitHub"
                            title="GitHub"
                            className="icon-button"
                        >
                            <GithubLogo size={26} weight="bold" />
                        </a>

                        <a
                            href="https://victorpgms.github.io/portfolio-vpgms/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Acessar meu portfólio"
                            title="Portfólio"
                            className="icon-button"
                        >
                            <Briefcase size={26} weight="bold" />
                        </a>
                    </div>
                </div>
            </footer>
        );
    }

    return <>{component}</>;
}

export default Footer;
