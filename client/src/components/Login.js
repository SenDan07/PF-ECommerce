import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, loginWithGoogle } from "../redux/actions";
import { GoogleLogin } from "@react-oauth/google";

export const Login = () => {
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
          {/* <button
            type="button"
            className="flex items-center justify-around w-1/2 m-auto p-2 border border-[#888888] rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600 text-white bg-[#22463d] text-lg hover:bg-NavBar"
            onClick={loginGoogle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path
                  fill="#4285F4"
                  d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                />
                <path
                  fill="#34A853"
                  d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                />
                <path
                  fill="#FBBC05"
                  d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                />
                <path
                  fill="#EA4335"
                  d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                />
              </g>
            </svg>
            Inicia sesión con Google
          </button> */}
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              // console.log(credentialResponse);
              dispatch(loginWithGoogle(credentialResponse));
              navigate("/");
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
