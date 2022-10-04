import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../redux/actions";
import { Link } from "react-router-dom";

export const Login = () => {
  //   const navigate = useNavigate();
  let dispatch = useDispatch();

  let regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const initialInputs = {
    email: "",
    password: "",
  };

  const [data, setData] = useState(initialInputs);

  function onSubmit(e) {
    e.preventDefault();
    if (data.email.length > 5 && data.password.length >= 4) {
      dispatch(login(data));
      setData(initialInputs);
    } else {
      alert("Debe Completar los campos correctamente!!");
    }
  }

  function onInputChange(e) {
    e.preventDefault();

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <div className="flex h-screen justify-center items-center relative">
      <Link to="/">
        <h3 className="border-1 border-rose-500 rounded w-max mx-auto px-3 py-2 bg-button text-white absolute mt-[-20%] ml-[6%]">
          &#129044; Regresar
        </h3>
      </Link>
      <div>
        <form
          onSubmit={onSubmit}
          className="border p-10 rounded flex flex-col gap-5"
        >
          <div>
            <label className="text-white text-xl">Correo</label>
            <br />
            <input
              className="text-xl py-1 rounded outline-none pl-2"
              type="text"
              onChange={onInputChange}
              name="email"
              value={data.email}
              placeholder="Email"
            />
          </div>

          <div>
            <label className="text-white text-xl">Contraseña</label>
            <br />
            <input
              className="text-xl py-1 rounded outline-none pl-2"
              type="text"
              onChange={onInputChange}
              name="password"
              value={data.password}
              placeholder="Password"
            />
          </div>

          <div className="flex justify-center">
            <input
              className="bg-bgHome text-xl px-4 py-1 rounded cursor-pointer hover:bg-hoverMenu text-white border"
              type="submit"
              value="Enviar"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
