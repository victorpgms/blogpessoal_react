function Navbar() {
    return (
        <>
            {/* // Container principal */}
            <div className="bg-indigo-900 w-full flex justify-center py-4 text-white">
                {/* Div do titulo */}
                <div className="container flex justify-between text-lg mx-8">
                    Blog Pessoal
                    {/* Div da NavBar mesmo */}
                    <div className="flex gap-4">
                        Postagens Temas Cadastrar tema Perfil Sair
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
