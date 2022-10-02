import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { categoryBooks } from "../redux/actions";
import CategoryBooksDumb from "./CategoryBooksDumb";
import NavBar from "./NavBar";

export default function CategoriesBooks() {
  const dispatch = useDispatch();
  let { category } = useParams();
  useEffect(() => {
    dispatch(categoryBooks(category));
  }, [dispatch]);

  const booksFilter = useSelector((state) => state.books);
  console.log("booksFilter: ", booksFilter);
  return (
    <div className="bg-bgHome min-h-screen">
      <NavBar />

      <div className="w-max m-auto">
        <Link to="/categories">
          <h3 className="border-1 border-rose-500 rounded w-max mx-auto mt-12 px-3 py-2 bg-button text-white">
            &#129044; Regresar
          </h3>
        </Link>
      </div>

      <div className="mb-20 text-8xl">
        <h5 className="flex justify-center">LIBROS</h5>
      </div>

      <div className="flex flex-wrap justify-center ">
        {console.log("antes del map")}
        {booksFilter &&
          booksFilter?.map((e) => {
            console.log("despues del map");
            return (
              <CategoryBooksDumb
                title={e.title}
                imageLinks={e.imageLinks}
                price={e.price}
                key={e.id}
                id={e.id}
              />
            );
          })}
      </div>
    </div>
  );
}
