import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { putUser } from "../../../redux/actions";
import Swal from "sweetalert2";
import NavBar from "../../NavBar/NavBar";

let boton;
export function validate(input) {
  let errors = {};
  let expLetras = /^[A-Za-z]+[A-Za-z\s]*[A-Za-z]$/;
  let regexSecretWord = /^[0-9a-zA-Z]+$/;

  if (!input.name) {
    errors.name = "Nombre es requerido";
  } else if (!expLetras.test(input.name)) {
    errors.name = "Nombre es invalido";
  }
  if (!input.lastName) {
    errors.lastName = "Apellido es requerido";
  } else if (!expLetras.test(input.lastName)) {
    errors.lastName = "Apellido es invalido";
  }
  if (input.secretWord.trim().length < 4) {
    errors.secretWord = "Palabra secreta es requerida (min 4 caracteres)";
  } else if (!regexSecretWord.test(input.secretWord)) {
    errors.secretWord =
      "No se aceptan caracteres especiales, ni espacios en blanco";
  }

  return errors;
}

export default function FormUserEdit() {
  const dispatch = useDispatch();
  const USER = useSelector((state) => state.user);
  // let loading = useSelector((state) => state.loading);

  const [input, setInput] = React.useState({
    id: USER.iduser ? USER.iduser : USER.id,
    name: USER.name,
    lastName: USER.lastName,
    email: USER.email,
    secretWord: "",
  });
  const [errors, setErrors] = React.useState({});

  const navigate = useNavigate();

  const showAlertError = async () => {
    await Swal.fire({
      icon: "error",
      title: "Oops, Hubo un Error al Actualizar!!",
      footer: "Intenta nuevamente con datos válidos",
      color: "#fff",
      background: "#333",
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
  };

  const showLoadingRegister = async () => {
    Swal.fire({
      title: "Actualizando tus Datos!",
      text: "Espere unos segundos",
      timer: 30000,
      background: "#333",
      color: "#fff",
      imageUrl:
        "https://res.cloudinary.com/dzcpdipdg/image/upload/v1665758602/samples/loaders/black-book-loader-unscreen_kiwrc8.gif",
      showCancelButton: false,
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
    }).then(
      function () {},

      function (dismiss) {
        if (dismiss === "timer") {
        }
      }
    );
  };

  const showAlertSuccess = async () => {
    await Swal.fire({
      position: "center",
      icon: "success",
      title: "Datos Actualizados con Éxito!!",
      text: "Tu información se ha modificado.",
      background: "#333",
      color: "#fff",
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 2500,
    });

    navigate("/");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    showLoadingRegister();

    const valor = await dispatch(putUser(input));
    console.log(valor);
    if (valor) {
      await showAlertSuccess();
    } else {
      await showAlertError();
    }
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  useEffect(() => {
    boton = document.getElementById("enviar");

    //dispatch(getAllCategories())
  }, []);
  //let categories=useSelector(state=>state.categories)
  return (
    <div>
      <NavBar />
      <div
        className="flex justify-start h-max mt-4 ml-3 text-xs font-bold md:text-lg md:font-medium hover:cursor-pointer w-max"
        onClick={() => navigate(-1)}
      >
        <h3 className="border-1 rounded px-3 py-3 bg-button  text-white hover:bg-[#065841] transition-colors duration-500">
          &#129044; Regresar
        </h3>
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-[#14222e] text-white container mx-auto p-5 lg:p-10 xl:p-20 m-20 mt-10 md:mt-16 rounded md:rounded-lg w-[95%] sm:w-[80%] lg:w-1/2"
      >
        <h2 className="text-center text-lg lg:text-2xl text-[#c0c077] mb-5 xl:mb-10">
          EDITA TUS DATOS
        </h2>
        <br />
        <fieldset className="columns-2 text-[16px] m-2 flex flex-col mx-auto">
          <div className="flex flex-col xl:flex-row xl:gap-2">
            <div className="w-[95%] xl:w-1/2 mx-auto">
              <div className="flex flex-col">
                <label className="">NOMBRE: </label>
                <input
                  type="text"
                  className={
                    errors.name
                      ? "text-[#dc2626] rounded-sm h-[30px] italic pl-1 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40 w-full xl:w-[90%]"
                      : "text-[#075985] rounded-sm h-[30px] italic pl-1 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40 w-full xl:w-[90%]"
                  }
                  name="name"
                  value={input.name}
                  placeholder="Ingrese su Nombre"
                  onChange={(e) => handleChange(e)}
                  autoFocus
                />
                <div className="h-[30px]">
                  {errors.name ? (
                    <p className="text-[#dc2626]">{errors.name}</p>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col">
                <label className="">APELLIDO: </label>
                <input
                  type="text"
                  className={
                    errors.lastName
                      ? "text-[#dc2626] rounded-sm h-[30px] italic pl-1 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40 w-full xl:w-[90%]"
                      : "text-[#075985] rounded-sm h-[30px] italic pl-1 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40 w-full xl:w-[90%]"
                  }
                  name="lastName"
                  value={input.lastName}
                  placeholder="Ingrese su Apellido"
                  onChange={(e) => handleChange(e)}
                />

                <div className="h-[30px]">
                  {errors.lastName ? (
                    <p className="text-[#dc2626]">{errors.lastName}</p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="w-[95%] xl:w-1/2 mx-auto">
              {/* <div className="flex flex-col">
                <label className="">PASSWORD: </label>
                <input
                  type="password"
                  className={
                    errors.password
                      ? "text-[#dc2626] rounded h-[30px] italic w-3/4 pl-1 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40"
                      : "text-[#075985] rounded h-[30px] italic w-3/4 pl-1 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40"
                  }
                  name="password"
                  value={input.password}
                  placeholder="Contraseña"
                  onChange={(e) => handleChange(e)}
                />

                <div className="h-[30px]">
                  {errors.password ? (
                    <p className="text-[#dc2626]">{errors.password}</p>
                  ) : null}
                </div>
              </div> */}

              <div className="flex flex-col">
                <label className="">PALABRA SECRETA: </label>
                <input
                  type="text"
                  className={
                    errors.secretWord
                      ? "text-[#dc2626] rounded-sm h-[30px] italic pl-1 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40 w-full xl:w-[90%]"
                      : "text-[#075985] rounded-sm h-[30px] italic pl-1 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40 w-full xl:w-[90%]"
                  }
                  name="secretWord"
                  value={input.secretWord}
                  placeholder="Palabra Secreta"
                  onChange={(e) => handleChange(e)}
                />

                <div className="h-[30px]">
                  {errors.secretWord ? (
                    <p className="text-[#dc2626]">{errors.secretWord}</p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          {/*
<div className="w-3/4">
            <label className="block">PALABRA SECRETA: </label>
            <input
              type="text"
              className={
                errors.secretWord
                  ? "text-[#dc2626] rounded h-[30px] italic w-3/4 pl-1 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40"
                  : "text-[#075985] rounded h-[30px] italic w-3/4 pl-1 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40"
              }
              name="secretWord"
              value={input.secretWord}
              placeholder="Utlizala para recuperar tu cuenta (min 5 char)"
              onChange={(e) => handleChange(e)}
            />
            <div className="h-[30px]">
              {errors.secretWord ? (
                <p className="text-[#dc2626]">{errors.secretWord}</p>
              ) : null}
            </div>
          </div>
*/}

          {/*<label className="block">IMAGEN: </label>
                <input type='file' name='imageLinks' className="w-64" accept="image/png, image/jpeg" onChange={(e) => uploadImage(e)} />
                <img src={input.imageLinks} alt="imagen" className="h-10 w-16" />*/}
          {/*<label className="block">ROL:</label>           
                <select name="role" value={input.role} onChange={handleChange} className={errors.role ? 'text-[#dc2626]' : 'text-[#075985]'} >
                          <option value='USER'>USER</option>
                          <option value='ADMIN'>ADMIN</option>                         
            </select>*/}
          <br />
        </fieldset>
        <fieldset className="text-center mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-center">
          {/* {loading ? <p>{loading}</p> : null} */}
          <input
            type="submit"
            className={`text-xl ${
              Object.keys(errors).length
                ? "bg-[#94a3b8] p-2 px-8 m-2 cursor-no-drop rounded w-3/4 sm:w-max mx-auto sm:mx-0 sm:m-2 sm:mt-0 mb-3 sm:mb-0"
                : "bg-[#124d9a] p-2 px-8 m-2 rounded cursor-pointer transition-colors duration-200 hover:bg-[#0e3f7e] w-3/4 sm:w-max mx-auto sm:mx-0 sm:m-2 sm:mt-0 mb-3 sm:mb-0"
            }`}
            id="enviar"
            disabled={Object.keys(errors).length ? true : false}
            value="Guardar"
          />

          <Link to="/">
            <input
              type="button"
              className="bg-[#9a3412] p-2 w-36 cursor-pointer rounded transition-colors duration-200 hover:bg-[#70240a] ml-3 text-lg"
              value="Cancelar"
            />
          </Link>
        </fieldset>
      </form>
    </div>
  );
}
