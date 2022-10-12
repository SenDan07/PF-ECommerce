import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBooks } from "../redux/actions"
import DeleteBooksDumb from "./DeleteBooksDumb";
import OrderDeleteBooks from "./OrderDeleteBooks";
import SearchDeleteBooks from "./SearchDeleteBooks"
import ResetDeleteBooks from "./ResetDeleteBooks"
import FilterDisponibility from "./FilterDisponibility";

export default function DeleteBooksSmart() {
    const dispatch = useDispatch();
    useEffect(() => { dispatch(getBooks()); }, []);
    const allBoks = useSelector((state) => state.booksDeleteAdminFilter)
    return (
        <div>
            <div className="flex justify-start">
                <Link to="/admin">
                    <h3 className="border-1 border-rose-500 rounded mx-auto px-5 py-2 bg-button text-black hover:text-white mt-5 mx-10">
                        &#129044; Regresar
                    </h3>
                </Link>
            </div>

            <div className="flex justify-center text-5xl mb-10">
                <h5 className="">ESTADO DE LOS LIBROS</h5>
            </div>

            <div className="flex justify-center gap-5">
                <OrderDeleteBooks />
                <SearchDeleteBooks />
                <FilterDisponibility/>
                <ResetDeleteBooks />
            </div>

            <div className="border flex mx-32 bg-black text-white mt-10">
                <div className="border w-2/4">
                    <h3 className="text-center text-2xl">TITULO</h3>
                </div>

                <div className="border w-1/4">
                    <h3 className="text-center text-2xl">AUTORES</h3>
                </div>

                <div className="w-1/4 flex">
                    <div className="border w-1/2">
                        <h3 className="text-center text-2xl">ESTADO</h3>
                    </div>

                    <div className="border w-1/2">
                        <h3 className="text-center text-2xl">ACCION</h3>
                    </div>
                </div>


            </div>
            <div className="mb-3 mx-32">
                {allBoks.map((e) => {
                    return (
                        <DeleteBooksDumb
                            title={e.title}
                            activado={e.activado}
                            key={e.id}
                            idBook={e.id} 
                            author={e.authors}/>
                    )
                })}
            </div>
        </div>
    )
}


/* 
            <div className="border flex mx-32 bg-black text-white mt-10">
                <div className="border w-3/4">
                    <h3 className="text-center text-2xl">TITULO</h3>
                </div>
                <div className="w-1/4 flex">
                    <div className="border w-1/2">
                        <h3 className="text-center text-2xl">ESTADO</h3>
                    </div>

                    <div className="border w-1/2">
                        <h3 className="text-center text-2xl">ACCION</h3>
                    </div>
                </div>
*/