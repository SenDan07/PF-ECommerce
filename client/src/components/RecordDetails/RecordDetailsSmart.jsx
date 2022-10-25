import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import RecordDetailsDumb from "./RecordDetailsDumb";
import { getRecordOrders } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";

export default function RecordDetailsSmart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recordID = useParams().idOrder;
  const idUser = useSelector((state) => state.user.iduser);
  useEffect(() => {
    dispatch(getRecordOrders(idUser));
  }, []);
  const records = useSelector((state) => state.recordOrders);

  const products = records[recordID - 1].detalle.length;
  let suma = 0;
  for (let i = 0; i < products; i++) {
    suma = suma + records[recordID - 1].detalle[i].sutTotal;
  }

  return (
    <div>
      <NavBar />
      <div
        className="flex justify-start h-max mt-4 ml-3 text-xs font-bold md:text-lg md:font-medium hover:cursor-pointer w-max"
        onClick={() => navigate(-1)}
      >
        <h3 className="border-1 rounded px-3 py-3 md:py-2 bg-button  text-white hover:bg-[#065841] transition-colors duration-500">
          &#129044; Regresar
        </h3>
      </div>

      <div className="flex justify-center text-xl sm:text-2xl md:text-4xl xl:text-5xl my-10 text-[#14143a] font-bold md:font-medium">
        <h5 className="">DETALLE DE LA COMPRA</h5>
      </div>

      <div className="flex w-[90%] xl:w-[85%] bg-[#333] text-white mt-10 mx-auto rounded-t-sm text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl">
        <div className="w-2/5">
          <h3 className="text-center textWrap">Título</h3>
        </div>

        <div className="w-1/5">
          <h3 className="text-center textWrap">Precio Unitario</h3>
        </div>

        <div className="w-1/5">
          <h3 className="text-center textWrap">Cantidad</h3>
        </div>

        <div className="w-1/5">
          <h3 className="text-center textWrap">Subtotal</h3>
        </div>
      </div>
      <div className="mb-3 w-[90%] xl:w-[85%] mx-auto">
        {records[recordID - 1].detalle.map((e) => {
          return (
            <RecordDetailsDumb
              title={e.title}
              uprice={e.price.toFixed(2)}
              key={e.id + "aa"}
              cantidad={e.cantidad}
              subtotal={e.sutTotal.toFixed(2)}
            />
          );
        })}
        <div className="mt-32 w-full sm:w-1/2 bg-[#21214d] text-center rounded py-3 lg:py-2 sm:mx-auto text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          <h3 className="font-semibold text-[#c9bbbb]">
            Total de la Compra:{" "}
            <span className="font-bold text-white">${suma.toFixed(2)}</span>
          </h3>
        </div>
      </div>
    </div>
  );
}
