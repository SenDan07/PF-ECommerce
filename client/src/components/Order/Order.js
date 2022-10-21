import { useDispatch } from "react-redux";
import { orderName, orderPrice } from "../redux/actions";

export default function Order() {
  const dispatch = useDispatch();

  function onSelectChange(e) {
    if (e.target.value === "AZ" || e.target.value === "ZA") {
      dispatch(orderName(e.target.value));
    }
    if (e.target.value === "menor" || e.target.value === "mayor") {
      dispatch(orderPrice(e.target.value));
    }
  }

  return (
    <select
      name="orderAZ"
      onChange={onSelectChange}
      className="rounded bg-[#222222] text-white hover:cursor-pointer outline-none p-1 hover:bg-[#112211] transition-colors duration-200 text-lg"
    >
      <option className="p-1 pl-2" value={false}>
        ORDEN
      </option>
      <option className="p-1 pl-2" value="AZ">
        A - Z
      </option>
      <option className="p-1 pl-2" value="ZA">
        Z - A
      </option>
      <option className="p-1 pl-2" value="menor">
        Precio Ascendente
      </option>
      <option className="p-1 pl-2" value="mayor">
        Precio Descendente
      </option>
    </select>
  );
}
