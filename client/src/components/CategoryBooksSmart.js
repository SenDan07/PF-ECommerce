import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { categoryBooks, getAllCategories, getBooks, resetCategoryBooks } from "../redux/actions"
import CategoryBooksDumb from "./CategoryBooksDumb";
import NavBar from "./NavBar";
import FilterBar from "./FilterBar"



export default function CategoriesBooks() {
    const dispatch = useDispatch()
    let { category } = useParams()
    useEffect(() => { dispatch(categoryBooks(category)) }, [dispatch])
    useEffect(() => { dispatch(getAllCategories()) }, [dispatch])
    //useEffect(() => { dispatch(getBooks()) }, [])

    useEffect(() => {
        return () => {
            dispatch(resetCategoryBooks());
        };
    }, [dispatch])


    const booksFilter = useSelector((state => state.booksByCategory))

    console.log("booksFilter: ", booksFilter)
    return (
        <div className="bg-bgHome min-h-screen">
            <NavBar />
            <FilterBar/>

            <Link to="/categories">
                <h3 className="border-1 border-rose-500 rounded w-max mx-auto mt-12 px-3 py-2 bg-button text-white">
                    &#129044; Regresar
                </h3>
            </Link>

            <div className="mb-20 text-8xl">
                <h5 className="flex justify-center">{category}</h5>
            </div>

            <div className="flex flex-wrap justify-center ">

                {

                    booksFilter.length === 0 ?
                        (<h4 className="text-5xl">NO HAY LIBROS EN ESTA CATEGORIA</h4>)
                        :
                        (booksFilter.map(e => {

                            return (
                                <CategoryBooksDumb
                                    title={e.title}
                                    imageLinks={e.imageLinks}
                                    price={e.price}
                                    key={e.id}
                                    id={e.id} />
                            )
                        }))



                }
            </div>
        </div>
    )
} 