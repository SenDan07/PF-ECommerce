import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postCreateCategory, setStatus } from "../../../redux/actions";
import NavBar from "../../NavBar/NavBar";
import Menu from "../../MenuAdmin/Menu";
import Swal from "sweetalert2";

let boton;
export function validate(input) {
  let errors = {};
  let expLetras = /^[A-Za-z]+[A-Za-z\s]*[A-Za-z]$/;
  let expLetras_Num = /^[A-Za-z0-9]+[A-Za-z0-9\s]*[A-Za-z0-9]$/;
  if (!input.name) {
    errors.name = "Campo Categoria es requerido";
  } else if (!expLetras.test(input.name)) {
    errors.name = "Campo Categoria es inválido";
  }

  return errors;
}

export default function FormBook() {
  const dispatch = useDispatch();

  let loading = useSelector((state) => state.loading);

  const [input, setInput] = React.useState({
    name: "",
    imageLinks: "",
  });
  const [errors, setErrors] = React.useState({});

  const uploadImage = async (e) => {
    try {
      const files = e.target.files;
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "yweg8r9z");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dl7pi3qek/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();
      setInput({
        ...input,
        [e.target.name]: file.secure_url,
      });
    } catch (e) {
      setErrors({
        ...errors,
        imageLinks: "Imagen no se pudo cargar",
      });
    }
  };

  const showAlertError = async () => {
    await Swal.fire({
      icon: "info",
      title: "Falta Información!!",
      footer: "Coloque el nombre de Categoría y seleccione una imagen",
      color: "#fff",
      background: "#333",
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
  };

  const showAlertSuccess = async () => {
    await Swal.fire({
      position: "center",
      icon: "success",
      title: "Categoría Registrada Exitosamente!!",
      background: "#333",
      color: "#fff",
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 2500,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (input.imageLinks && !errors.name) {
      dispatch(postCreateCategory(input));
      setInput({
        name: "",
        imageLinks: "",
      });
      e.target.name.focus();
      showAlertSuccess();
      boton.disabled = true;
    } else {
      showAlertError();
    }
  }

  function handleChange(e) {
    console.log("Ingresa en change");
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

    boton.disabled = true;
    boton.className = "bg-[#94a3b8] p-2 px-5 m-2 rounded hover:cursor-no-drop";
  }, []);

  return (
    <div>
      <NavBar />
      <Menu />
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-[#14222e] text-white container mx-auto p-20 m-20 pt-10 mt-10 rounded-lg w-1/2"
      >
        <h2 className="text-center text-3xl text-[#c0c077] mb-16 font-medium">
          REGISTRO DE CATEGORIA
        </h2>
        <br />
        <fieldset className="text-[18px] flex ">
          <div className="w-3/4">
            <div className="flex flex-col">
              <label className="">CATEGORIA: </label>
              <input
                type="text"
                className={
                  errors.name
                    ? "text-[#dc2626] rounded h-[35px] pl-2 italic focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40 w-1/2"
                    : "text-[#075985] rounded h-[35px] pl-2 italic focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40 w-1/2"
                }
                name="name"
                value={input.name}
                placeholder="Nombre de la categoría"
                onChange={(e) => handleChange(e)}
                autoFocus
              />

              <div className="h-[30px]">
                {errors.name ? (
                  <p className="text-[#d43b3b] italic">{errors.name}</p>
                ) : null}
              </div>
            </div>

            <div className="mt-4">
              <label className="block">IMAGEN: </label>
              <input
                type="file"
                content="Imagen"
                name="imageLinks"
                className="w-full italic hover:cursor-pointer border border-[#555] focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40 rounded"
                accept="image/png, image/jpeg"
                onChange={(e) => uploadImage(e)}
              />
            </div>
          </div>
          <div className="w-1/4 ml-2 rounded">
            <img
              src={
                input.imageLinks
                  ? input.imageLinks
                  : `https://res.cloudinary.com/dzcpdipdg/image/upload/v1665902861/samples/icons/select-picture-2_zf2pt2.jpg`
              }
              alt="img-category"
              className="h-[170px] w-full rounded"
            />
          </div>
        </fieldset>
        <fieldset className="text-center mt-8">
          {/* {loading ? <p>{loading}</p> : null} */}
          <input
            type="submit"
            className={
              Object.keys(errors).length
                ? "bg-[#94a3b8] p-2 px-5 m-2 rounded hover:cursor-no-drop mr-2"
                : "bg-[#12519a] p-2 px-5 m-2 cursor-pointer rounded hover:bg-[#0c417e] transition-colors duration-200 mr-2"
            }
            id="enviar"
            disabled={Object.keys(errors).length ? true : false}
            value="Guardar"
          />

          <Link to="/admicategory">
            <input
              type="button"
              className="bg-[#9a3412] hover:bg-[#7c270b] transition-colors duration-200 p-2 px-5 cursor-pointer rounded ml-2"
              value="Cancelar"
            />
          </Link>
        </fieldset>
      </form>
    </div>
  );
}
