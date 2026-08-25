import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import DeletarTema from "./components/tema/deletartema/DeletarTema";
import FormTema from "./components/tema/formtema/FormTema";
import ListaTemas from "./components/tema/listatema/ListaTema";
import { AuthProvider } from "./contexts/AuthContext";
import Cadastro from "./pages/cadastro/Cadastro";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ListaPostagens from "./components/postagem/listapostagens/ListaPostagens";
import FormPostagem from "./components/postagem/formpostagem/FormPostagem";
import DeletarPostagem from "./components/postagem/deletarpostagem/deletarpostem";

function App() {
    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Navbar />
                    <div className="min-h-[80vh]">
                        <Routes>
                            <Route path="/home" element={<Home />} />
                            <Route path="/cadastro" element={<Cadastro />} />
                            <Route path="/" element={<Login />} />
                            <Route path="/tema" element={<ListaTemas />} />
                            <Route
                                path="/cadastrartema"
                                element={<FormTema />}
                            />
                            <Route
                                path="/editartema/:id"
                                element={<FormTema />}
                            />
                            <Route
                                path="/deletartema/:id"
                                element={<DeletarTema />}
                            />
                            <Route
                                path="/postagens"
                                element={<ListaPostagens />}
                            />
                            <Route
                                path="/cadastrarpostagem"
                                element={<FormPostagem />}
                            />
                            <Route
                                path="/editarpostagem/:id"
                                element={<FormPostagem />}
                            />
                            <Route
                                path="/deletarpostagem/:id"
                                element={<DeletarPostagem />}
                            />
                        </Routes>
                    </div>
                    <Footer />
                </BrowserRouter>
            </AuthProvider>
        </>
    );
}

export default App;
