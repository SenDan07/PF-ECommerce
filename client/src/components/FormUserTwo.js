import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, loginWithGoogle } from "../redux/actions";
import { GoogleLogin } from "@react-oauth/google";

export const FormUserTwo = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();

  //   let regexEmail =
  //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
      navigate("/");
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

  // const loginGoogle = useGoogleLogin({
  //   onSuccess: (tokenResponse) => dispatch(loginWithGoogle(tokenResponse)),
  // });

  // const loginGoogle = useGoogleLogin({
  //   onSuccess: (tokenResponse) => console.log(tokenResponse),
  // });

  // const loginGoogle = useGoogleLogin({
  //   onSuccess: async (response) => {
  //     try {
  //       const data = await axios.get(
  //         `https://www.googleapis.com/oauth2/v3/userinfo`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${response.access_token}`,
  //           },
  //         }
  //       );
  //       console.log(data);
  //       navigate("/");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   },
  // });

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <Link to="/">
        <h3 className="border-1 border-rose-500 rounded w-max mx-auto px-3 py-2 bg-button text-black hover:text-white absolute mt-[2%] ml-[3%]">
          &#129044; Regresar
        </h3>
      </Link>
      <div className="w-1/2 p-6 m-auto bg-[#0d151b] rounded-md shadow-xl lg:max-w-xl sombra border border-[#888888]">
        <h1 className="text-3xl font-semibold text-center text-white uppercase">
          LOGIN
        </h1>
        <form className="mt-6" onSubmit={onSubmit}>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-lg font-semibold text-white"
            >
              Correo
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              placeholder="Email"
              onChange={onInputChange}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-[#4eec10] focus:outline-none focus:ring focus:ring-opacity-40 italic"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-lg font-semibold text-white"
            >
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={data.password}
              placeholder="Password"
              onChange={onInputChange}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-[#4eec10] focus:outline-none focus:ring focus:ring-opacity-40 italic"
            />
          </div>

          {/* <Link to="/" className="text-sm text-[#cccccc] hover:underline">
            Olvidaste tu contraseña ?
          </Link> */}
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="w-3/4 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#365496] rounded-md hover:bg-[#292f81] focus:outline-none focus:bg-purple-600 text-lg"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
        <div className="relative flex items-center justify-center w-4/5 mt-6 border border-[#aaaaaa] m-auto"></div>
        <div className="flex mt-4 justify-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              dispatch(loginWithGoogle(credentialResponse));
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>

        <p className="mt-8 text-lg font-light text-center text-[#cccccc]">
          {" "}
          No tienes una cuenta?{" "}
          <Link to="/register" className="font-medium hover:underline">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
};
