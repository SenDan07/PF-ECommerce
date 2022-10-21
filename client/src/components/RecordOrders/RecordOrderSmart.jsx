import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RecordOrderDumb from "./RecordOrderDumb"
import { getRecordOrders } from "../../redux/actions"
import NavBar from "../NavBar/NavBar";


export default function RecordOrderSmart() {
    const dispatch = useDispatch();
    const idUser = useSelector((state) => state.user.iduser)
    useEffect(() => { dispatch(getRecordOrders(idUser)); }, []);
    const records = useSelector((state) => state.recordOrders)

    return (
        <div>
            <NavBar />
            <div className="flex justify-start">
                <Link to="/">
                    <h3 className="border-1 border-rose-500 rounded mx-auto px-5 py-2 bg-button text-black hover:text-white mt-5 mx-10">
                        &#129044; Regresar
                    </h3>
                </Link>
            </div>

            <div className="flex justify-center text-5xl mb-10">
                <h5 className="">HISTORIAL DE COMPRAS</h5>
            </div>

            <div className="flex mx-32 bg-[#333] text-white mt-10">
                <div className="w-20">
                    <h3 className="text-center text-2xl">#</h3>
                </div>

                <div className="w-32">
                    <h3 className="text-center text-2xl">N° Orden</h3>
                </div>

                <div className="w-1/4">
                    <h3 className="text-center text-2xl">Detalle</h3>
                </div>

                <div className="w-1/4">
                    <h3 className="text-center text-2xl">Dirección</h3>
                </div>

                <div className="w-1/4">
                    <h3 className="text-center text-2xl">Fecha</h3>
                </div>

                <div className="w-1/4">
                    <h3 className="text-center text-2xl">Precio Total</h3>
                </div>

            </div>
            <div className="mb-3 mx-32">
                {records.map((e, index) => {
                    return (
                        <RecordOrderDumb
                            direction={e.direccion}
                            country={e.pais}
                            price={e.total}
                            key={e.id}
                            numeral={index+1}
                            date={e.fecha} 
                            idOrder={e.id}
                            />
                    )
                })}
            </div>
        </div>
    )
}

