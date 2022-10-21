import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBooks } from "../../redux/actions";
import DeleteBooksDumb from "./DeleteBooksDumb";
import OrderDeleteBooks from "../Order/OrderDeleteBooks";
import SearchDeleteBooks from "../Search/SearchDeleteBooks/SearchDeleteBooks";
import ResetDeleteBooks from "../Reset/ResetDeleteBooks/ResetDeleteBooks";
import FilterDisponibility from "../FilterDisponibility/FilterDisponibility";
import NavBar from "../NavBar/NavBar";
import Menu from "../MenuAdmin/Menu";

export default function DeleteBooksSmart() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBooks());
  }, []);
  const allBoks = useSelector((state) => state.booksDeleteAdminFilter);

  return (
    <div>
      <NavBar />
      <Menu />

      <div className="flex justify-center">
        <Link to="/createbook">
          <h3 className="border-1 border-rose-500 bg-blueOscuro hover:bg-bluemasoscuro rounded mx-auto px-5 py-2  text-white hover:text-white mb-5 transition-colors duration-200">
            Agregar Libro
          </h3>
        </Link>
      </div>
      <div className="flex justify-center gap-5">
        <OrderDeleteBooks />
        <SearchDeleteBooks />
        <FilterDisponibility />
        <ResetDeleteBooks />
      </div>

      <div className="flex mx-32 bg-[#333] text-white mt-10 rounded-t  p-1">
        <div className="w-2/4">
          <h3 className="text-center text-2xl">Titulo</h3>
        </div>

        <div className="w-1/4">
          <h3 className="text-center text-2xl">Autores</h3>
        </div>

        <div className="w-1/4 flex">
          <div className="w-1/2">
            <h3 className="text-center text-2xl">Estado</h3>
          </div>

          <div className="w-1/2">
            <h3 className="text-center text-xl">Eliminar | Editar</h3>
          </div>
        </div>
      </div>

      <div className="mb-5 mx-32">
        {allBoks.map((e) => {
          return (
            <DeleteBooksDumb
              title={e.title}
              activado={e.activado}
              key={e.id}
              idBook={e.id}
              author={e.authors}
            />
          );
        })}
      </div>
    </div>
  );
}
