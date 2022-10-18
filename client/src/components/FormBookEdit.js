import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, putEditBook, setStatus } from "../redux/actions";
import Swal from "sweetalert2";

let boton;

export function validate(input) {
  let errors = {};
  let expLetras = /^[A-Za-z]+[A-Za-z\s]*[A-Za-z]$/;
  let expLetras_Num = /^[A-Za-z0-9]+[A-Za-z0-9\s]*[A-Za-z0-9]$/;
  if (!input.title) {
    errors.title = "Título es requerido";
  } else if (!expLetras_Num.test(input.title)) {
    errors.title = "Título es inválido";
  }
  if (!input.authors) {
    errors.authors = "Autor es requerido";
  } else if (!expLetras.test(input.authors)) {
    errors.authors = "Autor es inválido";
  }
  if (!input.publisher) {
    errors.publisher = "Editorial es requerido";
  } else if (!expLetras_Num.test(input.publisher)) {
    errors.publisher = "Editorial es inválida";
  }
  if (input.ISBN) {
    if (/\D/.test(input.ISBN)) {
      errors.ISBN = "ISBN es requerido debe ser numérico";
    }
  }
  if (!input.ISBN.trim().length) {
    errors.ISBN = "ISBN es requerido debe ser numérico";
  }
  if (!input.price) {
    errors.price = "precio es requerido";
  } else if (input.price) {
    if (input.price < 0 || !/^[0-9]+([.][0-9]+)?$/.test(input.price)) {
      errors.price = "Precio no valido";
    }
  }

  if (!input.stock) {
    errors.stock = "Stock es requerido";
  } else if (input.stock) {
    if (input.stock < 0 || !/^[0-9]+([0-9]+)?$/.test(input.stock)) {
      errors.stock = "Stock no valido";
    }
  }

  if (!input.categories.length) {
    errors.categories =
      "Seleccione al menos una categoría o seleccione la opción sin categoría";
  }

  //   if (!input.imageLinks) {
  //     errors.imageLinks = "Seleccione una imagen para el libro";
  //   }
  return errors;
}

