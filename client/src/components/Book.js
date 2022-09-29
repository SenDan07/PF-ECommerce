import React from "react";

export const Book = ({ name, image, price }) => {
  return (
    <div class="">
      <div>
        <h2 className="randomName text-center text-[22px]">
          {name.length > 19 ? `${name.slice(0, 18)}...` : name}
        </h2>
      </div>
      <div>
        <img src={image} alt={`img-${name}`} class="h-80 w-64 rounded" />
      </div>
      <div>
        <h3 class="text-center text-lg font-bold">
          <span class="font-medium">Price: $</span>
          {price}
        </h3>
      </div>
    </div>
  );
};
