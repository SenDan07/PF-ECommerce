import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { getAllCategories, postCreateBook, setStatus } from "../redux/actions"


let boton
export function validate(input) {

    let errors = {};
    let expLetras = /^[A-Za-z]+[A-Za-z\s]*[A-Za-z]$/
    let expLetras_Num=/^[A-Za-z0-9]+[A-Za-z0-9\s]*[A-Za-z0-9]$/
    if (!input.title) {
        errors.title = 'Titulo es requerido';
    } else if (!expLetras_Num.test(input.title)) {
        errors.title = 'Titulo es invalido'
    }
    if (!input.authors) {
        errors.authors = 'Autor es requerido';
    } else if (!expLetras.test(input.authors)) {
        errors.authors = 'Autor es invalido'
    }
    if (!input.publisher) {
        errors.publisher = 'Editorial es requerido';
    }else if (!expLetras_Num.test(input.publisher)) {
            errors.publisher = 'Editorial es invalida'
    }
     if (input.ISBN) {
        if (/\D/.test(input.ISBN)) {
            errors.ISBN = "ISBN debe ser numerico"
        }
    }
    if (input.description) {
        if (!expLetras_Num.test(input.description)) {
            errors.description = "Descripcion es invalida"
        }
    }
    if (!input.price) {
        errors.price = 'precio es requerido';
    }
    else if (input.price) {
        if (input.price < 0 || !/^[0-9]+([.][0-9]+)?$/.test(input.price)) {
            errors.price = "Precio no valido"
        }
    }

    return errors;
}

export default function FormBook() {
    const dispatch = useDispatch()
 
    let loading=useSelector(state=>state.loading)
   
    const [input, setInput] = React.useState({
        title:'',//texto
        authors:'',//arreglo
        publisher: '',//texto
        ISBN:'',//integer
        categories: [],//string
        imageLinks: '',//string
        description:'',//string
        price: '',//float
    })
    const [errors, setErrors] = React.useState({});

    const uploadImage= async (e)=>{
        
     try{
        const files=e.target.files
        const data=new FormData()
        data.append('file',files[0])
        data.append('upload_preset',"BooksApi")
        const res=await fetch("https://api.cloudinary.com/v1_1/dl7pi3qek/image/upload",
            {
            method:"POST",
            body:data
            }
        )
        const file=await res.json()
        setInput({
            ...input,
            [e.target.name]:file.secure_url
        })
    }catch(e){
        setErrors({
            ...errors,
            imageLinks:"Imagen no se pudo cargar"
        })
        }       
    
    }

    function handleSubmit(e) {

        e.preventDefault()
        dispatch(postCreateBook(input))
       
        setInput({
            title:'',
            authors: '',
            publisher: '',
            ISBN:'',
            categories: [],
            imageLinks: '',
            description:'',
            price:'',
        })
        e.target.title.focus()
        //  let boton= document.getElementById('enviar')
        boton.disabled = true
        setTimeout(()=>dispatch(setStatus('')),5000)
    }

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input, [e.target.name]: e.target.value
        }))
    }
    function handleSelect(e) {
        if (input.categories.includes(e.target.value)) {
            setInput({
                ...input,
                categories: input.categories.filter((c) => {
                    return c !== e.target.value
                })
            })
        } else {
            setInput({
                ...input,
                categories: input.categories.concat(e.target.value)
            })
        }

    }

    useEffect(() => {
        
        boton = document.getElementById('enviar')

        dispatch(getAllCategories())
        boton.disabled = true
        boton.className="bg-[#94a3b8] p-5 m-2"
    }, [])
    let categories=useSelector(state=>state.categories)
    return <div>

        <form onSubmit={(e) => handleSubmit(e)} className="bg-[#a3a3a3] text-white container mx-auto p-20 m-20 rounded-3xl w-1/2">
            <h2 className="text-center text-xl text-[30px] text-black">REGISTRO DE NUEVO LIBRO</h2><br />
            <fieldset className="columns-2 text-[18px]">
                <label className="block">TITULO: </label>
                <input type='text' className={errors.title ? 'text-[#dc2626] rounded-lg' : 'text-[#075985] rounded-lg'} name='title' value={input.title} placeholder='Ingrese el Titulo del libro' onChange={(e) => handleChange(e)} autoFocus /><br />
                {errors.title ? <p className="text-[#dc2626]">{errors.title}</p> : null}<br />
                <label className="block">AUTOR: </label>
                <input type='text' className={errors.authors ? 'text-[#dc2626] rounded-lg' : 'text-[#075985] rounded-lg'} name='authors' value={input.authors} placeholder='Ingrese el nombre del Autor' onChange={(e) => handleChange(e)} /><br />
                {errors.authors ? <p className="text-[#dc2626]">{errors.authors}</p> : null}<br />
                <label className="block">EDITORIAL: </label>
                <input type='text' className={errors.publisher ? 'text-[#dc2626] rounded-lg' : 'text-[#075985] rounded-lg'} name='publisher' value={input.publisher} placeholder='Editorial' onChange={(e) => handleChange(e)} /><br />
                {errors.publisher ? <p className="text-[#dc2626]">{errors.publisher}</p> : null}<br />
                <label className="block">ISBN: </label>
                <input type='text' className={errors.ISBN ? 'text-[#dc2626] rounded-lg' : 'text-[#075985] rounded-lg'} name='ISBN' value={input.ISBN} placeholder='isbn' onChange={(e) => handleChange(e)} /><br />
                {errors.ISBN ? <p className="text-[#dc2626]">{errors.ISBN}</p> : null}<br />                               
                <label className="block">PRECIO: </label>
                <input type='text' className={errors.price ? 'text-[#dc2626] rounded-lg' : 'text-[#075985] rounded-lg'} name='price' value={input.price} placeholder='Ingrese el precio' onChange={(e) => handleChange(e)} /><br />
                {errors.price ? <p className="text-[#dc2626]">{errors.price}</p> : null}<br />
                <label className="block">IMAGEN: </label>
                <input type='file' name='imageLinks' className="w-64" accept="image/png, image/jpeg" onChange={(e) => uploadImage(e)} />
                <img src={input.imageLinks} alt="imagen" className="h-10 w-16" />
                <label className="block">CATEGORIA:</label>           
                <select name="categories" value={input.categories} placeholder='categoria' onClick={handleSelect} className={errors.categories ? 'text-[#dc2626]' : 'text-[#075985]'} multiple>
                    {categories.map(category=>{
                         return <option value={category.name}>{category.name}</option>
                    })}
                </select>
                {errors.categories ? <p className="text-[#dc2626]">{errors.categories}</p> : null}<br />
                {input.categories.map(cat => {
                    return <span>{cat},</span>
                })}
            </fieldset>
            <fieldset className="text-center">
                <legend>DESCRIPCION:</legend>
                <textarea className="w-full text-[#075985] rounded-lg" name="description" value={input.description} onChange={(e) => handleChange(e)} />
                {errors.description ? <p className="text-[#dc2626]">{errors.description}</p> : null}<br />
                <br />
                {loading?<p>{loading}</p>:null}
                <input type='submit' className={(Object.keys(errors).length) ? "bg-[#94a3b8] p-5 m-2 cursor-pointer rounded-3xl" : "bg-[#9a3412] p-5 m-2 cursor-pointer rounded-3xl"} id='enviar' disabled={(Object.keys(errors).length) ? true : false} value='Guardar' />

                <Link to="/admin">
                    <input type='button' className="bg-[#9a3412] p-5 cursor-pointer rounded-3xl" value='Regresar' />
                </Link>
            </fieldset>
        </form>

    </div>
}