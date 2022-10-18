import React from "react";


export default function RecordOrderDumb({ title, cantidad, subtotal, uprice }) {
    return (
        <div>
            <div className="hover:text-white hover:bgItems flex justify-between border text-xl bg-contTable">
                <h5 className="border w-1/4 flex justify-start">{title}</h5>
                <h5 className="border w-1/4 flex justify-center">{cantidad}</h5>
                <h5 className="border w-1/4 flex justify-center">${uprice}</h5>
                <h5 className="border w-1/4 flex justify-center">${subtotal}</h5>
            </div>
        </div>
    )
}