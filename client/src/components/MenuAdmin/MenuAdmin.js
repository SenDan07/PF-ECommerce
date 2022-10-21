import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLogin } from "../redux/actions";
import NavBar from "./NavBar";
import Menu from "./Menu";

export default function NavAdmin() {
  const activeLogin = useSelector((state) => state.login);
  const activeRole = useSelector((state) => state.role);
  const USER = useSelector((state) => state.user);
  const navigate = useNavigate();

  const LOGIN = useSelector((state) => state.login);
  return (
    <div className="justify-self-center">
      <NavBar />

      <div className="text-6xl flex justify-center mt-5">
        MENU ADMINISTRADOR
      </div>

      <div className="flex justify-center">
        <div className="text-xl">BIENVENID@ {USER.name.toUpperCase()}</div>
      </div>
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
