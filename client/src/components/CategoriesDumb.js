import React from "react";
import { Link } from "react-router-dom";

export default function CategoryBook({ name, imageLinks, id }) {
  return (
    <div className="m-5 hover:text-white">
      <Link to={`/categories/${name}`} >
        <div className="w-64 h-64">
          <img src={imageLinks} alt="IMAGE NOT FOUND" className="object-fill h-64 w-full rounded-lg hover:opacity-50" />
        </div>
        <h2 className="flex justify-center text-xl">{name}</h2>
      </Link>
    </div>
  );
};


/* 
      <h1 class="text-center text-5xl mt-10">Categorias</h1>

      <Link to="/">
        <h3 class="border-1 border-rose-500 rounded w-max mx-auto mt-12 px-3 py-2 bg-button text-white">
          &#129044; Regresar
        </h3>
      </Link>

      <div class="flex justify-center">
        <img
          src="https://cdn.pixabay.com/photo/2017/06/20/08/12/maintenance-2422173_960_720.png"
          alt="img-construction"
          width="700px"
        />
      </div>


<h1 class="text-green-600 text-5xl font-bold">
        GeeksforGeeks
    </h1> 
    <b>Tailwind CSS object Class</b> 
    <div class="bg-green-300 w-full h-full">
    <img class="object-contain h-48 w-full" 
         src=
"https://media.geeksforgeeks.org/wp-content/uploads/20190807114330/GFG115.png"> 



<h1 class="text-green-600 text-5xl font-bold">
        GeeksforGeeks
    </h1> 
    <b>Tailwind CSS object Class</b> 
    <div class="bg-green-300 w-full h-full">
    <img class="object-fill h-48 w-full" 
         src=
"https://media.geeksforgeeks.org/wp-content/uploads/20190807114330/GFG115.png">    
  

*/
