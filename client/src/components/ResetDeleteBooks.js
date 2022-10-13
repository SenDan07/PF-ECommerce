import React from "react";
import { useDispatch } from "react-redux";
import { resetDeleteBooks } from "../redux/actions";

export default function ResetDeleteBooks() {
    let dispatch = useDispatch()

    function handleClick(e) {
        e.preventDefault()
        //console.log("aprete el boton")
        dispatch(resetDeleteBooks())
    }
    return (
        <div>
            <button
                className="hover:cursor-pointer bg-black text-white p-2 hover:bg-white hover:text-black text-xl"
                onClick={handleClick}>
                Todos los Libros
            </button>
        </div>
    )
} 