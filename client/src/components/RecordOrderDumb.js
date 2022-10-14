import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
/* import { useEffect } from "react";
import { deleteBook, getBooks } from "../redux/actions"; */


export default function RecordOrderDumb({ idOrder, direction, date, price, country }) {
    //const dispatch = useDispatch();
    const idUser = useSelector((state) => state.user.iduser)

    return (
        <div className="hover:text-white hover:bgItems flex justify-between border text-xl">
            <Link className="border w-1/4 flex justify-center " to={`/historyorder/${idUser}/${idOrder}`}>
                <h5 className=" flex justify-center text-blue hover:cursor-pointer hover:text-hoverMenu">{idOrder}</h5>
            </Link>
            <h5 className="border w-1/4 flex justify-center">{direction} - {country}</h5>
            <h5 className="border w-1/4 flex justify-center">{date}</h5>
            <h5 className="border w-1/4 flex justify-center">{price}</h5>
        </div>
    )
}

