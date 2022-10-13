import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { deleteBook, getBooks } from "../redux/actions";

export default function DeleteBooksDumb({ title, activado, idBook, author }) {
    let status = activado ? "disponible" : "eliminado"
    const dispatch = useDispatch();


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
                    <h2 className="text-center">{status}</h2>
                </div>

                <div className="w-1/2 border text-center">
                    <form onSubmit={handleSubmit}>
                        <input type="submit" className="w-max hover:cursor-pointer text-center hover:bg-hoverMenu p-1 rounded bg-bgItems" />
                        {
                            status === "disponible" ?
                                (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                    </svg>
                                )
                        }

                    </form>
                </div>
            </div>
        </div>
    )
}
