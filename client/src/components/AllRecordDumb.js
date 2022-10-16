/* import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RecordOrderDumb({ idOrder, direction, date, price, country, name, email }) {
    const idUser = useSelector((state) => state.user.iduser)
    return (
        <div className="hover:text-white hover:bgItems flex justify-between border text-xl bg-contTable">
            <Link className="border w-32 flex justify-center" to={`/allorders/${idUser}`}>
                <h5 className="border  flex justify-center text-blue hover:cursor-pointer hover:text-hoverMenu">{idOrder}</h5>
            </Link>
            <h5 className="border w-1/5 flex justify-center">{name}</h5>
            <h5 className="border w-1/5 flex justify-center">{email}</h5>
            <h5 className="border w-1/5 flex justify-center">{direction} - {country}</h5>
            <h5 className="border w-1/5 flex justify-center">{date}</h5>
            <h5 className="border w-1/5 flex justify-center">{price}</h5>
        </div>
    )
} */
