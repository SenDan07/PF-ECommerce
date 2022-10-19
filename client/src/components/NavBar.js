// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, addCart } from "../redux/actions";
import SearchBar from "./SearchBar";
import donQuijote from "./img/gitbooks.png";
import DropdownComponent from "./DropdownUser";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LOGIN = useSelector((state) => state.login);
  const ROLE = useSelector((state) => state.role);
  const USER = useSelector((state) => state.user);

  // console.log(ROLE);

  // if (LOGIN && ROLE.length) {
  //   localStorage.setItem("LOGIN", LOGIN);
  //   localStorage.setItem("ROLE", ROLE);
  // }

  // const activeLogin = localStorage.getItem("LOGIN");
  // const activeRole = localStorage.getItem("ROLE");

  // console.log(activeLogin);
  // console.log(activeRole);

  // useEffect(() => {
  //   dispatch(
  //     isLogin({
  //       login: LOGIN,
  //       role: ROLE,
  //     })
  //   );
  // }, [LOGIN, ROLE]);
  let cart_User = useSelector((state) => state.cart);

  cart_User = JSON.parse(localStorage.getItem("bookDetail"))
    ? JSON.parse(localStorage.getItem("bookDetail")).length
      ? JSON.parse(localStorage.getItem("bookDetail"))
      : cart_User
    : [];
  // console.log(cart_User);

  localStorage.setItem("bookDetail", JSON.stringify(cart_User));

  async function logout() {
    // alert("Ingrese a cerrar sesion")
    await dispatch(logoutUser());
    //Eliminas el Cart
    localStorage.setItem("bookDetail", JSON.stringify([]));
    await dispatch(addCart([]));
    navigate("/");
  }

  return (
    <div className="bg-NavBar text-xl text-white flex justify-between items-center px-7 py-3 left-0 right-0 z-50">
      <div className="flex items-center gap-20">
        <div>
          <img
            src={donQuijote}
            alt="Don Quijote"
            className="w-[120px] h-[70px]"
          />
        </div>

        <div>
          <Link
            to="/"
            className="mx-3 cursor-pointer hover:text-hoverMenu transition-colors duration-200"
          >
            HOME
          </Link>

          <Link
            to="/categories"
            className="mx-3 cursor-pointer hover:text-hoverMenu transition-colors duration-200"
          >
            LIBROS
          </Link>
        </div>
      </div>

      <div className="">
        <SearchBar />
      </div>

      <div>
        {LOGIN === 1 && ROLE === "ADMIN" ? null : (
          <Link
            to={cart_User.length ? "/car" : "/"}
            className="text-xl text-[#888888] flex items-center gap-2 border rounded pl-2"
          >
            {/* <box-icon name="cart" className="text-white"></box-icon> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-7 h-7 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>

            <span className="bg-black px-2 py-1 rounded">
              {cart_User.length}
            </span>
          </Link>
        )}
      </div>

      <div className="flex items-center">
        {LOGIN === 1 && ROLE === "USER" ? null : LOGIN === 1 && // </div> //   </Link> //     PEDIDOS //   > //     className="mr-10 cursor-pointer hover:text-hoverMenu transition-colors duration-200" //     to={`/historyorder/${USER.iduser}`} //   <Link //   </Link> //     FAVORITOS //   > //     className="mr-10 cursor-pointer hover:text-hoverMenu transition-colors duration-200" //     to="/favorites" //   <Link // <div className="flex gap-8">
          ROLE === "ADMIN" ? (
          <div className="mx-3 font-bold text-[#adad28]">ADMIN</div>
        ) : null}

        {(LOGIN === 0 || LOGIN.length === 0) && ROLE === "" ? (
          <div>
            <div className="ml-10 flex gap-5">
              <Link to="/login">
                <h4 className="text-xl cursor-pointer hover:text-hoverMenu transition-colors duration-200">
                  LOGIN
                </h4>
              </Link>

              <Link to="/register">
                <h4 className="text-xl cursor-pointer hover:text-hoverMenu transition-colors duration-200">
                  REGISTRARSE
                </h4>
              </Link>
            </div>
          </div>
        ) : (
          // <div className="flex gap-5 items-center">
          //   <div className="flex gap-3 items-center border border-[#444444] pl-2 pr-1 py-1 rounded">
          //     <div>
          //       <h3 className="font-mono text-xl">{USER.name}</h3>
          //     </div>
          //     <div>
          //       <img
          //         src={USER.picture}
          //         alt={`${USER.name}-img`}
          //         className="w-[40px] h-[40px] rounded"
          //       />
          //     </div>
          //   </div>
          //   <div
          //     onClick={() => logout()}
          //     className="flex items-center gap-1 border border-[#444444] bg-[#444444] text-xl rounded px-1 hover:cursor-pointer hover:bg-[#222222] duration-200"
          //   >
          //     <h4>Salir</h4>
          //     <svg
          //       xmlns="http://www.w3.org/2000/svg"
          //       fill="none"
          //       viewBox="0 0 24 24"
          //       strokeWidth="1.5"
          //       stroke="currentColor"
          //       className="w-5 h-5"
          //     >
          //       <path
          //         strokeLinecap="round"
          //         strokeLinejoin="round"
          //         d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          //       />
          //     </svg>
          //   </div>
          // </div>
          <DropdownComponent />
        )}
      </div>
    </div>
  );
}

/*
                <Link to="/favorites" className="mx-3 cursor-pointer hover:text-hoverMenu">
                    FAVORITOS
                </Link>


                            <div >
                <Link to="/auth" className="mx-3 cursor-pointer hover:text-hoverMenu">
                    INICIAR SESIÃ“N
                </Link>

                <Link to="/basket" className="mx-3 cursor-pointer hover:text-hoverMenu">
                    COMPRAS
                </Link>
            </div>
*/

/* 
        {LOGIN === 1 && ROLE === "USER" ? (
          <div>
            <Link
              to="/favorites"
              className="mr-10 cursor-pointer hover:text-hoverMenu">
              FAVORITOS
            </Link>

            <Link>v</Link>
          </div>

*/
