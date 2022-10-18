import { useDispatch } from "react-redux";
import { orderUsers } from "../redux/actions";

export default function OrderName() {
  const dispatch = useDispatch();

  function onSelectChange(e) {
    dispatch(orderUsers(e.target.value));
  }

  return (
    <select name="orderUsers" onChange={onSelectChange} className="rounded bg-bgSearch text-white hover:cursor-pointer outline-none">
      <option value={false}>Usuarios</option>
      <option value="AZNAME">Nombres A - Z</option>
      <option value="ZANAME">Nombres Z - A</option>
      <option value="AZAPE">Apellidos A - Z</option>
      <option value="ZAAPE">Apellidos Z - A</option>
    </select>
  );
}