import ListaPostagens from "../../components/postagem/listapostagens/ListaPostagens";
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem";

function Home() {
    return (
        <>
            <section className="hero-surface border-b border-line">
                <div className="page-container grid min-h-[28rem] grid-cols-1 items-center gap-8 py-12 md:grid-cols-2 md:py-16 lg:min-h-[34rem]">
                    <div className="flex flex-col items-center gap-5 text-center md:items-start md:text-left">
                        <span className="rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-sm font-semibold text-brand">
                            Seu espaço, suas ideias
                        </span>
                        <h1 className="max-w-xl text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
                            Seja Bem Vinde!
                        </h1>

                        <p className="max-w-lg text-lg leading-8 text-muted sm:text-xl">
                            Expresse aqui seus pensamentos
                        </p>

                        <div className="mt-1 flex gap-4">
                            <ModalPostagem />
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-end">
                        <img
                            src="https://i.imgur.com/fyfri1v.png"
                            alt="Imagem da página Home"
                            className="w-full max-w-md rounded-2xl object-contain drop-shadow-2xl lg:max-w-lg"
                        />
                    </div>
                </div>
            </section>
            <ListaPostagens />
        </>
    );
}

export default Home;
