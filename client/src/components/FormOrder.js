import { useState } from "react";
import { useDispatch ,useSelector } from "react-redux";
//import CartItem from "./CartItem"
import { Link } from "react-router-dom";
//import FormPayment from "./FormPayment";
import { loadStripe } from "@stripe/stripe-js";
import { addCart, deleteCart } from "../redux/actions";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.REACT_APP_CLAVE_PUBLICA_STRIPE)
/* const stripePromise = loadStripe(
  "pk_test_51LsWoOFrokjF5UMqf7U8cohybCbbQWRPY1EZPntmfC8r0O5prM1K2QCHxL6Ws0Gfon8eAf1uAyQcO97LhPDK6HgY00ACNEMSaz"
); */

function CheckoutForm() {

  const stripe = useStripe();
  const elements = useElements();

  const dispatch=useDispatch()
  const User = useSelector((state) => state.user);
  let cart = JSON.parse(localStorage.getItem("bookDetail"));

  const [user, setUser] = useState({
    name: User.name,
    lastName: User.lastName,
    email: User.email,
    phone: "",
    address: "",
    country: "",
  });
  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function hanledSubmit(e) {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log(paymentMethod);

      const { id } = paymentMethod;
      console.log("user despues de stripe",user);
      try {
        let cart = JSON.parse(localStorage.getItem("bookDetail"));
        let cartNuevo = cart.map((el) => {
          return {
            title: el.title,
            cantidad: parseInt(el.quantity),
          };
        });

        const total = cart
          .reduce((ac, e) => {
            return ac + e.price * Number(e.quantity);
          }, 0)
          .toFixed(2);
        //El monto se multiplica por 100
        
        const { data } = await axios.post(
          "http://localhost:3001/checkout/create",
          {
            id,
            UserId: User.iduser,
            total: total,
            nombreCompleto: user.name + " " + user.lastName,
            email: user.email,
            direccion: user.address,
            telefono: user.phone,
            pais: user.country,
            carrito: cartNuevo,
          }
        );
       
        elements.getElement(CardElement).clear();
        //console.log(data)
        if (data.error) {
          alert("La Operación fallo!!");
        } else {
          //Si se realizo la compra, borra el contenido de LocalStore
          alert("Se realizo la compra Correctamente!!");
          localStorage.clear()
          await dispatch(addCart([]));
          await dispatch(deleteCart(User.email))
        }
      } catch (error) {
        alert("No Se pudo realizar el pago Correctamente!!");
      }
    }
  }

  return (
    <div className="">
      <div className="w-max">
        <Link to="/car">
          <h3 className="border-1 border-rose-500 rounded ml-10 mt-5 px-3 py-2 w-max bg-button text-white">
            &#129044; Regresar
          </h3>
        </Link>
      </div>
      <div className="m-5 rounded">
        <form className="flex flex-row justify-center justify-items-center rounded">
          <fieldset className="bg-[#a3a3a3] text-white container mx-auto flex flex-col justify-center justify-items-center p-20">
            <label>Nombre:</label>
            <input
              type="text"
              className="text-[#075985]"
              name="name"
              value={user.name}
              onChange={(e) => handleChange(e)}
            />
            <label>Apellidos</label>
            <input
              type="text"
              className="text-[#075985]"
              name="lastName"
              value={user.lastName}
              onChange={(e) => handleChange(e)}
            />
            <label>Direccion de correo:</label>
            <input
              type="text"
              className="text-[#075985]"
              name="email"
              value={user.email}
              onChange={(e) => handleChange(e)}
            />
            <label>Telefono:</label>
            <input
              type="text"
              className="text-[#075985]"
              name="phone"
              value={user.phone}
              onChange={(e) => handleChange(e)}
            />
            <label>Direccion de Envio </label>
            <input
              type="text"
              className="text-[#075985]"
              name="address"
              value={user.address}
              onChange={(e) => handleChange(e)}
            />
            <label>Pais:</label>
            <input
              type="text"
              className="text-[#075985]"
              name="country"
              value={user.country}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <span>Ingrese los datos de su tarjeta</span>
            <div>
              <br />

              <div className="bg-[#a3a3a3] flex flex-col justify-left">
                <CardElement />
                <br />
                <button
                  onClick={hanledSubmit}
                  className="border-1 border-rose-500 rounded w-max mx-auto px-3 py-2 bg-button text-white"
                  disabled={!stripe}
                >
                  Procesar compra
                </button>
              </div>
            </div>
          </fieldset>

          <fieldset className="bg-[#a3a3a3] text-white container mx-auto flex flex-col justify-center justify-items-center p-20">
            Resumen de Pedido
            <h3>
              Total::
              {cart
                .reduce((ac, e) => {
                  return ac + e.price * e.quantity;
                }, 0)
                .toFixed(2)}
            </h3>
          </fieldset>
        </form>
      </div>

      <div className="m-10">
        <span className="font-medium text-center text-[22px]">
          Listado de Libros a compar
        </span>
        {cart?.map((book) => {
          return (
            <div key={book.id} className="flex flex-row m-5">
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
                    {book.price}
                  </h3>
                </div>
              </div>
              <div className="flex flex-col justify-center m-20">
                <span>{book.quantity}:</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function FormOrder() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
