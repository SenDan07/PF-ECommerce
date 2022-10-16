import React from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../redux/actions";

export default function ResetAllUsers() {
    let dispatch = useDispatch()

    function handleClick(e) {
        e.preventDefault()
        dispatch(getUsers())
    }
    return (
        <div>
            <button
                className="hover:cursor-pointer bg-black text-white p-2 hover:bg-white hover:text-black text-xl"
                onClick={handleClick}>
                Todos los Usuarios
            </button>
        </div>
    )
} 