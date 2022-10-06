import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../redux/actions";

export const ManageUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const deleteUserId = (idUser) => {
    dispatch(deleteUser(idUser));
  };

  let data = { isActive: "true" };

  const restablecerUser = (idUser) => {
    dispatch(deleteUser(idUser, data));
  };

  const activeUsers = useSelector((state) => state.users);
  const inactiveUsers = useSelector((state) => state.inactiveUsers);

  return (
    <div>
      <div className="mb-40">
        <h1 className="text-center text-2xl font-bold mt-10">
          Registro usuarios activos:{" "}
          <span className="font-medium text-white">{activeUsers.length}</span>
        </h1>
        <div className="flex border w-max m-auto mt-10 bg-[#333]">
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
        <div>
          {activeUsers?.map((user, id) => {
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
                  className="border w-40 text-center text-xl font-medium hover:cursor-pointer hover:bg-[#222] hover:text-[#ff0000] hover:font-normal"
                  onClick={() => deleteUserId(user.id)}
                >
                  <h3 className="flex justify-around">
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
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
      </div>
    </div>
  );
};
