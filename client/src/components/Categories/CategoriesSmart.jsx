import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../redux/actions";
import CategoriesDumb from "./CategoriesDumb";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";

export default function CategoriesBooks() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllCategories());
  }, [dispatch]);

  const category = useSelector((state) => state.categories);

  return (
    <div className="bg-bgHome min-h-screen">
      <NavBar />
      <div
        className="flex justify-start h-max mt-4 ml-3 text-xs font-bold md:text-lg md:font-medium hover:cursor-pointer w-max"
        onClick={() => navigate("/")}
      >
        <h3 className="border-1 rounded px-3 py-3 md:py-2 bg-button  text-white hover:bg-[#065841] transition-colors duration-500">
          &#129044; Regresar
        </h3>
      </div>

      <div className="mb-10 lg:mb-16 font-medium mt-10 text-[#14143a] w-max mx-auto">
        <h5 className="flex justify-center text-3xl sm:text-4xl md:text-6xl shadow-lg">
          CATEGORIAS
        </h5>
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
