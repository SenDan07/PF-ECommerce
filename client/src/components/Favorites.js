import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBooks } from "../redux/actions";
import { Book } from "./Book";
import NavBar from "./NavBar";

const Favorites = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  const books = useSelector((state) => state.books).slice(30, 40);

  return (
    <div>
      <NavBar/>
      <div className="w-max">
        <Link to="/">
          <h3 className="border-1 border-rose-500 rounded ml-10 mt-8 px-3 py-2 w-max bg-button text-white">
            &#129044; Regresar
          </h3>
        </Link>
      </div>

      <div className="flex justify-center items-center">
        <div className="h-min">
          <h1 className="text-center text-5xl mt-3 font-serif italic">
            Favoritos
          </h1>
        </div>
        <div className="h-[max-content] w-max mt-4 ml-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#ffff00"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </div>
      </div>

      {/* <div class="flex justify-center">
        <img
          src="https://cdn.pixabay.com/photo/2017/06/20/08/12/maintenance-2422173_960_720.png"
          alt="img-construction"
          width="700px"
        />
      </div> */}

      <div className="flex flex-wrap justify-center gap-20 p-8">
        {books.length ? (
          books.map((book) => {
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
};

export default Favorites;
