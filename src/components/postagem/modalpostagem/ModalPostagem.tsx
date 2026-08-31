import { Plus } from "@phosphor-icons/react";
import Popup from "reactjs-popup";
import FormPostagem from "../formpostagem/FormPostagem";

function ModalPostagem() {
    return (
        <>
            <Popup
                trigger={
                    <button className="button-primary px-6">
                        <Plus size={19} weight="bold" aria-hidden="true" />
                        Nova Postagem
                    </button>
                }
                modal
            >
                <FormPostagem />
            </Popup>
        </>
    );
}

export default ModalPostagem;
