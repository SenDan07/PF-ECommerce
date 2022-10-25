import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RecordOrderDumb from "./RecordOrderDumb";
import { getRecordOrders } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";

export default function RecordOrderSmart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const idUser = useSelector((state) => state.user.iduser);
  useEffect(() => {
    dispatch(getRecordOrders(idUser));
  }, []);
  const records = useSelector((state) => state.recordOrders);

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
        <h5 className="">HISTORIAL DE COMPRAS</h5>
      </div>

      <div className="flex w-[90%] xl:w-[85%] bg-[#333] text-white mt-10 mx-auto rounded-t-sm text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl">
        <div className="w-10 md:w-20">
          <h3 className="text-center textWrap">#</h3>
        </div>

        <div className="w-16 md:w-32">
          <h3 className="text-center textWrap sm:hidden">Orden</h3>
          <h3 className="text-center textWrap hidden sm:block">N° Orden</h3>
        </div>

        <div className="w-1/4">
          <h3 className="text-center textWrap">Detalle</h3>
        </div>

        <div className="w-1/4">
          <h3 className="text-center textWrap">Dirección</h3>
        </div>

        <div className="w-1/4">
          <h3 className="text-center textWrap">Fecha</h3>
        </div>

        <div className="w-1/4">
          <h3 className="text-center textWrap sm:hidden">Total</h3>
          <h3 className="text-center textWrap hidden sm:block">Precio Total</h3>
        </div>
      </div>
      <div className="mb-3 w-[90%] xl:w-[85%] mx-auto">
        {records.map((e, index) => {
          return (
            <RecordOrderDumb
              direction={e.direccion}
              country={e.pais}
              price={e.total}
              key={e.id}
              numeral={index + 1}
              date={e.fecha}
              idOrder={e.id}
            />
          );
        })}
      </div>
    </div>
  );
}
