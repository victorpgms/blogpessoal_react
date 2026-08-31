import {
    FacebookLogo,
    InstagramLogo,
    LinkedinLogo,
} from "@phosphor-icons/react";
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
                        Blog Pessoal Generation | Copyright: {data}
                    </p>
                    <p className="text-sm text-muted">
                        Acesse nossas redes sociais
                    </p>
                    <div className="mt-1 flex gap-2 text-muted">
                        <LinkedinLogo size={26} weight="bold" />
                        <InstagramLogo size={26} weight="bold" />
                        <FacebookLogo size={26} weight="bold" />
                    </div>
                </div>
            </footer>
        );
    }

    return <>{component}</>;
}

export default Footer;
