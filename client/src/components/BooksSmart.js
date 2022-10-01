/* import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getCategoryBooks } from "../redux/actions"
import BooksDumb from "./BooksDumb";
import NavBar from "./NavBar";


export default function CategoriesBooks() {
    const dispatch = useDispatch()
    useEffect(() => { dispatch(getCategoryBooks()) }, [dispatch])

    const booksFilter = useSelector((state => state.booksFilter))
    //console.log("booksFilter: ", booksFilter)
    return (
        <div className="bg-bgHome min-h-screen">
            <NavBar />

            <Link to="/">
                <h3 class="border-1 border-rose-500 rounded w-max mx-auto mt-12 px-3 py-2 bg-button text-white">
                    &#129044; Regresar
                </h3>
            </Link>

            <div className="mb-20 text-8xl">
                <h5 className="flex justify-center">LIBROS</h5>
            </div>

            <div className="flex flex-wrap justify-center ">
                {
                    booksFilter && booksFilter?.map(e => {
                        return (
                            <BooksDumb
                                name={e.name}
                                imageLinks={e.imageLinks}
                                price={e.price} />
                        )
                    })}
            </div>
        </div>
    )
} */