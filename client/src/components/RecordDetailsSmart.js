import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import RecordDetailsDumb from "./RecordDetailsDumb"
import { getRecordOrders } from "../redux/actions"


export default function RecordDetailsSmart() {
    const dispatch = useDispatch();
    const recordID = useParams().idOrder
    const idUser = useSelector((state) => state.user.iduser)
    useEffect(() => { dispatch(getRecordOrders(idUser)); }, []);
    const records = useSelector((state) => state.recordOrders)

    const products = records[recordID - 1].detalle.length
    let suma = 0
    for (let i = 0; i < products; i++) {
        suma = suma + records[recordID - 1].detalle[i].sutTotal
    }

    return (
        <div>
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

            <div className="border flex mx-32 bg-black text-white mt-10">
                <div className="border w-1/4">
                    <h3 className="text-center text-2xl">LIBROS</h3>
                </div>

                <div className="border w-1/4">
                    <h3 className="text-center text-2xl">CANTIDAD</h3>
                </div>

                <div className="border w-1/4">
                    <h3 className="text-center text-2xl">PRECIO UNITARIO</h3>
                </div>

                <div className="border w-1/4">
                    <h3 className="text-center text-2xl">SUBTOTAL</h3>
                </div>

            </div>
            <div className="mb-3 mx-32">
                {records[recordID - 1].detalle.map((e) => {
                    return (
                        <RecordDetailsDumb
                            title={e.title}
                            uprice={e.price}
                            key={e.id}
                            cantidad={e.cantidad}
                            subtotal={e.sutTotal}
                        />
                    )
                })}
                <div className="flex justify-end text-xl ">
                    <h3 className="">TOTAL COMPRA: {suma}</h3>
                </div>

            </div>
        </div>
    )
}

