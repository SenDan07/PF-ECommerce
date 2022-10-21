import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, resetUser, getUsers } from "../../redux/actions";
import NavBar from "./NavBar";
import Menu from "./Menu";
import OrderUsers from "./OrderUsers";
import SearchUsers from "./SearchUsers";
import ResetAllUsers from "./ResetAllUsers";
import Swal from "sweetalert2";

export const ManageUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const showAlertError = async () => {
    await Swal.fire({
      icon: "error",
      title: "Oops, Hubo un Error!!",
      footer: "Ocurrió un error al intentar cambiar el estado del usuario",
      color: "#fff",
      background: "#333",
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
  };

  const showLoadingState = async () => {
    Swal.fire({
      title: "Cambiando Estado de Usuario",
      text: "Espere unos segundos",
      timer: 30000,
      background: "#333",
      color: "#fff",
      imageUrl:
        "https://res.cloudinary.com/dzcpdipdg/image/upload/v1665789748/samples/loaders/loader-spynner-2-1--unscreen_jrttzf.gif",
      imageWidth: 90,
      imageHeight: 85,
      showCancelButton: false,
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
    }).then(
      function () {},
      // handling the promise rejection
      function (dismiss) {
        if (dismiss === "timer") {
          //console.log('I was closed by the timer')
        }
      }
    );
  };

  const showAlertDesactive = async () => {
    await Swal.fire({
      position: "center",
      icon: "success",
      title: "Usuario Desactivado Exitosamente!!",
      background: "#333",
      color: "#fff",
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 1800,
    });
  };

  const showAlertReset = async () => {
    await Swal.fire({
      position: "center",
      icon: "success",
      title: "Usuario Reestablecido Exitosamente!!",
      background: "#333",
      color: "#fff",
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 1800,
    });
  };

  const deleteUserId = async (dataUser) => {
    showLoadingState();
    try {
      await dispatch(deleteUser(dataUser));
      showAlertDesactive();
    } catch (error) {
      showAlertError();
    }
  };

  const restablecerUser = async (dataUser) => {
    showLoadingState();
    try {
      await dispatch(resetUser(dataUser));
      showAlertReset();
    } catch (error) {
      showAlertError();
    }
  };

  const activeUsers = useSelector((state) => state.activeUsers);
  const inactiveUsers = useSelector((state) => state.inactiveUsers);

  return (
    <div>
      <NavBar />
      <Menu />
      <div className="flex justify-center gap-5">
        <OrderUsers />
        <SearchUsers />
        <ResetAllUsers />
      </div>

      {/* <div className="flex justify-start">
        <Link to="/admin">
          <h3 className="border-1 border-rose-500 bg-blueOscuro hover:bg-bluemasoscuro rounded mx-auto px-5 py-2 bg-button text-white hover:text-white mt-5 mx-10 transition-colors duration-200">
            Agregar
          </h3>
        </Link>

      </div> */}
      <div className="mb-40">
        <h1 className="text-center text-2xl font-bold mt-10">
          Registro usuarios activos:{" "}
          <span className="font-medium text-white">{activeUsers.length}</span>
        </h1>
        <div className="flex border w-max m-auto mt-10 bg-[#333] rounded-t">
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
                  onClick={() =>
                    deleteUserId({ id: user.id, email: user.email })
                  }
                >
                  <h3 className="flex justify-around">
                    Desactivar{" "}
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
                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
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
                  onClick={() =>
                    restablecerUser({ id: user.id, email: user.email })
                  }
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
