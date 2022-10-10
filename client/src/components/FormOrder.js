import { useState } from "react"
import { useSelector } from "react-redux"
//import CartItem from "./CartItem"
import { Link } from "react-router-dom";
import FormPayment from "./FormPayment";

export default function FormOrder() {

    const User = useSelector(state => state.user)
    let cart = JSON.parse(localStorage.getItem("bookDetail"));

    const [user, setUser] = useState({
        name: User.name,
        lastName: User.lastName,
        email: User.email,
        phone:"",
        address: "",
        country:""
    })
    function handleChange(e) {
        setUser({
            [e.name]: e.value
        })
    }

    return <div className="m-10">
        <div>
            <form className="flex flex-row justify-center justify-items-center" m-20>
                <fieldset className="bg-[#a3a3a3] text-white container mx-auto flex flex-col justify-center justify-items-center p-20">
                    <label>Nombre:</label>
                    <input type="text" className="text-[#075985]" name="name" value={user.name} onChange={handleChange} />
                    <label>Apellidos</label>
                    <input type="text" className="text-[#075985]" name="lastName" value={user.lastName} onChange={handleChange} />
                    <label>Direccion de correo:</label>
                    <input type="text" className="text-[#075985]" name="email" value={user.email} onChange={handleChange} />
                    <label>Telefono:</label>
                    <input type="text" className="text-[#075985]" name="email" value={user.phone} onChange={handleChange} />
                    <label>Direccion de Envio </label>
                    <input type="text" className="text-[#075985]" name="address" value={user.address} onChange={handleChange} />
                    <label>Pais:</label>
                    <input type="text" className="text-[#075985]" name="email" value={user.country} onChange={handleChange} />
                    <br />
                    <span>Ingrese los datos de su tarjeta</span>
                    <div><br />
                    <FormPayment />
                    </div>         
                </ fieldset >
               
                <fieldset className="bg-[#a3a3a3] text-white container mx-auto flex flex-col justify-center justify-items-center p-20">
                    Resumen de Pedido
                    <h3>Total::{cart.reduce((ac,e)=>{
                return ac+e.price*e.quantity
                 },0)}</h3>
                </fieldset>

            </form>
        </div>

        <div className="m-10">
            <span className="font-medium text-center text-[22px]">Listado de Libros a compar</span>
            {cart?.map((book) => {
                return <div className="flex flex-row m-5">
                    <div className="mb-1 relative hover:rotate-1">

                        <img
                            src={book.imageLinks}
                            alt={`img-${book.title}`}
                            className="w-96 h-80 rounded rounded-tr-xl sombra"
                        />

                    </div>
                    <div className="flex flex-col justify-center m-10">
                        <h2 className="font-medium text-center text-[22px]">
                            {book.title}
                        </h2>

                        <div>
                            <h3 className="text-center text-xl font-bold text-black">
                                <span className="font-medium text-white">Price: </span>$
                                {book.price.toFixed(2)}
                            </h3>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center m-20">
                        <span>{book.quantity}:</span>
                    </div>
                </div>
            })}
        </div>
    </div>

}