export default function FormBookEdit() {
  const dispatch = useDispatch();
  const id = useParams().id;
  let book = useSelector((state) => state.detail);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    title: book.title,
    authors: book.authors,
    publisher: book.publisher,
    ISBN: book.ISBN,
    categories: book.categories?.map((c) => {
      return c.name;
    }),
    imageLinks: book.imageLinks,
    description: book.description,
    price: book.price,
    stock: book.stock,
  });
  const uploadImage = async (e) => {
    try {
      const files = e.target.files;
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "BooksApi");
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
      title: "Complete bien los campos!!",
      footer: "Seleccione una imagen para el libro. Y al menos una categoría",
      color: "#fff",
      background: "#333",
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
  };

  const navigate = useNavigate();

  const showAlertSuccess = async () => {
    await Swal.fire({
      position: "center",
      icon: "success",
      title: "Libro Actualizado Exitosamente!!",
      background: "#333",
      color: "#fff",
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 2500,
    });
    navigate("/deletebook");
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (input.imageLinks && input.categories.length) {
      dispatch(putEditBook(id, input));
      setInput({
        title: "",
        authors: "",
        publisher: "",
        ISBN: "",
        categories: [],
        imageLinks: "",
        description: "",
        price: "",
        stock: "",
      });
      e.target.title.focus();
      //  let boton= document.getElementById('enviar')
      boton.disabled = true;
      // setTimeout(() => dispatch(setStatus("")), 5000);
      showAlertSuccess();
    } else {
      showAlertError();
    }
    // e.preventDefault();
    // dispatch(putEditBook(id, input));

    // setInput({
    //   title: "",
    //   authors: "",
    //   publisher: "",
    //   ISBN: "",
    //   categories: [],
    //   imageLinks: "",
    //   description: "",
    //   price: "",
    //   stock: "",
    // });
    // // e.target.title.focus()
    // //  let boton= document.getElementById('enviar')
    // boton.disabled = true;
    // setTimeout(() => dispatch(setStatus("")), 5000);
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

  function handleSelect(e) {
    if (input.categories.includes(e.target.value)) {
      setInput({
        ...input,
        categories: input.categories.filter((c) => {
          return c !== e.target.value;
        }),
      });
    } else {
      setInput({
        ...input,
        categories: input.categories.concat(e.target.value),
      });
    }
  }

  useEffect(() => {
    boton = document.getElementById("enviar");
    dispatch(getAllCategories());
    console.log("input", input);
  }, []);
  let categories = useSelector((state) => state.categories);

  //   let loading = useSelector((state) => state.loading);

  return (
    <div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-[#14222e] text-white mx-auto p-20 py-10 m-20 my-10 rounded-lg w-3/4"
      >
        <h2 className="text-center text-xl text-[30px] text-[#c0c077] mb-10">
          EDITAR LIBRO
        </h2>

        <fieldset className="flex flex-col text-lg">
          <div className="flex flex-col">
            <div className="flex gap-5">
              <div className="flex flex-col w-1/2">
                <label className="">TITULO: </label>
                <input
                  type="text"
                  className={
                    errors.title
                      ? "text-[#dc2626] rounded h-[30px] italic pl-2 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40"
                      : "text-[#075985] rounded h-[30px] italic pl-2 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40"
                  }
                  name="title"
                  value={input.title}
                  placeholder="Titulo del libro"
                  onChange={(e) => handleChange(e)}
                  autoFocus
                />

                <div className="h-[30px]">
                  {errors.title ? (
                    <p className="text-[#dc2626]">{errors.title}</p>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col w-1/2">
                <label className="">AUTOR: </label>
                <input
                  type="text"
                  className={
                    errors.authors
                      ? "text-[#dc2626] rounded h-[30px] italic pl-2 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40"
                      : "text-[#075985] rounded h-[30px] italic pl-2 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40"
                  }
                  name="authors"
                  value={input.authors}
                  placeholder="Nombre de Autor"
                  onChange={(e) => handleChange(e)}
                />

                <div className="h-[30px]">
                  {errors.authors ? (
                    <p className="text-[#dc2626]">{errors.authors}</p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex flex-col w-1/2">
                <label className="">EDITORIAL: </label>
                <input
                  type="text"
                  className={
                    errors.publisher
                      ? "text-[#dc2626] rounded h-[30px] italic pl-2 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40"
                      : "text-[#075985] rounded h-[30px] italic pl-2 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40"
                  }
                  name="publisher"
                  value={input.publisher}
                  placeholder="Editorial"
                  onChange={(e) => handleChange(e)}
                />
                <div className="h-[30px]">
                  {errors.publisher ? (
                    <p className="text-[#dc2626]">{errors.publisher}</p>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col w-1/2">
                <label className="">ISBN: </label>
                <input
                  type="text"
                  className={
                    errors.ISBN
                      ? "text-[#dc2626] rounded h-[30px] italic pl-2 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40"
                      : "text-[#075985] rounded h-[30px] italic pl-2 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40"
                  }
                  name="ISBN"
                  value={input.ISBN}
                  placeholder="isbn"
                  onChange={(e) => handleChange(e)}
                />
                <div className="h-[30px]">
                  {errors.ISBN ? (
                    <p className="text-[#dc2626]">{errors.ISBN}</p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="w-1/2">
              <div className="flex gap-1">
                <div className="flex flex-col w-[50%]">
                  <div className="flex flex-col">
                    <label className="">PRECIO: </label>
                    <input
                      type="text"
                      className={
                        errors.price
                          ? "text-[#dc2626] rounded h-[30px] italic pl-2 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40"
                          : "text-[#075985] rounded h-[30px] italic pl-2 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40"
                      }
                      name="price"
                      value={input.price}
                      placeholder="Precio del libro"
                      onChange={(e) => handleChange(e)}
                    />

                    <div className="h-[30px]">
                      {errors.price ? (
                        <p className="text-[#dc2626]">{errors.price}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="">STOCK: </label>
                    <input
                      type="text"
                      className={
                        errors.stock
                          ? "text-[#dc2626] rounded h-[30px] italic pl-2 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40"
                          : "text-[#075985] rounded h-[30px] italic pl-2 focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40"
                      }
                      name="stock"
                      value={input.stock}
                      placeholder="Ingrese el Stock"
                      onChange={(e) => handleChange(e)}
                    />

                    <div className="h-30px">
                      {errors.stock ? (
                        <p className="text-[#dc2626]">{errors.stock}</p>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="w-[50%]">
                  <img
                    src={
                      input.imageLinks
                        ? input.imageLinks
                        : `https://res.cloudinary.com/dzcpdipdg/image/upload/v1665902861/samples/icons/select-picture-2_zf2pt2.jpg`
                    }
                    alt="img-book"
                    className="h-[185px] w-[65%] rounded mx-auto"
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2 rounded-xl mt-2 p-2">
              <div className="flex">
                <div className="flex flex-col pl-5 w-2/5">
                  <label className="text-center">CATEGORIAS</label>
                  <select
                    name="categories"
                    value={input.categories}
                    placeholder="categoria"
                    onClick={handleSelect}
                    className={
                      errors.categories
                        ? "text-[#dc2626] scrollCustomStyle h-[130px] hover:cursor-pointer outline-none rounded p-1 border-[#838318] border-2"
                        : "text-[#075985] scrollCustomStyle h-[130px] hover:cursor-pointer outline-none rounded p-1 border-[#838318] border-2"
                    }
                    multiple
                  >
                    {categories.map((category) => {
                      return (
                        <option
                          value={category.name}
                          className="hover:bg-[#7474bd] hover:text-white rounded mb-1 p-1"
                        >
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="h-[160px] w-[400px] flex flex-wrap border border-[#777] rounded ml-2 p-1 gap-1">
                  {input.categories.length ? (
                    input.categories.map((cat) => {
                      return (
                        <div className="text-center bg-[#85852e] rounded text-base w-max px-1 h-[30px] text-white">
                          {cat}
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex items-center">
                      {errors.categories ? (
                        <p className="text-[#cc5454] italic text-center">
                          {errors.categories}
                        </p>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col">
            <label className="">IMAGEN: </label>
            <input
              type="file"
              name="imageLinks"
              className="w-[90%] italic hover:cursor-pointer border border-[#555] focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40 rounded"
              accept="image/png, image/jpeg"
              onChange={(e) => uploadImage(e)}
            />
          </div>
        </fieldset>
        <fieldset className="text-center w-[85%] mx-auto mt-5">
          <legend className="mb-1 text-lg font-medium">DESCRIPCION:</legend>
          <textarea
            className="w-full text-[#075985] rounded resize-none focus:ring-[#f3f707] focus:outline-none focus:ring focus:ring-opacity-40 p-1 pl-2 font-medium italic text-lg h-20 mb-5"
            name="description"
            value={input.description}
            onChange={(e) => handleChange(e)}
            placeholder="Añade la descripción del libro"
          />
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
            value="Actualizar"
          />

          <Link to="/deletebook">
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
