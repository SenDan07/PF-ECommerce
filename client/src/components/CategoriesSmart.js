// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getAllCategories } from "../redux/actions";
import CategoriesDumb from "./CategoriesDumb";
import NavBar from "./NavBar";

export default function CategoriesBooks() {
  //   const dispatch = useDispatch();
  // useEffect(() => { dispatch(getAllCategories()) }, [dispatch])

    const category = useSelector((state => state.categories))
    console.log("category: ", category)
    return (
        <div className="bg-bgHome min-h-screen">
            <NavBar />

      <Link to="/">
        <h3 className="border-1 border-rose-500 rounded w-max mx-auto mt-12 px-3 py-2 bg-button text-white">
          &#129044; Regresar
        </h3>
      </Link>

      <div className="mb-20 text-8xl">
        <h5 className="flex justify-center">CATEGORIAS</h5>
      </div>

            <div className="flex flex-wrap justify-center ">

                {
                    category && category?.map(e => {
                        return (
                            <CategoriesDumb
                                name={e.name}
                                imageLinks={e.imageLinks} 
                                key={e.id}/>
                        )
                    })}
            </div>
        </div>
    )
}