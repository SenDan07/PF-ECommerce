import React from "react";
import { Link } from "react-router-dom";

export const Book = ({ name, image, price, id }) => {
  return (
    <div>
      <div>
        <h2 className="font-medium text-center text-[22px]">
          {name.length > 19 ? `${name.slice(0, 18)}...` : name}
        </h2>
      </div>
      <div className="mb-1">
        <Link to={`/books/${id}`}>
          <img
            src={image}
            alt={`img-${name}`}
            className="w-[200px] h-[300px] rounded sombra hover:rotate-3"
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
