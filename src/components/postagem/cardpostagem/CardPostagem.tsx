import {
    CalendarBlank,
    PencilSimple,
    Tag,
    Trash,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import type Postagem from "../../../models/Postagem";

interface CardPostagensProps {
    postagem: Postagem;
}

function CardPostagem({ postagem }: CardPostagensProps) {
    return (
        <article className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-panel shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div>
                <header className="flex w-full items-center gap-3 border-b border-line bg-panel-muted px-5 py-4">
                    <img
                        src={postagem.usuario?.foto}
                        className="size-11 rounded-full object-cover ring-2 ring-panel"
                        alt={postagem.usuario?.nome}
                    />
                    <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wider text-muted">
                            Publicado por
                        </p>
                        <h3 className="truncate font-semibold text-ink">
                            {postagem.usuario?.nome}
                        </h3>
                    </div>
                </header>
                <div className="p-5">
                    <h4 className="text-xl font-bold tracking-tight text-ink">
                        {postagem.titulo}
                    </h4>
                    <p className="mt-3 leading-7 text-muted">
                        {postagem.texto}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-muted">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 font-medium text-brand">
                            <Tag size={16} weight="bold" aria-hidden="true" />
                            {postagem.tema?.descricao}
                        </span>
                    </div>
                    <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-muted">
                        <CalendarBlank
                            className="mt-0.5 shrink-0"
                            size={17}
                            aria-hidden="true"
                        />
                        {new Intl.DateTimeFormat("pt-BR", {
                            dateStyle: "full",
                            timeStyle: "medium",
                        }).format(new Date(postagem.data))}
                    </p>
                </div>
            </div>
            <footer className="grid grid-cols-2 border-t border-line p-2">
                <Link
                    to={`/editarpostagem/${postagem.id}`}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl font-semibold text-brand hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                >
                    <PencilSimple size={18} weight="bold" aria-hidden="true" />
                    Editar
                </Link>
                <Link
                    to={`/deletarpostagem/${postagem.id}`}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl font-semibold text-danger hover:bg-danger/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-danger/20"
                >
                    <Trash size={18} weight="bold" aria-hidden="true" />
                    Deletar
                </Link>
            </footer>
        </article>
    );
}

export default CardPostagem;
