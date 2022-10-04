import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { filterPrice } from "../redux/actions";

export default function FilterPrice() {
  const dispatch = useDispatch();

  function onSelectChange(e) {
    console.log("e.target.value: ", e.target.value);
    dispatch(filterPrice(e.target.value));
  }
  return (
    <select
      name="orderAZ"
      onChange={onSelectChange}
      className="rounded bg-bgSearch text-white hover:cursor-pointer outline-none"
    >
      <option value="0">TODOS LOS LIBROS</option>
      <option value="1-25"> $1 - $25</option>
      <option value="25-50">$25 - $50</option>
      <option value="50-75">$50 - $75</option>
      <option value="75-100">$75 - $100</option>
      <option value="100">MAYORES A $100</option>
    </select>
  );
}
