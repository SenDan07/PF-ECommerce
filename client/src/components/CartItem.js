import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/actions";
import Swal from "sweetalert2";

export default function CartItem({ book }) {
  const dispatch = useDispatch();

  const cantidad = [];
  for (let i = 1; i <= book.stock; i++) {
    cantidad[i] = i;
  }

  //   useEffect(() => {
  //     // showAlertBookDelete();
  //   }, []);

  const showAlertBookDelete = async () => {
    await Swal.fire({
      position: "center",
      title: "Libro Eliminado del carrito!!",
      background: "#fff",
      color: "#223648",
      imageUrl:
        "https://res.cloudinary.com/dzcpdipdg/image/upload/v1665861121/samples/icons/delete_1_z1vt5x.gif",
      imageWidth: 48,
      imageHeight: 48,
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 1500,
    });
  };

  //Elimina libro
  function handleClick(e) {
    let cart = JSON.parse(localStorage.getItem("bookDetail"));

    cart = cart.filter((c) => {
      return c.id !== book.id;
    });
    showAlertBookDelete();
    // alert("se Elimina Libro")
    dispatch(addCart(cart));
    cart = JSON.stringify(cart);
    localStorage.setItem("bookDetail", cart);
  }

  function handleSelect(e) {
    let cart = JSON.parse(localStorage.getItem("bookDetail"));

    let item = cart.find((c) => {
      return c.id == book.id;
    });
    item.quantity = e.target.value;
    dispatch(addCart(cart));
    cart = JSON.stringify(cart);
    localStorage.setItem("bookDetail", cart);
  }

  return (
    <div className="flex flex-row m-5 p-2 pl-4 rounded bg-[#b3c9d8]">
      <div className="flex w-[60%]">
        <div className="w-[180px] mb-2">
          <img
            src={book.imageLinks}
            alt={`img-${book.title}`}
            className="w-[180px] h-[250px] rounded sombra"
          />
        </div>
        <div className="flex flex-col justify-center m-10 mb-5 w-1/2">
          <h2 className="font-medium text-center text-2xl text-NavBar italic">
            {book.title.length > 31
              ? `${book.title.toUpperCase().slice(0, 31)}...`
              : `${book.title.toUpperCase()}`}
          </h2>

          <div className="bg-[#333333] mt-2 pb-1 px-2 rounded w-max mx-auto">
            <h3 className="text-center text-lg font-bold text-white">
              <span className="font-medium text-[#dddddd]">
                Precio unitario:
              </span>
              <br />${book.price.toFixed(2)}
            </h3>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-1/2">
        <div>
          <div className="flex justify-center items-center gap-2">
            <span className="font-medium text-lg">Cantidad:</span>
            <select
              onChange={(e) => handleSelect(e)}
              value={cantidad <= book.quantity ? book.quantity : cantidad}
              className="rounded w-12 h-7 outline-none hover:cursor-pointer font-bold"
            >
              {cantidad.map((i, idx) => {
                return (
                  <option key={idx} value={i} className="font-medium rounded">
                    {i}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="rounded bg-[#111111] mt-3 py-1 px-3">
            <h3 className="text-center text-xl font-medium text-white">
              Total:{" "}
              <span className="text-[#b8b82e]">
                ${(book.price * book.quantity).toFixed(2)}
              </span>
            </h3>
          </div>
        </div>

        {/* <div className="flex justify-center items-center gap-3">
          <div className="border">
            <h3>Stock</h3>
            <h3>{book.stock}</h3>
          </div>
          <div className="border">
            <h3>Cantidad:</h3>
            <button className="border w-6">-</button>
            <input readonly value={book.quantity} className="w-4 px-1" />
            <button className="border w-6">+</button>
          </div>
        </div> */}
        <div
          className="flex justify-center gap-1 mx-16 h-max p-1 px-2 rounded bg-[#af3a3a] text-white hover:cursor-pointer hover:bg-[#791f1f] transition-colors duration-200"
          onClick={handleClick}
        >
          <h3 className="">Eliminar</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-6 h-6 hover:rotate-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
