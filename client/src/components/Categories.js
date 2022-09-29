import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div>
      <h1 class="text-center text-5xl mt-10">Categorias</h1>

      <Link to="/">
        <h3 class="border-1 border-rose-500 rounded w-max mx-auto mt-12 px-3 py-2 bg-button text-white">
          &#129044; Regresar
        </h3>
      </Link>

      <div class="flex justify-center">
        <img
          src="https://cdn.pixabay.com/photo/2017/06/20/08/12/maintenance-2422173_960_720.png"
          alt="img-construction"
          width="700px"
        />
      </div>
    </div>
  );
};

export default Categories;
