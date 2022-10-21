import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, addCart } from "../../redux/actions";
import SearchBar from "../Search/SearchBar/SearchBar";
import donQuijote from "../img/gitbooks.png";
import DropdownComponent from "../DropdownUser/DropdownUser";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LOGIN = useSelector((state) => state.login);
  const ROLE = useSelector((state) => state.role);
  const USER = useSelector((state) => state.user);

  let cart_User = useSelector((state) => state.cart);

  cart_User = JSON.parse(localStorage.getItem("bookDetail"))
    ? JSON.parse(localStorage.getItem("bookDetail")).length
      ? JSON.parse(localStorage.getItem("bookDetail"))
      : cart_User
    : [];

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
        {LOGIN === 1 && ROLE === "USER" ? null : LOGIN === 1 && ROLE === "ADMIN" ?
          (<div className="mx-3 font-bold text-[#adad28]">ADMIN</div>) : null}

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
        ) : (<DropdownComponent />)}
      </div>
    </div>
  );
}
