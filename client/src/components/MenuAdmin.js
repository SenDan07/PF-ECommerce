import { Link } from "react-router-dom"
import NavBar from "./NavBar"

export default function NavAdmin() {
    return (
        <div className="justify-self-center">
            <NavBar />

            <div className="text-6xl flex justify-center mt-5">
                MENU ADMINISTRADOR
            </div>

            <div className="flex justify-center">
                <div className="text-xl">
                    BIENVENIDO NOMBRE
                </div>
            </div>

            <div className="text-4xl mt-20">
                <div className="mb-10 flex justify-center">
                    <div className="cursor-pointer hover:text-white">
                        <Link to="/adminuser">
                            Administrar Usuarios
                        </Link>
                    </div>
                </div>

                <div className="mb-10 flex justify-center">
                    <Link to="/createbook">
                        <div className="cursor-pointer hover:text-white">
                            Crear Libros
                        </div>
                    </Link>
                </div>

                <div className="mb-10 flex justify-center">
                    <Link>
                        <div className="cursor-pointer hover:text-white">
                            Crear Categorias
                        </div>
                    </Link>
                </div>

                <div className="mb-10 flex justify-center">
                    <Link>
                        <div className="cursor-pointer hover:text-white">
                            Editar Carrusel
                        </div>
                    </Link>
                </div>

                <div className="mb-10 flex justify-center">
                    <Link>
                        <div className="cursor-pointer hover:text-white">
                            Editar Libros
                        </div>
                    </Link>
                </div>

                <div className="mb-10 flex justify-center">
                    <Link>
                        <div className="cursor-pointer hover:text-white ">
                            Eliminar Libros
                        </div>
                    </Link>
                </div>
            </div>

        </div>
    )
}