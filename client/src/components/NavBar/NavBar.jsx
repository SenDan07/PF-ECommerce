import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { logoutUser, addCart } from "../../redux/actions";
import SearchBar from "../Search/SearchBar/SearchBar";
import donQuijote from "../img/gitbooks.png";
import DropdownComponent from "../DropdownUser/DropdownUser";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const LOGIN = useSelector((state) => state.login);
  const ROLE = useSelector((state) => state.role);
  // const USER = useSelector((state) => state.user);

  let cart_User = useSelector((state) => state.cart);

  cart_User = JSON.parse(localStorage.getItem("bookDetail"))
    ? JSON.parse(localStorage.getItem("bookDetail")).length
      ? JSON.parse(localStorage.getItem("bookDetail"))
      : cart_User
    : [];

  localStorage.setItem("bookDetail", JSON.stringify(cart_User));
  return (
    <div>
      <nav className="bg-NavBar py-2">
        <div className="mx-auto sm:px-3 md:px-0 w-[95%] lg:w-[85%]">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center w-full justify-between">
              <div className="flex items-center text-white gap-5 text-lg">
                <div className="">
                  <img
                    src={donQuijote}
                    alt="Don Quijote"
                    className="w-[90px] h-[50px] sm:w-[100px] sm:h-[60px] lg:w-[120px] lg:h-[70px] pl-2 md:pl-0"
                  />
                </div>
                <div>
                  <Link
                    to="/"
                    className="mx-3 cursor-pointer hover:text-hoverMenu transition-colors duration-200 hidden md:inline text-base lg:text-lg"
                  >
                    INICIO
                  </Link>

                  <Link
                    to="/categories"
                    className="mx-3 cursor-pointer hover:text-hoverMenu transition-colors duration-200 hidden md:inline text-base lg:text-lg"
                  >
                    LIBROS
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <SearchBar />
              </div>
              <div className="">
                <div className="mx-3 lg:ml-10 space-x-4 text-white hidden sm:flex items-center">
                  <div>
                    {LOGIN === 1 && ROLE === "ADMIN" ? null : (
                      <Link
                        to={cart_User.length ? "/car" : "/"}
                        className="text-xl text-[#888888] flex items-center gap-2 border border-[#444] rounded pl-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5 text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                          />
                        </svg>

                        <span className="bg-black px-2 py-1 rounded text-base">
                          {cart_User.length}
                        </span>
                      </Link>
                    )}
                  </div>
                  <div className="hidden md:flex items-center">
                    {LOGIN === 1 && ROLE === "USER" ? null : LOGIN === 1 &&
                      ROLE === "ADMIN" ? (
                      <div className="mx-3 font-bold text-[#adad28]">ADMIN</div>
                    ) : null}

                    {(LOGIN === 0 || LOGIN.length === 0) && ROLE === "" ? (
                      <div>
                        <div className="ml-2 flex gap-4">
                          <Link to="/login">
                            <h4 className="cursor-pointer hover:text-hoverMenu transition-colors duration-200 text-base lg:text-lg">
                              LOGIN
                            </h4>
                          </Link>

                          <Link to="/register">
                            <h4 className="cursor-pointer hover:text-hoverMenu transition-colors duration-200 text-base lg:text-lg">
                              REGISTRARSE
                            </h4>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <DropdownComponent />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden text-white">
              {LOGIN === 1 ? (
                <div>
                  <DropdownComponent />
                </div>
              ) : null}
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="mx-4 bg-[#222222a2] p-2 px-3 rounded hover:bg-[#070b0f85] transition-colors duration-200"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          className="md:hidden"
        >
          <div className="lg:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <div className="flex justify-center items-center">
                <SearchBar />
                {LOGIN === 1 && ROLE === "ADMIN" ? null : (
                  <Link
                    to={cart_User.length ? "/car" : "/"}
                    className="text-xl text-[#888888] flex items-center gap-2 border border-[#555] rounded pl-2 sm:hidden w-max mx-auto mt-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>

                    <span className="bg-black px-2 py-1 rounded text-base">
                      {cart_User.length}
                    </span>
                  </Link>
                )}
              </div>
              <Link
                to="/"
                className="cursor-pointer hover:text-hoverMenu transition-colors duration-200 block text-center text-white font-bold"
              >
                INICIO
              </Link>

              <Link
                to="/categories"
                className="cursor-pointer hover:text-hoverMenu transition-colors duration-200 block text-center text-white font-bold"
              >
                LIBROS
              </Link>

              {(LOGIN === 0 || LOGIN.length === 0) && ROLE === "" ? (
                <div className="flex flex-col items-center text-white font-bold">
                  <Link to="/login">
                    <h4 className="cursor-pointer hover:text-hoverMenu transition-colors duration-200 text-base lg:text-lg text-center">
                      LOGIN
                    </h4>
                  </Link>

                  <Link to="/register">
                    <h4 className="cursor-pointer hover:text-hoverMenu transition-colors duration-200 text-base lg:text-lg text-center">
                      REGISTRARSE
                    </h4>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </Transition>
      </nav>
    </div>
  );
}
