import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { addCart, deleteCart } from "../../../redux/actions";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import Swal from "sweetalert2";
import Footer from "../../Footer/Footer";

const stripePromise = loadStripe(process.env.REACT_APP_CLAVE_PUBLICA_STRIPE);

export function validate(input) {
  let errors = {};
  let expLetras = /^[A-Za-z]+[A-Za-z\s]*[A-Za-z]$/;
  let email =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  if (!input.name) {
    errors.name = "Nombre es requerido";
  } else if (!expLetras.test(input.name)) {
    errors.name = "Nombre es inválido";
  }
  if (!input.lastName) {
    errors.lastName = "Apellido es requerido";
  } else if (!expLetras.test(input.lastName)) {
    errors.lastName = "Apellido es inválido";
  }
  if (!input.email) {
    errors.email = "Email es requerido";
  } else if (!email.test(input.email)) {
    errors.email = "Email es inválido";
  }
  if (!input.phone) {
    errors.phone = "Telefono es requerido";
  }
  if (!input.address) {
    errors.address = "Direccion es requerida";
  }
  if (!input.country) {
    errors.country = "Pais es requerido";
  }
  return errors;
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...user,
        [e.target.name]: e.target.value,
      })
    );
  }

  const showAlertError = async () => {
    await Swal.fire({
      icon: "error",
      title: "Oops, Hubo un Error en el Pago!!",
      footer: "Intenta nuevamente, verifica los números de la tarjeta",
      color: "#fff",
      background: "#333",
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
  };

  const showLoadingPayment = async () => {
    Swal.fire({
      title: "Procesando Su Pago",
      text: "Espere unos segundos",
      footer: "No cierre ni recarge la página",
      timer: 120000,
      background: "#333",
      color: "#fff",
      imageUrl:
        "https://res.cloudinary.com/dzcpdipdg/image/upload/v1665789748/samples/loaders/loader-spynner-2-1--unscreen_jrttzf.gif",
      imageWidth: 90,
      imageHeight: 85,
      showCancelButton: false,
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
    }).then(
      function () {},
      // handling the promise rejection
      function (dismiss) {
        if (dismiss === "timer") {
          //console.log('I was closed by the timer')
        }
      }
    );
  };

  const showAlertSuccess = async () => {
    await Swal.fire({
      position: "center",
      icon: "success",
      title: "Gracias Por Tu Compra!!😊",
      text: "El Pago se realizó Exitosamente!!",
      footer: "Te hemos enviado una notificación a tu correo.",
      background: "#333",
      color: "#fff",
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 2500,
    });

    navigate("/");
  };

  async function hanledSubmit(e) {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      showLoadingPayment();

      const { id } = paymentMethod;
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
        if (data.error) {
          // alert("La Operación fallo!!");
          showAlertError();
        } else {
          //Si se realizo la compra, borra el contenido de LocalStore
          // alert("Se realizo la compra Correctamente!!");
          await showAlertSuccess();
          localStorage.clear(); //Limpia LocalStorage
          await dispatch(addCart([])); //Resetea el Reducer
          await dispatch(deleteCart(User.email)); //Elimina carrito
          navigate("/");
        }
      } catch (error) {
        // alert("No Se pudo realizar el pago Correctamente!!");
        showAlertError();
      }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cardNumberElementOptions = {
    style: {
      base: {
        // fontSize: "19px",
        color: "#000",
        backgroundColor: "#fff",
        padding: "5px",
      },
    },
  };

  return (
    <div className="">
      <div className="flex justify-start h-max mt-4 ml-3 text-xs font-bold md:text-lg md:font-medium hover:cursor-pointer w-max">
        <Link to="/car">
          <h3 className="border-1 rounded px-3 py-3 md:py-2 bg-button text-white hover:bg-[#065841] transition-colors duration-500">
            &#129044; Regresar
          </h3>
        </Link>
      </div>
      <div className="mt-5 mx-1 sm:m-5 rounded">
        <form className="flex flex-col-reverse xl:flex-row justify-center justify-items-center p-0 sm:p-1 md:p-5 mx-auto md:mx-10 2xl:w-[75%] 2xl:mx-auto">
          <div className="w-full md:w-[80%] mx-auto mt-5 xl:w-1/2 2xl:w-[650px] xl:mx-0">
            <span className="font-bold text-center text-xl md:text-2xl w-full mx-auto flex justify-center items-center gap-5 mt-10 xl:mt-0">
              Listado de tu compra
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffff00"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 sm:w-8 sm:h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </span>

            <div className="flex flex-col xl:h-[600px]">
              <div className="flex flex-col gap-2 overflow-y-auto scrollCustomStyle border-4 border-[#444] m-1 bg-black p-1 sm:m-3 sm:p-3 rounded h-4/5">
                {cart?.map((book) => {
                  return (
                    <div
                      key={book.id}
                      className="flex justify-between h-[max-content] w-full p-1 bg-NavBar rounded pr-5 items-center"
                    >
                      <div className="">
                        <img
                          src={book.imageLinks}
                          alt={`img-${book.title}`}
                          className="w-[60px] h-[70px] sm:w-[70px] sm:h-[100px] rounded"
                        />
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <h2 className="font-semibold text-center text-xs sm:text-base italic text-[#b36ea7]">
                          {book.title.length > 27
                            ? `${book.title.toUpperCase().slice(0, 26)}...`
                            : `${book.title.toUpperCase()}`}
                        </h2>

                        <div className="">
                          <h3 className="text-center text-base sm:text-lg font-bold text-white">
                            <span className="font-medium text-[#ccc] text-sm sm:text-lg">
                              Precio unitario:{" "}
                            </span>
                            ${Number.parseFloat(book.price).toFixed(2)}
                          </h3>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <h3 className="font-medium text-[#ccc] text-sm sm:text-lg mb-1">
                          Cantidad:{" "}
                          <span className="text-white">{book.quantity}</span>
                        </h3>
                        <h3 className="p-1 px-3 rounded bg-black text-white font-bold text-base sm:text-lg">
                          ${(book.price * book.quantity).toFixed(2)}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="h-1/5 bg-[#000000] w-4/5 mx-auto flex items-center rounded">
                <fieldset className="container mx-auto flex flex-col justify-center items-center py-3">
                  <h2 className="font-bold text-xl md:text-3xl text-white font-mono text-center ">
                    VALOR TOTAL DE TU COMPRA
                  </h2>
                  <h3 className="font-bold text-3xl md:text-4xl text-[#ff0] font-mono">
                    $
                    {cart
                      .reduce((ac, e) => {
                        return ac + e.price * e.quantity;
                      }, 0)
                      .toFixed(2)}
                  </h3>
                </fieldset>
              </div>
            </div>
          </div>
          <fieldset className="rounded bg-[#171e3b] text-white container mx-auto flex flex-col justify-center items-center px-4 py-8 sm:px-3 sm:py-5 w-[97%] sm:w-[75%] md:w-[65%] lg:w-[55%] xl:w-1/2 2xl:w-[650px] payForm md:pt-10">
            <label className="w-full sm:w-4/5 md:w-3/4 text-[#bbb] mt-2">
              Nombre:
            </label>
            <input
              type="text"
              className={
                errors.name
                  ? "text-[#dc2626] rounded-sm h-[30px] sm:h-[35px] w-full sm:w-4/5 md:w-3/4 pl-1 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40 italic"
                  : "text-[#075985] rounded-sm h-[30px] sm:h-[35px] w-full sm:w-4/5 md:w-3/4 pl-1 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40 italic"
              }
              name="name"
              value={user.name}
              onChange={(e) => handleChange(e)}
            />
            {errors.name ? (
              <p className="text-[#dc2626] w-3/4">{errors.name}</p>
            ) : null}
            <label className="w-full sm:w-4/5 md:w-3/4 text-[#bbb] mt-2">
              Apellidos:
            </label>
            <input
              type="text"
              className={
                errors.name
                  ? "text-[#dc2626] rounded-sm h-[30px] sm:h-[35px] w-full sm:w-4/5 md:w-3/4 pl-1 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40 italic"
                  : "text-[#075985] rounded-sm h-[30px] sm:h-[35px] w-full sm:w-4/5 md:w-3/4 pl-1 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40 italic"
              }
              name="lastName"
              value={user.lastName}
              onChange={(e) => handleChange(e)}
            />
            {errors.lastName ? (
              <p className="text-[#dc2626] w-3/4">{errors.lastName}</p>
            ) : null}
            <label className="w-full sm:w-4/5 md:w-3/4 text-[#bbb] mt-2">
              Correo Electrónico:
            </label>
            <input
              type="text"
              className={
                errors.name
                  ? "text-[#dc2626] rounded-sm h-[30px] sm:h-[35px] w-full sm:w-4/5 md:w-3/4 pl-1 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40 italic"
                  : "text-[#075985] rounded-sm h-[30px] sm:h-[35px] w-full sm:w-4/5 md:w-3/4 pl-1 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40 italic"
              }
              name="email"
              value={user.email}
              onChange={(e) => handleChange(e)}
            />
            {errors.email ? (
              <p className="text-[#dc2626] w-3/4">{errors.email}</p>
            ) : null}
            <label className="w-full sm:w-4/5 md:w-3/4 text-[#bbb] mt-2">
              Teléfono:
            </label>
            <input
              type="text"
              className={
                errors.name
                  ? "text-[#dc2626] rounded-sm h-[30px] sm:h-[35px] w-full sm:w-4/5 md:w-3/4 pl-1 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40 italic"
                  : "text-[#075985] rounded-sm h-[30px] sm:h-[35px] w-full sm:w-4/5 md:w-3/4 pl-1 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40 italic"
              }
              name="phone"
              value={user.phone}
              onChange={(e) => handleChange(e)}
            />
            {errors.phone ? (
              <p className="text-[#dc2626] w-3/4">{errors.phone}</p>
            ) : null}
            <label className="w-full sm:w-4/5 md:w-3/4 text-[#bbb] mt-2">
              Dirección de Envío:
            </label>
            <input
              type="text"
              className={
                errors.name
                  ? "text-[#dc2626] rounded-sm h-[30px] sm:h-[35px] w-full sm:w-4/5 md:w-3/4 pl-1 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40 italic"
                  : "text-[#075985] rounded-sm h-[30px] sm:h-[35px] w-full sm:w-4/5 md:w-3/4 pl-1 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40 italic"
              }
              name="address"
              value={user.address}
              onChange={(e) => handleChange(e)}
            />
            {errors.address ? (
              <p className="text-[#dc2626] w-3/4">{errors.address}</p>
            ) : null}
            <label className="w-full sm:w-4/5 md:w-3/4 text-[#bbb] mt-2">
              País:
            </label>
            <input
              type="text"
              className={
                errors.name
                  ? "text-[#dc2626] rounded-sm h-[30px] sm:h-[35px] w-full sm:w-4/5 md:w-3/4 pl-1 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40 italic"
                  : "text-[#075985] rounded-sm h-[30px] sm:h-[35px] w-full sm:w-4/5 md:w-3/4 pl-1 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40 italic"
              }
              name="country"
              value={user.country}
              onChange={(e) => handleChange(e)}
            />
            {errors.country ? (
              <p className="text-[#dc2626] w-3/4">{errors.country}</p>
            ) : null}

            <span className="w-full sm:w-4/5 md:w-3/4 text-[#bbb] mt-7 mb-1 text-center">
              Ingrese los datos de su tarjeta
            </span>
            <div>
              <div className="flex flex-col">
                <CardElement options={cardNumberElementOptions} />

                <button
                  onClick={hanledSubmit}
                  className="border-1 border-rose-500 rounded w-max mx-auto px-3 py-2 text-white bg-[#5050c5] hover:bg-[#383897] transition-colors duration-200 font-medium flex justify-center items-center gap-2 mt-7 md:mt-10 text-base sm:text-lg"
                  disabled={!stripe}
                >
                  Pagar
                  <span className="font-bold">
                    $
                    {cart
                      .reduce((ac, e) => {
                        return ac + e.price * e.quantity;
                      }, 0)
                      .toFixed(2)}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 sm:w-6 sm:h-6 rotate-[-15deg]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </fieldset>

          {/* <fieldset className="bg-[#a3a3a3] text-white container mx-auto flex flex-col justify-center justify-items-center p-20 border">
            Resumen de Pedido
            <h3>
              Total::
              {cart
                .reduce((ac, e) => {
                  return ac + e.price * e.quantity;
                }, 0)
                .toFixed(2)}
            </h3>
          </fieldset> */}
        </form>
      </div>
      <Footer />
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
