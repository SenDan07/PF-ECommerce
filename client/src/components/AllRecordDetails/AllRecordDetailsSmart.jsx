import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import RecordDetailsDumb from "./AllRecordDetailsDumb";
import { getOrderDetails } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";

export default function RecordDetailsSmart() {
  const dispatch = useDispatch();
  const idorder = useParams().idorder;
  useEffect(() => {
    dispatch(getOrderDetails(idorder));
  }, []);
  let details = useSelector((state) => state.recordDetails);

  let suma = 0;
  for (let i = 0; i < details.length; i++) {
    suma = suma + details[i].sutTotal;
  }

  return (
    <div>
      <NavBar />
      <div className="flex justify-start">
        <Link to={`/allorders`}>
          <h3 className="border-1 border-rose-500 rounded mx-auto px-5 py-2 bg-button text-black hover:text-white mt-5 mx-10">
            &#129044; Regresar
          </h3>
        </Link>
      </div>

      <div className="flex justify-center text-5xl mb-10">
        <h5 className="">DETALLES DE VENTA</h5>
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
        {details.map((e, index) => {
          return (
            <RecordDetailsDumb
              title={e.title}
              uprice={e.price.toFixed(2)}
              key={index}
              cantidad={e.cantidad}
              subtotal={e.sutTotal.toFixed(2)}
            />
          );
        })}

        <div className="w-128 border-4  flex justify-center text-3xl bg-contTable mt-32">
          <h3 className="">Total de la Venta: ${suma.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
}
