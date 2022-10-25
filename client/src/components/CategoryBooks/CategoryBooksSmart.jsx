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
    window.scrollTo(0, 0);
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

      <div className="w-full flex justify-between flex-col-reverse sm:flex-row">
        <div className="flex justify-start h-max mt-4 ml-3 text-xs font-bold md:text-lg md:font-medium hover:cursor-pointer w-max">
          <Link to="/categories">
            <h3 className="border-1 rounded px-3 py-3 md:py-2 bg-button text-white hover:bg-[#065841] transition-colors duration-500">
              &#129044; Regresar
            </h3>
          </Link>
        </div>

        <FilterBar className="items-end" />
      </div>

      <div className="mb-10 mt-10 font-bold font-serif italic">
        <h5 className="flex justify-center underline decoration-NavBar text-center text-3xl sm:text-4xl md:text-5xl">
          {category}
        </h5>
      </div>
      <div className="flex flex-wrap justify-center sm:gap-10">
        {booksFilter?.length ? (
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
        ) : (
          <div className="mt-16">
            {/* <img
              src="https://res.cloudinary.com/dzcpdipdg/image/upload/v1665771569/samples/loaders/normal-loader_yqhauz.gif"
              alt="img-loading-books"
              className="w-[50px]"
            />
            <h2 className="text-center">Loading...</h2> */}
            <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold md:font-medium mt-20">
              NO SE ENCONTRARON LIBROS
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}
