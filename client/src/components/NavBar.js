import { Link } from "react-router-dom"
import SearchBar from "./SearchBar";

export default function NavBar() {
    return (
        <div className="bg-NavBar text-2xl text-white flex justify-between items-center px-7 py-3">
            <div>
                <h6 className="text-5xl">LIBRERIA</h6>
            </div>

            <div>
                <SearchBar />
            </div>

            <div className="">
                <Link to="/" className="mx-3 cursor-pointer hover:text-hoverMenu">
                    INICIO
                </Link>

                <Link to="/categories" className="mx-3 cursor-pointer hover:text-hoverMenu">
                    CATEGORIAS
                </Link>

                <Link to="/createbook" className="mx-3 cursor-pointer hover:text-hoverMenu">
                    ADMINISTRAR
                </Link>
            </div>
        </div>
    )
}


/* 
                <Link to="/favorites" className="mx-3 cursor-pointer hover:text-hoverMenu">
                    FAVORITOS
                </Link>


                            <div >
                <Link to="/auth" className="mx-3 cursor-pointer hover:text-hoverMenu">
                    INICIAR SESIÓN
                </Link>

                <Link to="/basket" className="mx-3 cursor-pointer hover:text-hoverMenu">
                    COMPRAS
                </Link>
            </div>
*/