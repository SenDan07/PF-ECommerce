import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLogin } from "../redux/actions";
import NavBar from "./NavBar";
import Menu from "./Menu";

export default function NavAdmin() {
  // const activeLogin = localStorage.getItem("LOGIN");
  // const activeRole = localStorage.getItem("ROLE");

  const activeLogin = useSelector((state) => state.login);
  const activeRole = useSelector((state) => state.role);
  const USER = useSelector((state) => state.user);
  const navigate = useNavigate();

  const LOGIN = useSelector((state) => state.login);
  // console.log(LOGIN);

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
  //{USER.name[0].toUpperCase()}{USER.name.substring(1)} mayuscula la primera letra
  return (
    <div className="justify-self-center">
      <NavBar />

      <div className="text-6xl flex justify-center mt-5">
        MENU ADMINISTRADOR
      </div>

      <div className="flex justify-center">
        <div className="text-xl">BIENVENID@ {USER.name.toUpperCase()}</div>
      </div>
      {/*https://storage.googleapis.com/librio-media/media/cache/content_section/95/8d/ad25ed4e50601bb5ab97690e69f1.png*/}
      <Menu />
      <img
        src="https://storage.googleapis.com/librio-media/media/cache/content_section/95/8d/ad25ed4e50601bb5ab97690e69f1.png"
        style={{ width: 700 }}
        className="mx-auto mt-8"
        alt=""
      />
    </div>
  );
}
