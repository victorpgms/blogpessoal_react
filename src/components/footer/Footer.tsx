import {
    FacebookLogoIcon,
    InstagramLogoIcon,
    LinkedinLogoIcon,
} from "@phosphor-icons/react";

function Footer() {
    return (
        <footer className="bg-indigo-900 flex justify-center text-white">
            <div className="bg-indigo-900 container flex flex-col items-center py-4">
                <p className="text-xl font-bold">
                    Blog Pessoal | Copyright: 2026
                </p>

                <p className="text-lg">Acesse nossas redes sociais</p>

                {/* Redes sociais */}
                <div className="flex gap-2">
                    <LinkedinLogoIcon size={48} weight="bold" />
                    <InstagramLogoIcon size={48} weight="bold" />
                    <FacebookLogoIcon size={48} weight="bold" />
                </div>
            </div>
        </footer>
    );
}

export default Footer;
