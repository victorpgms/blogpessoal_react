import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Postagem from "../../../models/Postagem"
import { buscar, deletar } from "../../../services/Service"
import { ClipLoader } from "react-spinners"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarPostagem() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', "erro")
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarPostagem() {
        setIsLoading(true)

        try {
            await deletar(`/postagens/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta('Postagem apagada com sucesso', "sucesso")

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }else {
                ToastAlerta('Erro ao deletar a postagem.', "erro")
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/postagens")
    }
    
    return (
        <section className="page-section min-h-[70vh]">
            <div className="page-container max-w-2xl">
            <h1 className="mb-3 text-center text-3xl font-bold tracking-tight text-ink sm:text-4xl">Deletar Postagem</h1>

            <p className="mb-8 text-center font-medium text-muted">
                Você tem certeza de que deseja apagar a postagem a seguir?
            </p>

            <div className="surface-card flex flex-col overflow-hidden">
                <header 
                    className="border-b border-line bg-panel-muted px-6 py-4 text-xl font-bold text-ink">
                    Postagem
                </header>
                <div className="p-6">
                    <p className="text-xl font-semibold text-ink">{postagem.titulo}</p>
                    <p className="mt-2 leading-7 text-muted">{postagem.texto}</p>
                </div>
                <div className="flex flex-col-reverse gap-3 border-t border-line p-4 sm:flex-row">
                    <button 
                        className="button-secondary w-full"
                        onClick={retornar}>
                        Não
                    </button>
                    <button 
                        className="button-danger w-full"
                        onClick={deletarPostagem}
                        disabled={isLoading}>

                        { isLoading ? 
                            <ClipLoader 
                                color="#ffffff" 
                                size={24}
                            /> : 
                            <span>Sim</span>
                        }
                        
                    </button>
                </div>
            </div>
            </div>
        </section>
    )
}

export default DeletarPostagem
