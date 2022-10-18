import React from "react";
import { useDispatch } from "react-redux";
import { resetDeleteBooks } from "../redux/actions";

export default function ResetDeleteBooks() {
  let dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(resetDeleteBooks());
  }
  return (
    <div>
      <button
        className="hover:cursor-pointer bg-[#343434] text-white p-2 hover:bg-[#181717] transition-colors duration-200 text-xl rounded"
        onClick={handleClick}
      >
        Todos los Libros
      </button>
    </div>
  );
}
