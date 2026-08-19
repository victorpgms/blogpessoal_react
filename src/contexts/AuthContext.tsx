import axios from "axios";
import { createContext, useState, type ReactNode } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";

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

// Criar o contexto usando a tipagem AuthContextProps
// O contexto irá disponibilizar os estados e as funções globalmente
export const AuthContext = createContext({} as AuthContextProps);

// INicializar o provedor AuthProvider
// O provedor irá implementar as funções e inicializar os estados

export function AuthProvider({ children }: AuthProviderProps) {
    // inicializar o estado usuario, que é do tipo UsuarioLogin
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: "",
    });
    // Inicializar o estado isLoading
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Implementar a função handleLogin
    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true);

        try {
            await login(`/usuarios/logar`, usuarioLogin, setUsuario);
            alert("Usuário Autenticado com sucesso!");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                alert(`Erro ao autenticar o usuário: ${error.response.status}`);
                console.log("Resposta da API: ", error.message);
            } else {
                alert(
                    "Erro ao autenticar o usuário! Verifique a conexão com a API!",
                );
            }
        } finally {
            setIsLoading(false);
        }
    }
    // Implementar a função handleLogout (desconectar o Usuario)
    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: "",
        });
    }
    return (
        <AuthContext.Provider
            value={{ usuario, handleLogin, handleLogout, isLoading }}
        >
            {children}
        </AuthContext.Provider>
    );
}
