import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Book = ({ name, image, price, id }) => {
  const LOGIN = useSelector((state) => state.login);
  const ROLE = useSelector((state) => state.role);
  const USER = useSelector((state) => state.user);

  const handleFavorites = (id) => {
    let prueba = document.getElementById(id);
    let favorito = prueba.getAttribute("favorite");
    if (favorito === "false") {
      prueba.setAttribute("favorite", "true");
      prueba.setAttribute("fill", "#ffff00");
    } else {
      prueba.setAttribute("favorite", "false");
      prueba.setAttribute("fill", "#ffffff");
    }

    console.log(
      `Book ${id} Favorite: ${prueba.getAttribute("favorite")}, userId: ${
        USER.iduser
      }`
    );
  };

  // useEffect(() => {
  //   let prueba = document.getElementById(id);
  //   prueba.setAttribute("fill", "#ffffff");
  // }, [LOGIN]);

  return (
    <div>
      <div className="">
        <div>
          <h2 className="font-medium text-center text-[22px]">
            {name.length > 11 ? `${name.slice(0, 11)}...` : name}
          </h2>
        </div>
      </div>
      <div className="mb-1 relative hover:rotate-1">
        {LOGIN === 1 && ROLE === "USER" ? (
          <div className="absolute right-0 bg-[#555] z-10 rounded-bl-xl rounded-tr-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#ffffff"
              viewBox="0 0 24 24"
              strokeWidth={0.5}
              stroke="currentColor"
              className="w-7 h-7 hover:cursor-pointer"
              onClick={
                LOGIN === 1 && ROLE === "USER"
                  ? () => handleFavorites(id)
                  : null
              }
              id={id}
              favorite="false"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </div>
        ) : null}
        <Link to={`/books/${id}`}>
          <img
            src={image}
            alt={`img-${name}`}
            className="w-[200px] h-[300px] rounded rounded-tr-xl sombra"
          />
        </Link>
      </div>
      <div>
        <h3 className="text-center text-xl font-bold text-black">
          <span className="font-medium text-white">Price: </span>$
          {price.toFixed(2)}
        </h3>
      </div>
    </div>
  );
};
