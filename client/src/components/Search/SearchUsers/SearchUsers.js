import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchUsers } from "../../../redux/actions";


export default function SearchUsers() {
    const [search, setSearch] = useState("");
    let dispatch = useDispatch();
  
    function onSubmit(e) {
      e.preventDefault();
      dispatch(searchUsers(search));
      setSearch("")
    }
    function onInputChange(e) {
      e.preventDefault()
      setSearch(e.target.value);
    }
    return (
      <div className="text-white">
        <form
          onSubmit={onSubmit}
          className="flex items-center rounded bg-[#222] pb-[1.5px]"
          >

          <div>
            <input
              className="text-xl py-1 rounded bg-bgSearch text-white outline-none pl-5 italic w-64"
              type="text"
              onChange={onInputChange}
              name="search"
              value={search}
              placeholder="Nombre, Apellido o Email"
            />
          </div>
  
          <div
            type="submit"
            className="hover:cursor-pointer hover:bg-[#000] duration-200 px-3 rounded"
          >
            <input
              className="text-lg hover:cursor-pointer hover:rotate-12 py-1 rounded"
              type="submit"
              value="&#128269;"
            />
          </div>
        </form>
      </div>
    );
  }