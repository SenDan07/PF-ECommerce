import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryBooks,
  getAllCategories,
  getBooks,
  resetCategoryBooks,
} from "../redux/actions";
import CategoryBooksDumb from "./CategoryBooksDumb";
import NavBar from "./NavBar";
import FilterBar from "./FilterBar";

export default function CategoriesBooks() {
  const dispatch = useDispatch();
  let { category } = useParams();
  useEffect(() => {
    dispatch(categoryBooks(category));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  //useEffect(() => { dispatch(getBooks()) }, [])

  useEffect(() => {
    return () => {
      dispatch(resetCategoryBooks());
    };
  }, [dispatch]);

  const booksFilter = useSelector((state) => state.booksByPrice);

  // const booksFilter = useSelector((state) => state.books);
  // console.log("booksFilter: ", booksFilter);
  return (
    <div className="bg-bgHome min-h-screen">
      <NavBar />
      <FilterBar />

      <div className="w-[80%] m-auto mt-5">
        <div className="flex justify-center mb-10">
          <Link to="/categories">
            <h3 className="rounded w-max mx-auto px-3 py-2 bg-button text-white">
              &#129044; Regresar
            </h3>
          </Link>
        </div>

        <div className="mb-20 font-bold text-5xl font-serif italic">
          <h5 className="flex justify-center underline decoration-NavBar">
            {category}
          </h5>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-10">
        {console.log("antes del map")}
        {booksFilter.length === 0 ? (
          <h4 className="text-5xl">NO HAY LIBROS EN ESTA CATEGORIA</h4>
        ) : (
          booksFilter.map((e) => {
            return (
              <CategoryBooksDumb
                title={e.title}
                imageLinks={e.imageLinks}
                price={e.price}
                key={e.id}
                id={e.id}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
