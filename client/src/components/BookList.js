import React, { useEffect } from "react";
import { Book } from "./Book";
import { getBooks } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function BookList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  let booksData = useSelector((state) => state.books);
  // booksData = booksData.slice(0, 10);

  return (
    <div class="mt-10" className="contenedor">
      <h2 class="text-center text-2xl font-medium">Mas Populares</h2>
      <div class="flex flex-wrap justify-center gap-20 p-8">
        {booksData.length ? (
          booksData.map((book) => {
            return (
              <Link to={`/${book.id}`}>
                <Book
                  key={book.id}
                  name={book.title}
                  image={book.bookImage}
                  price={book.price}
                />
              </Link>
            );
          })
        ) : (
          <div>
            <img
              src="https://masrosas.cl/wp-content/themes/mipro/assets/images/loading.gif"
              alt="loading-img"
            />
            <div>
              <h3 class="text-center">Loading...</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
