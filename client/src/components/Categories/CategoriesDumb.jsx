import React from "react";
import { Link } from "react-router-dom";

export default function CategoryBook({ name, imageLinks, id }) {
  return (
    <div className="m-5 hover:text-[#1f1f4b]">
      <Link to={`/categories/${name}`}>
        <div className="w-40 h-36 md:w-64 md:h-64">
          <img
            src={imageLinks}
            alt="category-img"
            className="h-36 md:h-64 w-full rounded-t-lg hover:opacity-50"
          />
        </div>
        <h2 className="flex justify-center text-base sm:text-lg md:text-xl font-bold rounded-b-lg bg-white textWraper">
          {name.toUpperCase()}
        </h2>
      </Link>
    </div>
  );
}
