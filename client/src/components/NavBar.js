// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/actions";
import SearchBar from "./SearchBar";

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

  function logout() {
    dispatch(logoutUser());
    navigate("/");
  }

  return (
    <div className="bg-NavBar text-2xl text-white flex justify-between items-center px-7 py-3 fixed left-0 right-0 z-50">
      <div className="flex items-center gap-20">
        <div>
          <h6 className="text-5xl">LIBRERIA</h6>
        </div>

        <div>
          <Link to="/" className="mx-3 cursor-pointer hover:text-hoverMenu">
            INICIO
          </Link>

          <Link
            to="/categories"
            className="mx-3 cursor-pointer hover:text-hoverMenu"
          >
            CATEGORIAS
          </Link>
        </div>
      </div>

      <div className="">
        <SearchBar />
      </div>

      <div className="flex items-center">
        {LOGIN === 1 && ROLE === "USER" ? (
          <Link
            to="/favorites"
            className="mr-10 cursor-pointer hover:text-hoverMenu"
          >
            FAVORITOS
          </Link>
        ) : LOGIN === 1 && ROLE === "ADMIN" ? (
          <Link
            to="/admin"
            className="mx-3 cursor-pointer hover:text-hoverMenu"
          >
            ADMINISTRAR
          </Link>
        ) : null}

        {(LOGIN === 0 || LOGIN.length === 0) && ROLE === "" ? (
          <div>
            <div className="ml-10 flex gap-5">
              <Link to="/login">
                <h4 className="text-xl cursor-pointer hover:text-hoverMenu">
                  LOGIN
                </h4>
              </Link>

              <Link to="/register">
                <h4 className="text-xl cursor-pointer hover:text-hoverMenu">
                  REGISTRARSE
                </h4>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex gap-5 items-center">
            <div className="flex gap-3 items-center border border-[#444444] pl-2 pr-1 py-1 rounded">
              <div>
                <h3 className="font-mono text-xl">{USER.name}</h3>
              </div>
              <div>
                <img
                  src={USER.picture}
                  alt={`${USER.name}-img`}
                  className="w-[40px] h-[40px] rounded"
                />
              </div>
            </div>
            <div
              onClick={() => logout()}
              className="flex items-center gap-1 border border-[#444444] bg-[#444444] text-xl rounded px-1 hover:cursor-pointer hover:bg-[#222222] duration-200"
            >
              <h4>Salir</h4>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </div>
          </div>
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
                    INICIAR SESIÓN
                </Link>

                <Link to="/basket" className="mx-3 cursor-pointer hover:text-hoverMenu">
                    COMPRAS
                </Link>
            </div>
*/
