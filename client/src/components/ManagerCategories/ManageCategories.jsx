import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCategory, getAllCategories } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
import Menu from "../Menu/Menu";

export const ManageCategories = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const deleteCategoryId = async (idCategory) => {
    await dispatch(deleteCategory(idCategory));
    await dispatch(getAllCategories());
  };

  let categories = useSelector((state) => state.categories);

  const sortCategories = (x, y) => {
    if (x.name < y.name) return -1;
    if (x.name > y.name) return 1;

    return 0;
  };

  categories = categories.sort(sortCategories);

  return (
    <div>
      <NavBar />
      <Menu />
      <div className="mb-40">
        <div className="flex justify-center">
          <Link to="/createcategory">
            <h3 className="bg-blueOscuro hover:bg-bluemasoscuro rounded mx-auto px-3 py-2 text-white hover:text-white mt-5 transition-colors duration-200">
              Agregar Categoría
            </h3>
          </Link>
        </div>

        <h1 className="text-center text-2xl font-bold mt-10">
          Registro de Categorias:{" "}
          <span className="font-medium text-white">{categories.length}</span>
        </h1>
        <div className="flex border w-max m-auto mt-10 bg-[#333] rounded-t">
          <div className="border-black w-20 text-center text-white text-xl">
            <h3>Num</h3>
          </div>
          <div className="border-black w-64 text-center text-white text-xl">
            <h3>Categoria</h3>
          </div>
          <div className="border-black w-96 text-center text-white text-xl">
            <h3>Imagen</h3>
          </div>
          <div className="border-black w-64 text-center text-white text-xl">
            <h3>Estado</h3>
          </div>
          <div className="border-black w-40 text-center text-white text-xl">
            <h3>Acciones</h3>
          </div>
        </div>
        <div>
          {categories?.map((category, id) => {
            return (
              <div
                key={id + 1}
                className="flex border w-max m-auto bg-contTable"
              >
                <div className="border w-20 text-center text-xl font-medium">
                  <h3>{id + 1}</h3>
                </div>
                <div className="border w-64 text-center text-xl font-medium">
                  <h3>{category.name}</h3>
                </div>
                <div className="border w-96 text-center text-xl font-medium">
                  <h3>
                    {category.imageLinks.length > 30
                      ? `${category.imageLinks.slice(0, 30)}...`
                      : category.imageLinks}
                  </h3>
                </div>
                <div className="border w-64 text-center text-xl font-medium">
                  <h3
                    className={`${
                      category.activado
                        ? `bg-[#4BA01C] `
                        : `bg-[#ac1313] text-white`
                    }`}
                  >
                    {category.activado ? "Activada" : "Eliminada"}
                  </h3>
                </div>

                <div
                  className="border w-40 text-center text-xl font-medium hover:cursor-pointer hover:font-normal"
                  onClick={() => deleteCategoryId(category.id)}
                >
                  {category.activado ? (
                    <h3 className="flex justify-around hover:bg-[#ac1313] hover:text-[#ffffff] ">
                      Eliminar{" "}
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
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </h3>
                  ) : (
                    <h3 className="flex justify-around hover:bg-[#4BA01C] hover:text-[#000000] font-medium ">
                      Reestablecer{" "}
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
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                    </h3>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/*<div>
                <h1 className="text-center text-2xl font-bold mt-10 text-[#550000]">
                    Registro usuarios inactivos:{" "}
                    <span className="font-medium text-white">{inactiveUsers.length}</span>
                </h1>
                {inactiveUsers.length ? (
                    <div className="flex border w-max m-auto mt-10 bg-[#ff0000]">
                        <div className="border-black w-20 text-center text-white text-xl">
                            <h3>Num</h3>
                        </div>
                        <div className="border-black w-64 text-center text-white text-xl">
                            <h3>Nombre</h3>
                        </div>
                        <div className="border-black w-64 text-center text-white text-xl">
                            <h3>Apellido</h3>
                        </div>
                        <div className="border-black w-64 text-center text-white text-xl">
                            <h3>Email</h3>
                        </div>
                        <div className="border-black w-64 text-center text-white text-xl">
                            <h3>Rol</h3>
                        </div>
                        <div className="border-black w-40 text-center text-white text-xl">
                            <h3>Acción</h3>
                        </div>
                    </div>
                ) : null}
                <div>
                    {inactiveUsers?.map((user, id) => {
                        return (
                            <div
                                key={id + 1}
                                className="flex border w-max m-auto bg-[#999999]"
                            >
                                <div className="border w-20 text-center text-xl font-medium">
                                    <h3>{id + 1}</h3>
                                </div>
                                <div className="border w-64 text-center text-xl font-medium">
                                    <h3>{user.name}</h3>
                                </div>
                                <div className="border w-64 text-center text-xl font-medium">
                                    <h3>{user.lastName}</h3>
                                </div>
                                <div className="border w-64 text-center text-xl font-medium">
                                    <h3>{user.email}</h3>
                                </div>
                                <div className="border w-64 text-center text-xl font-medium">
                                    <h3>{user.role}</h3>
                                </div>
                                <div
                                    className="border w-40 text-center text-xl font-medium hover:cursor-pointer hover:bg-[#222] hover:text-white hover:font-normal"
                                    onClick={() => restablecerUser(user.id)}
                                >
                                    <h3 className="flex justify-around">
                                        Reestablecer
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
                                                d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                                            />
                                        </svg>
                                    </h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
                </div>*/}
    </div>
  );
};
