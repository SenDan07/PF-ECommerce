/* import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { deleteBook, getBooks } from "../redux/actions";


export default function DeleteBooksDumb({ idOrder, direction, date, price, idBook }) {
    //let status = activado ? "disponible" : "eliminado"
    const dispatch = useDispatch();

    async function handleClick(e) {
        await dispatch(deleteBook(idBook))
        await dispatch(getBooks())
    }

    return (
        <div className="hover:text-white hover:bgItems flex justify-between border text-xl">
            <h5 className="border w-1/4">{idOrder}</h5>
            <h5 className="border w-1/4">{direction}</h5>
            <h5 className="border w-1/4">{date}</h5>
            <h5 className="border w-1/4">{price}</h5>
        </div>
    )
}
 */