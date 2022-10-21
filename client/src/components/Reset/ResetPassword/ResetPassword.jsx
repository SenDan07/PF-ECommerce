import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, resetPassword } from "../../../redux/actions";
import NavBar from "../../NavBar/NavBar";
import Swal from "sweetalert2";

export const ResetPassword = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();

  const validate = (input) => {
    const errors = {};
    let regexSecretWord = /^[0-9a-zA-Z]+$/;
    const emailRegex =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    if (!input.email) {
      errors.email = "Email es requerido";
    } else if (!emailRegex.test(input.email)) {
      errors.email = "Email es invalido";
    }
    if (!input.password) {
      errors.password = "Password es requerido";
    }
    if (input.secretWord.trim().length < 4) {
      errors.secretWord = "Palabra secreta es requerida (min 4 caracteres)";
    } else if (!regexSecretWord.test(input.secretWord)) {
      errors.secretWord =
        "No se aceptan caracteres especiales, ni espacios en blanco";
    }
    return errors;
  };

  const [errors, setErrors] = React.useState({});

  const initialInputs = {
    email: "",
    password: "",
    secretWord: "",
  };

  const [data, setData] = useState(initialInputs);

  const showAlertError = async () => {
    await Swal.fire({
      icon: "error",
      title: "Oops, Hubo un Error!!",
      footer:
        "Verifica el correo y la palabra secreta o contactate con el administrador",
      color: "#fff",
      background: "#333",
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
  };

  const showAlertInfo = async () => {
    await Swal.fire({
      position: "center",
      icon: "info",
      title: "Complete correctamente los campos!!",
      background: "#333",
      color: "#fff",
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 1700,
    });
  };

  const showAlertSuccess = async () => {
    await Swal.fire({
      position: "center",
      icon: "success",
      title: "Nueva Contraseña Establecida Con Éxito!!",
      text: "Se ha modificado tu contraseña",
      background: "#333",
      color: "#fff",
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 2500,
    });

    navigate("/");
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (!errors.email && !errors.password && !errors.secretWord) {
      try {
        let response = await dispatch(resetPassword(data));
        console.log(response);
        //Llenar carrito
        // fill_cart();
        setData(initialInputs);
        await showAlertSuccess();
        await dispatch(login({ email: data.email, password: data.password }));
      } catch (error) {
        console.log(error);
        showAlertError();
      }
    } else {
      // alert("Debe Completar los campos correctamente!!");
      showAlertInfo();
    }
  }

  function onInputChange(e) {
    e.preventDefault();

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...data,
        [e.target.name]: e.target.value,
      })
    );
  }

  return (
    <div>
      <NavBar />
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-1/2 p-6 m-auto bg-[#121f2b] rounded-md shadow-xl lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-[#c0c077] uppercase">
            RESET PASSWORD
          </h1>
          <form className="mt-6" onSubmit={onSubmit}>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-lg font-semibold text-white pl-2"
              >
                Correo
              </label>
              <input
                type="email"
                name="email"
                value={data.email}
                placeholder="Email"
                onChange={onInputChange}
                className="block w-full px-4 py-2 mt-1 bg-white border rounded-md focus:border-purple-400 focus:ring-[#4eec10] focus:outline-none focus:ring focus:ring-opacity-40 italic"
              />
              <div className="h-[30px]">
                {errors.email ? (
                  <p className="text-[#d15c5c] pl-1">{errors.email}</p>
                ) : null}
              </div>
            </div>

            <div className="">
              <label
                htmlFor="secretWord"
                className="block text-lg font-semibold text-white pl-2"
              >
                Palabra Secreta
              </label>
              <input
                type="text"
                name="secretWord"
                value={data.secretWord}
                placeholder="Insert Secret Word"
                onChange={onInputChange}
                className="block w-full px-4 py-2 mt-1 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-[#4eec10] focus:outline-none focus:ring focus:ring-opacity-40 italic"
              />
              <div className="h-[30px]">
                {errors.secretWord ? (
                  <p className="text-[#d15c5c] pl-1">{errors.secretWord}</p>
                ) : null}
              </div>
            </div>

            <div className="">
              <label
                htmlFor="password"
                className="block text-lg font-semibold text-white pl-2"
              >
                Establezca Nueva Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={data.password}
                placeholder="Set New Password"
                onChange={onInputChange}
                className="block w-full px-4 py-2 mt-1 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-[#4eec10] focus:outline-none focus:ring focus:ring-opacity-40 italic"
              />
              <div className="h-[30px]">
                {errors.password ? (
                  <p className="text-[#d15c5c] pl-1">{errors.password}</p>
                ) : null}
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                className="w-3/4 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#365496] rounded-md hover:bg-[#292f81] focus:outline-none focus:bg-purple-600 text-lg"
              >
                Enviar
              </button>
            </div>
          </form>
          <div className="relative flex items-center justify-center w-4/5 mt-6 border border-[#aaaaaa] m-auto"></div>

          <p className="mt-8 text-lg font-light text-center text-[#cccccc]">
            {" "}
            No tienes una cuenta?{" "}
            <Link to="/register" className="font-medium hover:underline">
              Registrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
