import { useDispatch } from "react-redux";
import { orderName } from "../redux/actions"

export default function OrderName() {
    const dispatch = useDispatch()

    function onSelectChange(e) {
        dispatch(orderName(e.target.value))
    }

    return (
        <select name="orderAZ" onChange={onSelectChange}>
            <option value={false}>LIBROS</option>
            <option value="asc">A - Z</option>
            <option value="des">Z - A</option>
        </select>
    )
}