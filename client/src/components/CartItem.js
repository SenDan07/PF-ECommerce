import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/actions";

export default function CartItem({ book }) {
    const dispatch=useDispatch()

    const cantidad=[]
    for(let i=1;i<=book.stock;i++){
        cantidad[i]=i
    }
    
    //Elimina libro
    function handleClick(e){
        
        let cart=JSON.parse(localStorage.getItem("bookDetail"))
        
        cart=cart.filter((c)=>{
            return c.id!==book.id
        })
        alert("se Elimina Libro")
        dispatch(addCart(cart))
        cart=JSON.stringify(cart)
        localStorage.setItem("bookDetail",cart)          
    }

    function handleSelect(e){
       
        let cart=JSON.parse(localStorage.getItem("bookDetail"))
       
        let item=cart.find((c)=>{
            return c.id==book.id
        })
        item.quantity=e.target.value
        dispatch(addCart(cart))
        cart=JSON.stringify(cart)
        localStorage.setItem("bookDetail",cart)
    }

    return <div className="flex flex-row m-5">
        <div className="mb-1 relative hover:rotate-1">
            <Link to={`/books/${book.id}`}>
                <img
                    src={book.imageLinks}
                    alt={`img-${book.title}`}
                    className="w-96 h-80 rounded rounded-tr-xl sombra"
                />
            </Link>
        </div>
        <div className="flex flex-col justify-center m-10">
            <h2 className="font-medium text-center text-[22px]">
                {book.title}
            </h2>

            <div>
                <h3 className="text-center text-xl font-bold text-black">
                    <span className="font-medium text-white">Price: </span>$
                    {book.price}
                </h3>
            </div>
        </div>
        <div className="flex flex-col justify-center m-20">
            <span>Cantidad:<select onChange={(e)=>handleSelect(e)} value={cantidad<=book.quantity?book.quantity:cantidad} >
           
                {cantidad.map((i, idx)=>{
                    return <option key={idx} value={i}>{i}</option>
                })                  
                }      
            </select></span>
        </div>
        <div className="flex flex-col justify-center m-20">
           <button onClick={handleClick}>Eliminar</button> 
        </div>
    </div>
};