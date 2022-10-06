import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function NavBar() {
  const LOGIN = useSelector((state) => state.login);
  const ROLE = useSelector((state) => state.role);

  if (LOGIN && ROLE.length) {
    localStorage.setItem("LOGIN", LOGIN);
    localStorage.setItem("ROLE", ROLE);
  }

  const activeLogin = localStorage.getItem("LOGIN");
  const activeRole = localStorage.getItem("ROLE");

  // console.log(activeLogin);
  // console.log(activeRole);

  //localStorage.clear();
  return (
    <div className="bg-NavBar text-2xl text-white flex justify-between items-center px-7 py-3">
      <div>
        <h6 className="text-5xl">LIBRERIA</h6>
      </div>

      <div>
        <SearchBar />
      </div>

      <div className="flex items-center">
        <Link to="/" className="mx-3 cursor-pointer hover:text-hoverMenu">
          INICIO
        </Link>

        <Link
          to="/categories"
          className="mx-3 cursor-pointer hover:text-hoverMenu"
        >
          CATEGORIAS
        </Link>

        {/* <Link to="/admin" className="mx-3 cursor-pointer hover:text-hoverMenu">
                    ADMINISTRAR
                </Link> */}

        {activeLogin == 1 && activeRole == "USER" ? (
          <Link
            to="/favorites"
            className="mx-3 cursor-pointer hover:text-hoverMenu"
          >
            FAVORITOS
          </Link>
        ) : activeLogin == 1 && activeRole == "ADMIN" ? (
          <Link
            to="/admin"
            className="mx-3 cursor-pointer hover:text-hoverMenu"
          >
            ADMINISTRAR
          </Link>
        ) : null}

        <div className="ml-10">
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
