import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { Book } from "../Book/Book";

export default function CategoryBook({ title, imageLinks, price, id }) {
  //   console.log("title: ", title);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="m-5 ">
      <Book name={title} image={imageLinks} price={price} id={id} />
    </div>
  );
}
