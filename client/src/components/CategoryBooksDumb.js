import React from "react";
import { Link } from "react-router-dom";

export default function CategoryBook({ title, imageLinks, price, id }) {
    console.log("title: ", title)
    return (
        <div className="m-5 ">
            <Link to={`/books/${id}`} >
                <h2 className="randomName text-center text-[22px]">
                    {title.length > 19 ? `${title.slice(0, 18)}...` : title}
                </h2>

                <div className="w-64 h-64">
                    <img src={imageLinks} alt={`img-${title}`} className="h-80 w-64 rounded" />
                </div>

                <h3 className="text-center text-lg font-bold flex mt-16 justify-center">
                    <span className="font-medium  ">Price: </span>${price.toFixed(2)}
                </h3>
            </Link>
        </div>
    );
}; 