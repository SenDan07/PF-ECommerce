import React, { useEffect } from "react";
import { Link } from "react-router-dom"
//import {useDispatch, useSelector} from "react-redux"
//import { useHistory } from "react-router-dom"
//import { createActivity,setStatus } from "../Redux/actions";
//import  '../Styles/FormActivity.css'

let boton
export function validate(input) {

    let errors = {};
    let expLetras = /^[A-Za-z]+[A-Za-z\s]*[A-Za-z]$/
    if (!input.title) {
        errors.title = 'Titulo es requerido';
    } else if (!expLetras.test(input.title)) {
        errors.title = 'Titulo es invalido'
    }
    if (!input.authors) {
        errors.authors = 'Autor es requerido';
    } else if (!expLetras.test(input.authors)) {
        errors.authors = 'Autor es invalido'
    }
    if (input.publisher) {
        if (!expLetras.test(input.publisher)) {
            errors.publisher = 'Editorial es invalida'
        }
    }
     if (input.ISBN) {
        if (/\D/.test(input.ISBN)) {
            errors.ISBN = "ISBN debe ser numerico"
        }
    }
    if (input.description) {
        if (!expLetras.test(input.description)) {
            errors.description = "Descripcion es invalida"
        }
    }
    if (!input.price) {
        errors.precio = 'precio es requerido';
    }
    else if (input.price) {
        if (input.price < 0 || !/^[0-9]+([.][0-9]+)?$/.test(input.price)) {
            errors.price = "Precio no valido"
        }
    }

    return errors;
}

export default function FormBook() {
    //const dispatch = useDispatch()
    //const history = useHistory()

    function handleClick(e) {
        //history.goBack()
        //console.log("regresar")

    }

    useEffect(() => {
        boton = document.getElementById('enviar')
        boton.disabled = true
    }, [])
    //let loading=useSelector(state=>state.loading)
    //let countries=useSelector(state=>state.countries)

    const [input, setInput] = React.useState({
        title:'',//texto
        authors: [],//arreglo
        publisher: '',//texto
        ISBN:'',//integer
        categories: [],//string
        imageLinks: '',//string
        description:'',//string
        price: 0,//float
    })
    const [errors, setErrors] = React.useState({});

    function handleSubmit(e) {

        e.preventDefault()
        // dispatch(createActivity(input))
        setInput({
            title:'',//texto
            authors: [],//arreglo
            publisher: '',//texto
            ISBN:'',//integer
            categories: [],//string
            imageLinks: '',//string
            description:'',//string
            price: 0,
        })
        e.target.title.focus()
        //  let boton= document.getElementById('enviar')
        boton.disabled = true
        //   setTimeout(()=>dispatch(setStatus('')),2000)
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
    return <div>

        <form onSubmit={(e) => handleSubmit(e)} class="bg-[#a3a3a3] text-white container mx-auto p-20 m-20 rounded-3xl w-1/2">
            <h2 class="text-center text-xl text-[30px] text-black">REGISTRO DE NUEVO LIBRO</h2><br />
            <fieldset class="columns-2 text-[18px]">
                <label class="block">TITULO: </label>
                <input type='text' class={errors.title ? 'text-[#dc2626]' : 'text-[#075985]'} name='title' value={input.title} placeholder='Ingrese el Titulo del libro' onChange={(e) => handleChange(e)} autoFocus /><br />
                {errors.title ? <p class="text-[#dc2626]">{errors.title}</p> : null}<br />
                <label class="block">AUTOR: </label>
                <input type='text' class={errors.authors ? 'text-[#dc2626]' : 'text-[#075985]'} name='authors' value={input.authors} placeholder='Ingrese el nombre del Autor' onChange={(e) => handleChange(e)} /><br />
                {errors.authors ? <p class="text-[#dc2626]">{errors.authors}</p> : null}<br />
                <label class="block">EDITORIAL: </label>
                <input type='text' class={errors.publisher ? 'text-[#dc2626]' : 'text-[#075985]'} name='publisher' value={input.publisher} placeholder='Editorial' onChange={(e) => handleChange(e)} /><br />
                {errors.publisher ? <p class="text-[#dc2626]">{errors.publisher}</p> : null}<br />
                <label class="block">ISBN: </label>
                <input type='text' class={errors.ISBN ? 'text-[#dc2626]' : 'text-[#075985]'} name='ISBN' value={input.ISBN} placeholder='isbn' onChange={(e) => handleChange(e)} /><br />
                {errors.ISBN ? <p class="text-[#dc2626]">{errors.ISBN}</p> : null}<br />                               
                <label class="block">PRECIO: </label>
                <input type='text' class={errors.price ? 'text-[#dc2626]' : 'text-[#075985]'} name='price' value={input.price} placeholder='Ingrese el precio' onChange={(e) => handleChange(e)} /><br />
                {errors.price ? <p class="text-[#dc2626]">{errors.price}</p> : null}<br />
                <label class="block">IMAGEN: </label>
                <input type='file' name='imageLinks' value={input.imageLinks} placeholder='imagen' onChange={(e) => handleChange(e)} />
                {errors.imageLinks ? <p class="text-[#dc2626]">{errors.imageLinks}</p> : null}<br />
                <label class="block">CATEGORIA:</label>
                <select name="categories" value={input.categories} placeholder='categoria' onClick={handleSelect} class={errors.categories ? 'text-[#dc2626]' : 'text-[#075985]'} multiple>
                    <option value='CIENCIA FICCION'>CIENCIA FICCION</option>
                    <option value='COMEDIA'>COMEDIA</option>
                    <option value='DRAMA'>DRAMA</option>
                    <option value='EDUCATIVO/CULTURAL'>EDUCATIVO/CULTURAL</option>
                    <option value='TERROR'>TERROR</option>
                    <option value='MISTERIO'>MISTERIO</option>
                    <option value='FANTASIA'>FANTASIA</option>
                    <option value='AVENTURAS'>AVENTURAS</option>
                    <option value='HISTORICOS'>HISTORICOS</option>
                    <option value='ILUSTRACIONES'>ILUSTRACIONES</option>
                    <option value='ROMANCE'>ROMANCE</option>
                    <option value='SIN CATEGORIA'>SIN CATEGORIA</option>
                </select>
                {errors.categories ? <p class="text-[#dc2626]">{errors.categories}</p> : null}<br />
                {input.categories.map(cat => {
                    return <span>{cat},</span>
                })}
            </fieldset>
            <fieldset class="text-center">
                <legend>DESCRIPCION:</legend>
                <textarea class="w-full text-[#075985]" name="description" value={input.description} onChange={(e) => handleChange(e)} />

                <br />
                {/*loading?<p>{loading}</p>:null*/}
                <input type='submit' class={(Object.keys(errors).length) ? "bg-[#94a3b8] p-5 m-2 cursor-pointer" : "bg-[#9a3412] p-5 m-2 cursor-pointer"} id='enviar' disabled={(Object.keys(errors).length) ? true : false} value='Guardar' />

                <Link to="/">
                    <input type='button' class="bg-[#9a3412] p-5 cursor-pointer" onClick={handleClick} value='Regresar' />
                </Link>
            </fieldset>
        </form>

    </div>
}