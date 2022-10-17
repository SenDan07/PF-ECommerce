import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RecordOrderDumb({ idorder, direction, date, price, country, username, email, userlastname }) {
    //const idUser = useSelector((state) => state.user.iduser)
    return (
        <div className="hover:text-white hover:bgItems flex justify-between border text-xl bg-contTable">
            <Link className="border w-32 flex justify-center" to={`/allorders/${idorder}`}>
                <h5 className="flex justify-center text-blue hover:cursor-pointer hover:text-hoverMenu">{idorder}</h5>
            </Link>
            <h5 className="border w-1/5 flex justify-center">{username} {userlastname}</h5>
            <h5 className="border w-1/5 flex justify-center">{email}</h5>
            <h5 className="border w-1/5 flex justify-center">{direction} - {country}</h5>
            <h5 className="border w-1/5 flex justify-center">{date}</h5>
            <h5 className="border w-1/5 flex justify-center">{price.toFixed(2)}</h5>
        </div>
    )
}
