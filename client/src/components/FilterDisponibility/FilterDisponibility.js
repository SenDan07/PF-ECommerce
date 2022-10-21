import { useDispatch } from "react-redux";
import { filterDisponibility } from "../../redux/actions";

export default function FilterDisponibility() {
  const dispatch = useDispatch();

  function onSelectChange(e) {
    console.log("e.target.value: ", e.target.value);
    dispatch(filterDisponibility(e.target.value));
  }
  return (
    <select
      name="disponibilidad"
      onChange={onSelectChange}
      className="rounded bg-bgSearch text-white hover:cursor-pointer outline-none"
    >
      <option value="false">FILTRAR</option>
      <option value="si">Disponible</option>
      <option value="no">Eliminado</option>
    </select>
  );
}
