import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AllRecordDumb from "./AllRecordDumb";
import { getAllRecordOrders } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
// import SearchOrders from "../SearchUsers";

export default function RecordOrderSmart() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRecordOrders());
  }, []);
  const allrecords = useSelector((state) => state.allRecordOrders.data);
  console.log("allrecords: ", allrecords);
  return (
    <div>
      <NavBar />
      <div className="flex justify-start">
        <Link to="/">
          <h3 className="border-1 border-rose-500 rounded px-5 py-2 bg-button text-black hover:text-white mt-5 mx-10">
            &#129044; Regresar
          </h3>
        </Link>
      </div>

      <div className="flex justify-center text-5xl mb-10">
        <h5 className="">HISTORIAL DE VENTAS</h5>
      </div>

      <div className="flex mx-32 bg-[#333] text-white mt-10">
        <div className="w-32">
          <h3 className="text-center text-2xl">N° Orden</h3>
        </div>

        <div className="w-1/5">
          <h3 className="text-center text-2xl">Nombre</h3>
        </div>

        <div className="w-1/5">
          <h3 className="text-center text-2xl">Email</h3>
        </div>

        <div className="w-1/5">
          <h3 className="text-center text-2xl">Dirección</h3>
        </div>

        <div className="w-1/5">
          <h3 className="text-center text-2xl">Fecha</h3>
        </div>

        <div className="w-1/5">
          <h3 className="text-center text-2xl">Venta Total</h3>
        </div>
      </div>
      <div className="mb-3 mx-32">
        {allrecords?.map((e) => {
          return (
            <AllRecordDumb
              key={e.order.id}
              username={e.user.name}
              userlastname={e.user.lastName}
              email={e.user.email}
              date={e.order.fecha}
              price={e.order.total}
              country={e.order.pais}
              direction={e.order.direccion}
              idorder={e.order.id}
            />
          );
        })}
      </div>
    </div>
  );
}
