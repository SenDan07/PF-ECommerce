import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { deleteBook, getBooks } from "../redux/actions";


export default function RecordOrderDumb({ idOrder = 5, direction, date, price, idBook }) {
    const dispatch = useDispatch();

    const idUser = 4
    //const idOrder = 5

    async function handleClick(e) {
        /*         await dispatch(deleteBook(idBook))
                await dispatch(getUsers()) */
    }

    return (
        <div className="hover:text-white hover:bgItems flex justify-between border text-xl">
            <Link className="border w-1/4 flex justify-center " to={`/historyorder/${idUser}/${idOrder}`}>
                <h5 className=" flex justify-center text-blue hover:cursor-pointer hover:text-hoverMenu">84271a3f</h5>
            </Link>
            <h5 className="border w-1/4 flex justify-center">La quebrada del Ají - Chile</h5>
            <h5 className="border w-1/4 flex justify-center">13-10-2022</h5>
            <h5 className="border w-1/4 flex justify-center">$25</h5>
        </div>
    )
}

