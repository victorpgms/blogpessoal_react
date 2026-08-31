import axios from "axios";
import { createContext, useState, type ReactNode } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";

//  Definir os Estados e Funções disponibilizadas pela Context
interface AuthContextProps {
    usuario: UsuarioLogin;
    handleLogin(usuario: UsuarioLogin): void;
    handleLogout(): void;
    isLoading: boolean;
}

// Quem irá consumir a context
interface AuthProviderProps {
    children: ReactNode;
}

const USUARIO_STORAGE_KEY = "blogpessoal:usuario";

const USUARIO_INICIAL: UsuarioLogin = {
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: "",
};

function carregarUsuarioArmazenado(): UsuarioLogin {
    try {
        const usuarioArmazenado = localStorage.getItem(USUARIO_STORAGE_KEY);

        if (!usuarioArmazenado) return { ...USUARIO_INICIAL };

        const usuarioSalvo = JSON.parse(
            usuarioArmazenado,
        ) as Partial<UsuarioLogin>;

        if (typeof usuarioSalvo.token !== "string" || !usuarioSalvo.token) {
            localStorage.removeItem(USUARIO_STORAGE_KEY);
            return { ...USUARIO_INICIAL };
        }

        return {
            ...USUARIO_INICIAL,
            ...usuarioSalvo,
            senha: "",
        };
    } catch {
        return { ...USUARIO_INICIAL };
    }
}

function armazenarUsuario(usuario: UsuarioLogin) {
    try {
        localStorage.setItem(USUARIO_STORAGE_KEY, JSON.stringify(usuario));
    } catch {
        // A autenticação continua funcionando se o armazenamento estiver indisponível.
    }
}

function removerUsuarioArmazenado() {
    try {
        localStorage.removeItem(USUARIO_STORAGE_KEY);
    } catch {
        // O estado em memória ainda é limpo normalmente.
    }
}

// Criar o contexto usando a tipagem AuthContextProps
// O contexto irá disponibilizar os estados e as funções globalmente
export const AuthContext = createContext({} as AuthContextProps);

// INicializar o provedor AuthProvider
// O provedor irá implementar as funções e inicializar os estados

export function AuthProvider({ children }: AuthProviderProps) {
    // inicializar o estado usuario, que é do tipo UsuarioLogin
    const [usuario, setUsuario] = useState<UsuarioLogin>(
        carregarUsuarioArmazenado,
    );
    // Inicializar o estado isLoading
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Implementar a função handleLogin
    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true);

        try {
            await login(
                `/usuarios/logar`,
                usuarioLogin,
                (usuarioAutenticado: UsuarioLogin) => {
                    const usuarioPersistido = {
                        ...USUARIO_INICIAL,
                        ...usuarioAutenticado,
                        senha: "",
                    };

                    setUsuario(usuarioPersistido);
                    armazenarUsuario(usuarioPersistido);
                },
            );
            ToastAlerta("Usuário Autenticado com sucesso!", "sucesso");

        } catch (error) {
            if (axios.isAxiosError(error)) {
                ToastAlerta(
                    `Erro ao autenticar o usuário (${error.response?.status})`,
                    "erro",
                );
                return;
            }
        } finally {
            setIsLoading(false);
        }
    }
    // Implementar a função handleLogout (desconectar o Usuario)
    function handleLogout() {
        setUsuario({ ...USUARIO_INICIAL });
        removerUsuarioArmazenado();

        ToastAlerta("Usuario desconectado com sucesso!", "sucesso");
    }
    return (
        <AuthContext.Provider
            value={{
                usuario,
                handleLogin,
                handleLogout,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
