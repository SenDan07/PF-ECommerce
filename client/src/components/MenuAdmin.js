import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { isLogin } from "../redux/actions";
import NavBar from "./NavBar";

export default function NavAdmin() {
  // const activeLogin = localStorage.getItem("LOGIN");
  // const activeRole = localStorage.getItem("ROLE");

  const activeLogin = useSelector((state) => state.login);
  const activeRole = useSelector((state) => state.role);
  const USER = useSelector((state) => state.user);
  const navigate = useNavigate();

  const LOGIN = useSelector((state) => state.login);
  console.log(LOGIN);

  // const dispatch = useDispatch();
  // //   console.log(activeLogin);
  // //   console.log(activeRole);

  // useEffect(() => {
  //   dispatch(
  //     isLogin({
  //       login: activeLogin,
  //       role: activeRole,
  //     })
  //   );

  //   return () => {
  //     dispatch(
  //       isLogin({
  //         login: activeLogin,
  //         role: activeRole,
  //       })
  //     );
  //   };
  // }, [activeLogin, activeRole]);

  return (
    <div className="justify-self-center">
      <NavBar />

      <div className="m-auto flex justify-start ">
        <Link to="/">
          <h3 className="border-1 border-rose-500 rounded px-5 py-2 bg-button text-black hover:text-white mt-5 mx-10">
            &#129044; Regresar
          </h3>
        </Link>
      </div>

      <div className="text-6xl flex justify-center mt-5">
        MENU ADMINISTRADOR
      </div>

      <div className="flex justify-center">
        <div className="text-xl">BIENVENID@ {USER.name}</div>
      </div>

      <div className="text-4xl mt-20">
        <div className="mb-10 flex justify-center">
          <div className="cursor-pointer hover:text-white">
            <Link to="/adminuser">Administrar Usuarios</Link>
          </div>
        </div>

        <div className="mb-10 flex justify-center">
          <div className="cursor-pointer hover:text-white">
            <Link to="/admicategory">Administrar Categorias</Link>
          </div>
        </div>

        <div className="mb-10 flex justify-center">
          <Link to="/createbook">
            <div className="cursor-pointer hover:text-white">Crear Libros</div>
          </Link>
        </div>

        <div className="mb-10 flex justify-center">
          <Link to="/createcategory">
            <div className="cursor-pointer hover:text-white">
              Crear Categorias
            </div>
          </Link>
        </div>

        {/* <div className="mb-10 flex justify-center">
          <Link>
            <div className="cursor-pointer hover:text-white">
              Editar Carrusel
            </div>
          </Link>
        </div>

        <div className="mb-10 flex justify-center">
          <Link>
            <div className="cursor-pointer hover:text-white">Editar Libros</div>
          </Link>
        </div> */}

        <div className="mb-10 flex justify-center">
          <Link to="/deletebook">
            <div className="cursor-pointer hover:text-white ">
              Eliminar Libros
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
