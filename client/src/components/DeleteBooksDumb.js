import React from "react";
import { useDispatch } from "react-redux";
import { deleteBook, getBooks } from "../redux/actions";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function DeleteBooksDumb({ title, activado, idBook, author }) {
    let status = activado ? "disponible" : "eliminado"
    const dispatch = useDispatch();
    const params = useParams()

    async function handleSubmit() {
        await dispatch(deleteBook(idBook))
        await dispatch(getBooks())
    }

    return (
        <div className="hover:text-white hover:bgItems flex justify-between border text-xl bg-contTable">
            <h2 className="border w-2/4">{title}</h2>
            <h2 className="border w-1/4">{author}</h2>
            <div className="flex w-1/4">
                {
                    status === "disponible" ?
                        (
                            <div className="w-1/2 flex border justify-center bg-green">
                                <div className="w-1/2">
                                    <h4 className="w-max rounded">{status}</h4>
                                </div>
                            </div>

                        ) : (
                            <div className="w-1/2 flex justify-center border bg-red">
                                <div className="w-1/2">
                                    <h4 className="w-max rounded">{status}</h4>
                                </div>
                            </div>
                        )
                }

                <div className="w-1/2 border flex justify-evenly">
                    <div className="">
                        {
                            status === "disponible" ?
                                (
                                    <div onClick={() => handleSubmit()}
                                        className="text-center text-black hover:cursor-pointer hover:bg-black rounded hover:text-white">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </div>
                                ) : (
                                    <div onClick={() => handleSubmit()}
                                        className="text-center text-xl font-medium hover:cursor-pointer hover:bg-black hover:font-normal">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                                        </svg>
                                    </div>
                                )
                        }
                    </div>

                    <Link to={`/edit/${idBook}`}>
                        <div
                            className="text-center text-xl font-medium hover:cursor-pointer hover:bg-black hover:font-normal">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </div>
                    </Link>
                </div>
            </div>
        </div >
    )
}
