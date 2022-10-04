import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { searchAuthor } from "../redux/actions";
import { searchBook } from "../redux/actions";

export default function SearchBar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  let dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();
    if (search.trim() === "" || search.length < 3) {
      alert("Debe completar el Nombre del libro/autor");
    } else {
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
    <div className="text-white">
      <form
        onSubmit={onSubmit}
        className="flex items-center rounded-full pr-3 bg-[#222] pb-[1.5px]"
      >
        <div>
          <input
            className="text-lg py-1 rounded-full bg-bgSearch text-white outline-none pl-3 italic"
            type="text"
            onChange={onInputChange}
            name="search"
            value={search}
            placeholder="Titulo o Autor"
          />
        </div>

        <div type="submit" className="hover:cursor-pointer ml-1">
          <input
            className="text-lg hover:cursor-pointer hover:rotate-12"
            type="submit"
            value="&#128269;"
          />
        </div>
      </form>
    </div>
  );
}
