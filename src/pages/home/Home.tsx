function Home() {
    return (
        <div className="bg-indigo-900 flex justify-center">
            {/* Seção com duas colunas*/}
            <div className="container grid grid-cols-1 md:grid-cols-2 text-white">
                {/* Conteúdo de texto */}
                <div className="flex flex-col gap-4 items-center justify-center py-4">
                    <h2 className="text-2xl md:text-5xl font-bold">Seja Bem Vinde!</h2>
                    <p className="text-xl">Expresse aqui seus pensamentos</p>
                    <div className="flex justify-aroud gap-4">
                        <div className="rounded-lg border-2 border-solid border-white py-2 px-4">
                            Nova Postagem
                        </div>
                    </div>
                </div>

                {/* Imagem da página home */}
                <div className="flex justify-center">
                    <img
                        className="w-2/3"
                        src="https://i.imgur.com/fyfri1v.png"
                        alt="imagem da pagina home"
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;
