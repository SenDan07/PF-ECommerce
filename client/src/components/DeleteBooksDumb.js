import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { deleteBook, getBooks } from "../redux/actions";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function DeleteBooksDumb({ title, activado, idBook, author }) {
    let status = activado ? "disponible" : "eliminado"
    const dispatch = useDispatch();
    const params=useParams()
   
    async function handleSubmit(e) {
        e.preventDefault()
        await dispatch(deleteBook(idBook))
        await dispatch(getBooks())
    }

    return (
        <div className="hover:text-white hover:bgItems flex justify-between border text-xl">
            <h2 className="border w-2/4">{title}</h2>
            <h2 className="border w-1/4">{author}</h2>
            <div className="flex w-1/4">
                <div className="w-1/2 border">
                    <Link to={`/edit/${idBook}`}>
                        <h2 className="text-center text-blue hover:cursor-pointer hover:bg-hoverMenu p-1 rounded hover:text-white">EDITAR</h2>
                    </Link>

                </div>

                <div className="w-1/2 border text-center">
                    <form onSubmit={handleSubmit}>
                        {
                            status === "disponible" ?

                                (
                                    <input type="submit" className="w-max hover:cursor-pointer text-center hover:bg-hoverMenu p-1 rounded bg-green" value={status} />
                                ) : (
                                    <input type="submit" className="w-max hover:cursor-pointer text-center hover:bg-hoverMenu p-1 rounded bg-red" value={status} />
                                )
                        }

                    </form>
                </div>
            </div>
        </div>
    )
}