import {useSelector, useDispatch } from "react-redux"
import  CartItem  from "./CartItem"
import { Link } from "react-router-dom"

export default function Cart(){
    //Mapeo de Productos Seleccionados
    
   const cart1=useSelector((state)=>state.cart)
   let cart=JSON.parse(localStorage.getItem("bookDetail"))
   console.log("Carrito",cart)
    return <div className="flex flex-row">
         <Link to="/">
          <h3 className="border-1 border-rose-500 rounded w-max mx-auto px-3 py-2 bg-button text-white">
            &#129044; Regresar
          </h3>
        </Link>
            <div className="m-10">{
            cart?.map((c)=>{
           return <CartItem book={c} />
        })}
         </div>
         <div className="mt-20">
            Resumen de Pedido
            <h3>Total: S/120</h3>
        <Link to="/order">
        <button className="border-1 border-rose-500 rounded w-max mx-auto px-3 py-2 bg-button text-white">Procesar Compra</button>
        </Link> 
        </div>
    </div>
}