import React, { useEffect } from "react";
import { Book } from "./Book";
import { getBooks, getAllCategories } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function BookList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getBooks());
  }, []);

  let booksData = useSelector((state) => state.books.slice(0, 10));

  return (
    <div className="mt-10 contenedor">
      <h2 className="text-center text-2xl font-medium">Mas Populares</h2>
      <div className="flex flex-wrap justify-center gap-20 p-8">
        {booksData.length ? (
          booksData.map((book) => {
            return (
              <Book
                key={book.id}
                name={book.title}
                image={book.imageLinks}
                price={book.price}
                id={book.id}
              />
            );
          })
        ) : (
          <div>
            <img
              src="https://masrosas.cl/wp-content/themes/mipro/assets/images/loading.gif"
              alt="loading-img"
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
