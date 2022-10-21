import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../redux/actions";
import CategoriesDumb from "./CategoriesDumb";
import NavBar from "../NavBar/NavBar";

export default function CategoriesBooks() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const category = useSelector((state) => state.categories);

  return (
    <div className="bg-bgHome min-h-screen">
      <NavBar />

      <div className="mb-20 text-7xl font-medium mt-10 text-[#14143a]">
        <h5 className="flex justify-center">CATEGORIAS</h5>
      </div>

      <div className="flex flex-wrap justify-center ">
        {category &&
          category
            .filter((c) => {
              return c.activado === true;
            })
            .map((e) => {
              return (
                <CategoriesDumb
                  name={e.name}
                  imageLinks={e.imageLinks}
                  key={e.id}
                />
              );
            })}
      </div>
    </div>
  );
}
