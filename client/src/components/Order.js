import { useDispatch } from "react-redux";
import { orderName, orderPrice } from "../redux/actions"

export default function Order() {
    const dispatch = useDispatch()

    function onSelectChange(e) {
        if (e.target.value === "AZ" || e.target.value === "ZA") {
            dispatch(orderName(e.target.value))
        }
        if(e.target.value === "menor" || e.target.value === "mayor"){
            dispatch(orderPrice(e.target.value))
        }
    }

    return (
        <select name="orderAZ" onChange={onSelectChange}>
            <option value={false}>ORDEN</option>
            <option value="AZ">A - Z</option>
            <option value="ZA">Z - A</option>
            <option value="menor">Precio Ascendente</option>
            <option value="mayor">Precio Descendente</option>
        </select>
    )
}