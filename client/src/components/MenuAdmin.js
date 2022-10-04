import { Link } from "react-router-dom"
import NavBar from "./NavBar"

export default function NavAdmin() {
    return (
        <div className="">
            <NavBar/>
            <div className="text-6xl flex justify-center mt-5">
                MENU ADMINISTRADOR
            </div>

            <div className="flex justify-end">
                <div>
                    NOMBRE
                </div>
            </div>

            <div className="text-3xl mt-20">
                <Link to="/adminuser">
                    <div className="flex justify-center">
                        Administrar Usuarios
                    </div>
                </Link>

                <Link to="/createbook">
                    <div className="flex justify-center">
                        Crear Libros
                    </div>
                </Link>

                <Link>
                    <div className="flex justify-center">
                        Crear Categorias
                    </div>
                </Link>

                <Link>
                    <div className="flex justify-center">
                        Editar Carrusel
                    </div>
                </Link>

                <Link>
                    <div className="flex justify-center">
                        Editar Libros
                    </div>
                </Link>

                <Link>
                    <div className="flex justify-center">
                        Eliminar Libros
                    </div>
                </Link>
            </div>
        </div>
    )
}