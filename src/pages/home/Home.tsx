import ListaPostagens from "../../components/postagem/listapostagens/ListaPostagens";
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem";

function Home() {
    return (
        /* Container Princiapl */
        <>
            <div className="bg-indigo-900 flex justify-center">
                {/* Seção com 2 colunas */}
                <div className="container grid grid-cols-1 md:grid-cols-2 text-white">
                    {/* Conteúdo de texto */}
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className="text-2xl md:text-5xl font-bold">
                            Seja Bem Vinde!
                        </h2>

                        <p className="text-xl">
                            Expresse aqui seus pensamentos
                        </p>

                        <div className="flex justify-around gap-4">
                            <ModalPostagem />
                        </div>
                    </div>

                    {/* Imagem da página home */}
                    <div className="flex justify-center">
                        <img
                            src="https://i.imgur.com/fyfri1v.png"
                            alt="Imagem da página Home"
                            className="w-2/3"
                        />
                    </div>
                </div>
            </div>
            <ListaPostagens />
        </>
    );
}

export default Home;
