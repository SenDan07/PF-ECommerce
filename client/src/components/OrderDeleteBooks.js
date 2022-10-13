import { useDispatch } from "react-redux";
import { OrderDeleteBook } from "../redux/actions";

export default function OrderDeleteBooks() {
  const dispatch = useDispatch();

  function onSelectChange(e) {
    dispatch(OrderDeleteBook(e.target.value));
  }

  return (
    <select name="orderABC" onChange={onSelectChange}>
      <option value={false}>LIBROS</option>
      <option value="AZ">A - Z</option>
      <option value="ZA">Z - A</option>
    </select>
  );
}