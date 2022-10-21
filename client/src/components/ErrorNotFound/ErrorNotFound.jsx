import React from "react";
import { Link } from "react-router-dom";

export const ErrorNotFound = () => {
  return (
    <div className="flex flex-col items-center mt-10">
      <div>
        <img
          src="https://res.cloudinary.com/dzcpdipdg/image/upload/v1665462142/samples/icons/error404notFound_g4kxpq.png"
          alt="img-error-not-found"
        />
        <h3 className="text-2xl text-center mt-5 italic">
          Intenta nuevamente{" "}
          <Link to="/login">
            <span className="text-[#dddddd] hover:cursor-pointer hover:text-[#333333] underline hover:transition-200">
              Iniciando Sesión
            </span>
          </Link>
        </h3>
      </div>
    </div>
  );
};
