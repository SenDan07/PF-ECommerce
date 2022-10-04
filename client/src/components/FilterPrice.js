import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { filterPrice } from "../redux/actions";


export default function FilterPrice(){
    const dispatch = useDispatch()

    function onSelectChange(e) {
        console.log("e.target.value: ", e.target.value)
        dispatch(filterPrice(e.target.value))
    }
    return (
        <select name="orderAZ" onChange={onSelectChange}>
            <option value={false}>TODOS LOS LIBROS</option>
            <option value="tier1">MENORES A $25</option>
            <option value="tier2">$25 ~ $50</option>
            <option value="tier3">$50 ~ $75</option>
            <option value="tier4">$75 ~ $100</option>
            <option value="tier5">MAYORES A $100</option>
        </select>
    )
}
