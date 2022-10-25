import React, { useEffect } from "react";
import { Book } from "../Book/Book";
import { getBooks, getAllCategories } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function BookList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getBooks());
  }, []);

  let booksData = useSelector((state) => state.booksFilter.slice(46, 56));

  return (
    <div className="mt-20 contenedor">
      <h2 className="text-center text-xl sm:text-2xl md:text-4xl font-bold font-serif italic">
        RECOMENDADOS
      </h2>
      <div className="flex flex-wrap justify-center gap-8 sm:gap-10 md:gap-16 lg:gap-20 p-8">
        {booksData.length ? (
          booksData.map((book) => {
            return (
              <Book
                key={book.id}
                name={book.title}
                image={book.imageLinks}
                price={book.price}
                id={book.id}
                activado={book.activado}
              />
            );
          })
        ) : (
          <div>
            <img
              src="https://res.cloudinary.com/dzcpdipdg/image/upload/v1665789748/samples/loaders/loader-spynner-2-1--unscreen_jrttzf.gif"
              alt="loading-img"
              className="w-[45px] h-[40px] md:w-[75px] md:h-[70px] mx-auto"
            />
            <div>
              <h3 className="text-center">Loading...</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
