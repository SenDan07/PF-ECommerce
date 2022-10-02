import React from "react";
import { Link } from "react-router-dom";

export const Book = ({ name, image, price, id }) => {
  return (
    <div>
      <div>
        <h2 className="randomName text-center text-[22px]">
          {name.length > 19 ? `${name.slice(0, 18)}...` : name}
        </h2>
      </div>
      <div>
        <Link to={`/books/${id}`}>
          <img src={image} alt={`img-${name}`} className="h-80 w-64 rounded" />
        </Link>
      </div>
      <div>
        <h3 className="text-center text-lg font-bold">
          <span className="font-medium">Price: </span>${price.toFixed(2)}
        </h3>
      </div>
    </div>
  );
};
