import { useSelector } from "react-redux";
import { Book } from "../Book/Book";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetDeleteBooks } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";

export default function SearchBarSmart() {
  const busqueda = useSelector((state) => state.booksBySearch);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetDeleteBooks());
    };
  }, []);
  return (
    <div>
      <NavBar />
      <h1 className="text-center text-3xl pt-10">
        Resultados de la busqueda {/*deberia mostrar el cards*/}
      </h1>
      <div className="pt-5 w-max m-auto">
        <Link to="/">
          <h3 className="border-1 border-rose-500 rounded w-max mx-auto px-3 py-2 bg-button text-white">
            &#129044; Regresar
          </h3>
        </Link>
      </div>
      <div className="w-[85%] m-auto border-1 border-black-500 flex flex-wrap gap-36 justify-center mt-32 pb-20">
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
          <p className="text-xl">No se encontraron Resultados</p>
        )}
      </div>
    </div>
  );
}
