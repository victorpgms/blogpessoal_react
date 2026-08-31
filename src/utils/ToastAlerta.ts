import { toast, type ToastOptions } from "react-toastify";

export function ToastAlerta(mensagem: string, tipo: string) {
    const options: ToastOptions = {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    };

    switch (tipo) {
        case "sucesso":
            toast.success(mensagem, options);
            break;

        case "erro":
            toast.error(mensagem, options);
            break;

        case "info":
            toast.info(mensagem, options);
            break;

        default:
            toast.info(mensagem, options);
            break;
    }
}
