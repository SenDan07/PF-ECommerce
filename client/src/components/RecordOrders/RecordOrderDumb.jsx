import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
/* import { useEffect } from "react";
import { deleteBook, getBooks } from "../redux/actions"; */

export default function RecordOrderDumb({
  idOrder,
  direction,
  date,
  price,
  country,
  numeral,
}) {
  //const dispatch = useDispatch();
  const idUser = useSelector((state) => state.user.iduser);
  return (
    <div className="flex border border-t-0 bg-[#e9e2e2] hover:bg-[#788d99] transition-colors duration-200 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
      <h5 className="border w-10 md:w-20 text-center bg-[#445b6e] text-white border-[#223648] py-1 sm:py-0">
        {numeral}
      </h5>
      <h5 className="border w-16 md:w-32 text-center py-1 sm:py-0">
        {idOrder}
      </h5>
      <Link
        className="border w-1/4 text-center"
        to={`/historyorder/${idUser}/${numeral}`}
      >
        <h5 className="hidden sm:block text-center text-blue hover:cursor-pointer hover:text-white italic underline textWrap py-1 sm:py-0">
          Ver Detalle
        </h5>
        <h5 className="sm:hidden text-center text-blue hover:cursor-pointer hover:text-white italic underline textWrap py-1 sm:py-0">
          Detalle
        </h5>
      </Link>
      <h5 className="border w-1/4 text-center textWrap py-1 sm:py-0">
        {direction} - {country}
      </h5>
      <h5 className="border w-1/4 text-center textWrap py-1 sm:py-0">
        {date?.slice(0, 10)}
      </h5>
      <h5 className="border w-1/4 text-center textWrap py-1 sm:py-0 font-bold">
        ${price?.toFixed(2)}
      </h5>
    </div>
  );
}
