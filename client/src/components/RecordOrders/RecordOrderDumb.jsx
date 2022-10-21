import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
/* import { useEffect } from "react";
import { deleteBook, getBooks } from "../redux/actions"; */


export default function RecordOrderDumb({ idOrder, direction, date, price, country, numeral}) {
    //const dispatch = useDispatch();
    const idUser = useSelector((state) => state.user.iduser)
    return (
        <div className="hover:text-white hover:bgItems flex justify-between border text-xl bg-contTable">
            <h5 className="border w-20 flex justify-center">{numeral}</h5>
            <h5 className="border w-32 flex justify-center">{idOrder}</h5>
            <Link className="border w-1/4 flex justify-center " to={`/historyorder/${idUser}/${numeral}`}>
                <h5 className=" flex justify-center text-blue hover:cursor-pointer hover:text-hoverMenu">Ir a detalle de Boleta</h5>
            </Link>
            <h5 className="border w-1/4 flex justify-center">{direction} - {country}</h5>
            <h5 className="border w-1/4 flex justify-center">{date}</h5>
            <h5 className="border w-1/4 flex justify-center">{price}</h5>
        </div>
    )
}

