import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { searchAuthor } from "../../../redux/actions";
import { resetDeleteBooks, searchBook } from "../../../redux/actions";

export default function SearchBar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  let dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();
    if (search.trim() === "" || search.length < 3) {
      alert("Debe completar el Nombre del libro/autor");
    } else {
      dispatch(resetDeleteBooks());
      dispatch(searchBook(search));
      setSearch("");
      navigate("/searchbar");
    }
  }
  function onInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }
  return (
    <div className="text-white w-4/5">
      <form
        onSubmit={onSubmit}
        className="flex items-center rounded border border-[#444] w-[85%] m-auto md:w-[200px] lg:w-[250px] justify-between"
      >
        <div className="w-[95%] md:w-[160px]">
          <input
            className="text-xl py-1 pl-2 rounded bg-[#2e2f33] text-white outline-none italic w-full md:w-[160px] lg:w-[210px]"
            type="text"
            onChange={onInputChange}
            name="search"
            value={search}
            placeholder="Titulo o Autor"
          />
        </div>

        <div className="hover:cursor-pointer duration-200 rounded-r bg-[#212] px-2 w-[40px] hover:bg-[#000000]">
          <button
            type="submit"
            className="hover:rotate-[-15deg] transition-transform duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 p-1 pb-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
