import { PencilSimple, Tag, Trash } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import type Tema from "../../../models/Tema";

interface CardTemaProps {
    tema: Tema;
}

function CardTema({ tema }: CardTemaProps) {
    return (
        <article className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-panel shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <header className="flex items-center gap-2 border-b border-line bg-panel-muted px-6 py-4 text-sm font-semibold uppercase tracking-wider text-muted">
                <Tag size={18} weight="bold" aria-hidden="true" />
                Tema do blog
            </header>
            <p className="h-full p-8 text-2xl font-bold tracking-tight text-ink">
                {tema.descricao}
            </p>

            <footer className="grid grid-cols-2 border-t border-line p-2">
                <Link
                    to={`/editartema/${tema.id}`}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl font-semibold text-brand hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                >
                    <PencilSimple size={18} weight="bold" aria-hidden="true" />
                    Editar
                </Link>

                <Link
                    to={`/deletartema/${tema.id}`}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl font-semibold text-danger hover:bg-danger/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-danger/20"
                >
                    <Trash size={18} weight="bold" aria-hidden="true" />
                    Deletar
                </Link>
            </footer>
        </article>
    );
}

export default CardTema;
