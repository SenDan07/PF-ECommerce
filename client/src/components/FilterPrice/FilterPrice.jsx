// import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { filterPrice } from "../../redux/actions";

export default function FilterPrice() {
  const dispatch = useDispatch();

  function onSelectChange(e) {
    // console.log("e.target.value: ", e.target.value);
    dispatch(filterPrice(e.target.value));
  }
  return (
    <select
      name="orderAZ"
      onChange={onSelectChange}
      className="rounded bg-[#222222] text-white hover:cursor-pointer outline-none p-1 hover:bg-[#112211] transition-colors duration-200 text-xs sm:text-sm md:text-lg"
    >
      <option className="p-1 pl-2" value="0">
        TODOS LOS LIBROS
      </option>
      <option className="p-1 pl-2" value="1-25">
        {" "}
        $0 - $25
      </option>
      <option className="p-1 pl-2" value="25-50">
        $25 - $50
      </option>
      <option className="p-1 pl-2" value="50-75">
        $50 - $75
      </option>
      <option className="p-1 pl-2" value="75-100">
        $75 - $100
      </option>
      <option className="p-1 pl-2" value="100">
        MAYORES A $100
      </option>
    </select>
  );
}
