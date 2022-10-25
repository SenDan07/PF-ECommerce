import { useSelector } from "react-redux";
import { Book } from "../../Book/Book";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetDeleteBooks } from "../../../redux/actions";
import NavBar from "../../NavBar/NavBar";

export default function SearchBarSmart() {
  const busqueda = useSelector((state) => state.booksBySearch);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(resetDeleteBooks());
    };
  }, []);
  return (
    <div>
      <NavBar />
      <div
        className="flex justify-start h-max mt-4 ml-3 text-xs font-bold md:text-lg md:font-medium hover:cursor-pointer w-max"
        onClick={() => navigate("/")}
      >
        <h3 className="border-1 rounded px-3 py-3 md:py-2 bg-button  text-white hover:bg-[#065841] transition-colors duration-500">
          &#129044; Regresar
        </h3>
      </div>
      <h2 className="text-center text-xl md:text-3xl pt-10">
        Resultados de la búsqueda {/*deberia mostrar el cards*/}
      </h2>
      <div className="w-[85%] m-auto border-1 border-black-500 flex flex-wrap gap-10 md:gap-20 lg:gap-36 justify-center mt-10 md:mt-32 pb-10 md:pb-20">
        {busqueda.length ? (
          busqueda.map((book) => {
            return (
              <div key={book.id}>
                <Book
                  name={book.title}
                  image={book.imageLinks}
                  price={book.price}
                  id={book.id}
                />
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center gap-5">
            <p className="text-xl text-center">No se encontraron Resultados</p>
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
