import { useSelector, useDispatch } from "react-redux";
import CartItem from "../CartItem/CartItem";
import { Link, useNavigate } from "react-router-dom";
import { postCart } from "../../redux/actions";
import { useEffect } from "react";
import NavBar from "../NavBar/NavBar";

export default function Cart() {
  //Mapeo de Productos Seleccionados
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LOGIN = useSelector((state) => state.login);
  const ROLE = useSelector((state) => state.role);
  const User = useSelector((state) => state.user);

  const cart1 = useSelector((state) => state.cart);
  let cart = JSON.parse(localStorage.getItem("bookDetail"));
  // console.log(cart.length);
  //Si esta logueado guardas el carrito al id del usuario

  // console.log("carrito a renderizar", cart);

  useEffect(() => {
    if (ROLE === "USER") {
      dispatch(postCart({ email: User.email, cart }));
    }
  }, [cart1]);
  async function handleClick() {
    if (LOGIN && cart.length) {
      // console.log("carrito a guardar", cart);
      //  await dispatch(postCart({ email: User.email, cart }));
    }
  }

  return (
    <div className="flex flex-col">
      <NavBar />
      <div
        className="flex justify-start h-max mt-4 ml-3 text-xs font-bold md:text-lg md:font-medium hover:cursor-pointer w-max"
        onClick={() => navigate("/")}
      >
        <h3 className="border-1 rounded px-3 py-3 md:py-2 bg-button  text-white hover:bg-[#065841] transition-colors duration-500">
          &#129044; Regresar
        </h3>
      </div>

      <div className="flex flex-col-reverse lg:flex-row mx-auto relative w-[99%] xl:w-[75%]">
        <div className="lg:mx-auto">
          <div className="flex items-center justify-center gap-2 mt-10 lg:mt-0">
            <h2 className="text-xl sm:text-3xl font-bold">
              Listado de tu carrito
            </h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#ffff00"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 sm:w-10 sm:h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </div>
          <div className="mx-auto sm:m-10 sm:mr-5 p-1 mt-3 rounded-lg bg-[#222]">
            {cart?.map((c) => {
              return <CartItem key={c.id} book={c} />;
            })}
          </div>
        </div>
        <div className="flex justify-end mr-1 sticky top-[0vh]">
          <div className="text-lg font-medium px-5 border py-2 lg:py-0 lg:h-64 xl:mt-[20vh] bg-[#111111e3] flex flex-col justify-center items-center rounded-lg sticky top-0 xl:top-[10vh] w-max mt-[1vh]">
            <h3 className="text-white text-center mb-1 sm:mb-5">
              <span className="text-lg sm:text-2xl">TOTAL GENERAL</span>
              <br />
              <span className="font-bold text-[#ffff00] text-xl sm:text-3xl">
                $
                {cart
                  ?.reduce((ac, e) => {
                    return ac + e.price * e.quantity;
                  }, 0)
                  .toFixed(2)}
              </span>
            </h3>
            <Link to={LOGIN === 1 && ROLE === "USER" ? `/order` : `/login`}>
              <input
                type="submit"
                className="border-1 border-rose-500 rounded w-max mx-auto text-base sm:text-xl px-3 py-2 bg-button text-white hover:bg-[#03553e] transition-colors duration-200 hover:cursor-pointer"
                id="boton"
                onClick={handleClick}
                disabled={cart.length ? false : true}
                value="Procesar Compra"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
