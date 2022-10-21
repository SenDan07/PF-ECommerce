import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryBooks,
  getAllCategories,
  resetCategoryBooks,
} from "../../redux/actions";
import CategoryBooksDumb from "./CategoryBooksDumb";
import NavBar from "../NavBar/NavBar";
import FilterBar from "../FilterBar/FilterBar";

export default function CategoriesBooks() {
  const dispatch = useDispatch();
  let { category } = useParams();

  useEffect(() => {
    dispatch(categoryBooks(category));
  }, []);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetCategoryBooks());
    };
  }, [dispatch]);

  const booksFilter = useSelector((state) => state.booksByPrice);

  return (
    <div className="bg-bgHome min-h-screen">
      <NavBar />

      <div className="w-full flex justify-between">
        <div className="flex justify-start h-max pt-4 pl-4">
          <Link to="/categories">
            <h3 className="border-1 rounded px-5 py-2 bg-button text-black hover:text-white hover:bg-[#065841] transition-colors duration-500">
              &#129044; Regresar
            </h3>
          </Link>
        </div>

        <FilterBar />
      </div>

      <div className="mb-16 mt-10 font-bold text-5xl font-serif italic">
        <h5 className="flex justify-center underline decoration-NavBar">
          {category}
        </h5>
      </div>
      <div className="flex flex-wrap justify-center gap-10">
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
