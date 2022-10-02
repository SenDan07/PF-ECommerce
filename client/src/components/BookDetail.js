import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailBook, resetDetail } from "../redux/actions";
import { useEffect } from "react";

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

  return (
    <div className="bg-bgHome min-h-screen">
      <div className="pt-5">
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
            <div>
              <h4 className="text-center text-white w- bg-[#332727] w-11/12 m-auto mt-2 rounded py-1">
                AGREGAR AL CARRITO
              </h4>
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
                <h3 className="mb-7">Sin Categoria</h3>
                <h3 className="mb-7">{bookDetail.ISBN}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-white text-2xl">Descripción</h3>
          <p className="font-medium text-xl mt-5">{bookDetail.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
