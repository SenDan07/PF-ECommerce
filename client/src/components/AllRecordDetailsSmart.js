/* import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import RecordDetailsDumb from "./RecordDetailsDumb"
import { getRecordOrders } from "../redux/actions"
import NavBar from "./NavBar";


export default function RecordDetailsSmart() {
    const dispatch = useDispatch();
    const recordID = useParams().idOrder
    const idUser = useSelector((state) => state.user.iduser)
    useEffect(() => { dispatch(getRecordOrders(idUser)); }, []);
    const records = useSelector((state) => state.recordOrders)

    return (
        <div>
            <NavBar />
            <div className="flex justify-start">
                <Link to={`/historyorder/${idUser}`}>
                    <h3 className="border-1 border-rose-500 rounded mx-auto px-5 py-2 bg-button text-black hover:text-white mt-5 mx-10">
                        &#129044; Regresar
                    </h3>
                </Link>
            </div>

            <div className="flex justify-center text-5xl mb-10">
                <h5 className="">DETALLES DE COMPRAS</h5>
            </div>

            <div className="flex mx-32 bg-[#333] text-white mt-10">
                <div className="w-1/4">
                    <h3 className="text-center text-2xl">Título</h3>
                </div>

                <div className="w-1/4">
                    <h3 className="text-center text-2xl">Cantidad</h3>
                </div>

                <div className="w-1/4">
                    <h3 className="text-center text-2xl">Precio Unitario</h3>
                </div>

                <div className="w-1/4">
                    <h3 className="text-center text-2xl">Subtotal</h3>
                </div>

            </div>
            <div className="mb-3 mx-32">
                {records[recordID - 1].detalle.map((e) => {
                    return (
                        <RecordDetailsDumb
                            title={e.title}
                            uprice={e.price.toFixed(2)}
                            key={e.id+"aa"}
                            cantidad={e.cantidad}
                            subtotal={e.sutTotal.toFixed(2)}
                        />
                    )
                })}
            </div>
        </div>
    )
}
 */