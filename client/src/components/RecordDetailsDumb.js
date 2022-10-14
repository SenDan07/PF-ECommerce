import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
/* import { useEffect } from "react";
import { deleteBook, getBooks } from "../redux/actions"; */

export default function RecordOrderDumb({ title, cantidad, subtotal, uprice, suma }) {
    /*     const dispatch = useDispatch();
        const idUser = useSelector((state) => state.user.iduser) */

    return (
        <div>
            <div className="hover:text-white hover:bgItems flex justify-between border text-xl">
                <h5 className="border w-1/4 flex justify-start">{title}</h5>
                <h5 className="border w-1/4 flex justify-center">{cantidad}</h5>
                <h5 className="border w-1/4 flex justify-center">${uprice}</h5>
                <h5 className="border w-1/4 flex justify-center">${subtotal}</h5>
            </div>
        </div>
    )
}