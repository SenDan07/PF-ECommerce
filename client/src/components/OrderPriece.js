import { useDispatch } from "react-redux";
import { orderPriece } from "../redux/actions"

export default function OrderName() {
    const dispatch = useDispatch()

    function onSelectChange(e) {
        dispatch(orderPriece(e.target.value))
    }

    return (
        <select name="orderPriece" onChange={onSelectChange}>
            <option value={false}>PRECIO</option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
        </select>
    )
}