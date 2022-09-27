import { Link } from "react-router-dom"

export default function NavBar() {
    return (
        <div className="bg-NavBar text-2xl text-white flex justify-between items-center px-7 py-3">
            <div>
                <h6 className="text-5xl">LIBRERIA</h6>
            </div>

            <div className="">
                <Link to="/" className="mx-7 cursor-pointer">
                    INICIO
                </Link>

                <Link to="/categories" className="mx-7 cursor-pointer">
                    CATEGORIAS
                </Link>

                <Link to="/favorites" className="mx-7 cursor-pointer">
                    FAVORITOS
                </Link>

            </div>

            <div >
                <Link to="/auth" className="mx-7 cursor-pointer">
                    INICIAR SESIÓN
                </Link>

                <Link to="/basket" className="mx-7 cursor-pointer">
                    COMPRAS
                </Link>
            </div>
        </div>
    )
}