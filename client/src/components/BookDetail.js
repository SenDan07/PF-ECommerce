import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailBook, resetDetail } from "../redux/actions";
import { useEffect } from "react";
import { addCart } from "../redux/actions";

const BookDetail = () => {
  const dispatch = useDispatch();
  const bookId = useParams().id;

  useEffect(() => {
    dispatch(getDetailBook(bookId));

    return () => {
      dispatch(resetDetail());
    };
  }, []);

  const bookDetail = useSelector((state) => state.detail);
  bookDetail.quantity = 1;

  function handleClick(e) {
    let cart = JSON.parse(localStorage.getItem("bookDetail")) || [];

    let repeatBook = cart.filter((book) => book.id === bookDetail.id);

    if (repeatBook.length) {
      alert("El libro ya está agregado al carrito");
    } else {
      cart.push(bookDetail);
      alert("Libro agregado al carrito");
      dispatch(addCart(cart));
      cart = JSON.stringify(cart);
      localStorage.setItem("bookDetail", cart);
    }
  }

  return (
    <div className="bg-bgHome min-h-screen">
      <div className="pt-5 w-max m-auto">
        <Link to="/">
          <h3 className="border-1 border-rose-500 rounded w-max mx-auto px-3 py-2 bg-button text-white">
            &#129044; Regresar
          </h3>
        </Link>
      </div>
      <div className="w-[60%] m-auto mt-20">
        <div className="flex">
          <div>
            <div>
              <h3 className="text-center text-3xl mb-1 font-medium">
                <span className="text-white font-normal">Precio: </span>$
                {Number(bookDetail.price).toFixed(2)}
              </h3>
            </div>
            <div>
              <img
                src={bookDetail["imageLinks"]}
                alt={`img-${bookDetail["title"]}`}
                className="h-96 w-96 "
              />
            </div>
            <div className="flex mt-2">
              <button
                className="border-1 border-rose-500 rounded w-max mx-auto px-3 py-2 bg-button text-white flex justify-center gap-2 hover:bg-[#025634] transition-colors duration-200"
                onClick={handleClick}
              >
                AGREGAR AL CARRITO
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="w-full">
            <div className="m-auto">
              <h2 className="text-center text-4xl font-bold">
                {bookDetail.title}
              </h2>
            </div>
            <div className="flex justify-center h-full mt-16 ml-5">
              <div className="text-white text-2xl">
                <h3 className="mb-7">AUTOR\ES</h3>
                <h3 className="mb-7">EDITORIAL</h3>
                <h3 className="mb-7">CATEGORÍAS</h3>
                <h3 className="mb-7">ISBN</h3>
              </div>
              <div className="text-2xl font-medium ml-8">
                <h3 className="mb-7 border-1 border-indigo-500/100">
                  {Array(bookDetail.authors).join(", ")}
                </h3>
                <h3 className="mb-7">{bookDetail.publisher}</h3>
                <h3 className="mb-7">
                  {bookDetail.categories?.map((e) => e.name).join(", ")}
                </h3>
                <h3 className="mb-7">{bookDetail.ISBN}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-white text-2xl">Descripción</h3>
          <p className="font-medium text-xl mt-5 pb-20">
            {bookDetail.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
