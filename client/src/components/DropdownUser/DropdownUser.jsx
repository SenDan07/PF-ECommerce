import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, addCart } from "../../redux/actions";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

export default function DropdownComponent() {
  const USER = useSelector((state) => state.user);
  const LOGIN = useSelector((state) => state.login);
  const ROLE = useSelector((state) => state.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let cart_User = useSelector((state) => state.cart);

  cart_User = JSON.parse(localStorage.getItem("bookDetail"))
    ? JSON.parse(localStorage.getItem("bookDetail")).length
      ? JSON.parse(localStorage.getItem("bookDetail"))
      : cart_User
    : [];
  // console.log(cart_User);

  localStorage.setItem("bookDetail", JSON.stringify(cart_User));

  async function logout() {
    // alert("Ingrese a cerrar sesion")
    await dispatch(logoutUser());
    //Eliminas el Cart
    localStorage.setItem("bookDetail", JSON.stringify([]));
    await dispatch(addCart([]));
    navigate("/");
  }

  function handleClick(e) {
    navigate(`/user/edit/${USER.id}`);
  }

  console.log(USER.picture[USER.picture.length - 1]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-[#162531]  rounded shadow-sm hover:bg-gray-50 p-1 flex items-center gap-3">
          <img
            src={
              USER.picture
                ? `${USER.picture}`
                : `https://res.cloudinary.com/dzcpdipdg/image/upload/v1665265607/samples/icons/img-perfil-default_krpmpp.jpg`
            }
            alt="img-user"
            className="w-10 h-10 rounded"
          />
          {USER.name}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 ml-2 -mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-[#162531] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            <div onClick={handleClick}>
              <Menu.Item>
                <Link
                  to="#"
                  className="px-4 py-2 text-base hover:bg-[#555] transition-colors duration-200 flex justify-between"
                >
                  Configurar Cuenta
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
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </Link>
              </Menu.Item>
            </div>
            {LOGIN === 1 && ROLE === "USER" ? (
              <div>
                {/* <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/favorites"
                      className="px-4 py-2 text-base hover:bg-[#555] transition-colors duration-200 flex justify-between"
                    >
                      Favoritos
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
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </Link>
                  )}
                </Menu.Item> */}
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to={`/historyorder/${USER.iduser}`}
                      className="px-4 py-2 text-base hover:bg-[#555] transition-colors duration-200 flex justify-between"
                    >
                      Pedidos
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
                          d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                        />
                      </svg>
                    </Link>
                  )}
                </Menu.Item>
              </div>
            ) : (
              <div>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/admin"
                      className="px-4 py-2 text-base hover:bg-[#555] transition-colors duration-200 flex justify-between"
                    >
                      ADMINISTRAR
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
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </Link>
                  )}
                </Menu.Item>
              </div>
            )}

            <div className="hover:cursor-pointer">
              <Menu.Item>
                {({ active }) => (
                  <div
                    className="px-4 py-2 text-base hover:bg-[#555] transition-colors duration-200 flex justify-between"
                    onClick={() => logout()}
                  >
                    Cerrar Sesión
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
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                      />
                    </svg>
                  </div>
                )}
              </Menu.Item>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
