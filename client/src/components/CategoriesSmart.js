import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllCategories } from "../redux/actions"
import CategoriesDumb from "./CategoriesDumb";


export default function CategoriesBooks() {
    const dispatch = useDispatch()
    useEffect(() => { dispatch(getAllCategories()) }, [dispatch])

    const category = useSelector((state => state.categories))
    return (
        <div className="bg-bgHome">
            <div className="mb-20 text-8xl ">
                <h5 className="flex justify-center">CATEGORIAS</h5>
            </div>
            <div className="flex flex-wrap justify-center">

                {category?.map(e => {
                    return (
                        <CategoriesDumb
                            name={e.name} 
                            image={e.image}/>
                    )
                })}
            </div>
        </div>
    )
}