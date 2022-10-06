import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { postCreateCategory, setStatus } from "../redux/actions"

let boton
export function validate(input) {

    let errors = {};
    let expLetras = /^[A-Za-z]+[A-Za-z\s]*[A-Za-z]$/
    let expLetras_Num=/^[A-Za-z0-9]+[A-Za-z0-9\s]*[A-Za-z0-9]$/
    if (!input.name) {
        errors.name = 'Categoria es requerido';
    } else if (!expLetras.test(input.name)) {
        errors.name = 'Categoria es invalido'
    }   

    return errors;
}

export default function FormBook() {
    const dispatch = useDispatch()
 
    let loading=useSelector(state=>state.loading)
   
    const [input, setInput] = React.useState({
        name:'',
        imageLinks:'',
    })
    const [errors, setErrors] = React.useState({});

    const uploadImage= async (e)=>{
        
     try{
        const files=e.target.files
        const data=new FormData()
        data.append('file',files[0])
        data.append('upload_preset',"yweg8r9z")
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
        dispatch(postCreateCategory(input))
       
        setInput({
            name:'',
            imageLinks: ''
        })
        e.target.name.focus()
        //  let boton= document.getElementById('enviar')
        boton.disabled = true
        setTimeout(()=>dispatch(setStatus('')),5000)
    }

    function handleChange(e) {
        console.log("Ingresa en change")
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input, [e.target.name]: e.target.value
        }))
    }
    
    useEffect(() => {
        
        boton = document.getElementById('enviar')

        boton.disabled = true
        boton.className="bg-[#94a3b8] p-5 m-2"
    }, [])
   
    return <div>

        <form onSubmit={(e) => handleSubmit(e)} className="bg-[#a3a3a3] text-white container mx-auto p-20 m-20 rounded-3xl w-1/2">
            <h2 className="text-center text-xl text-[30px] text-black">REGISTRO DE CATEGORIA</h2><br />
            <fieldset className="columns-2 text-[18px]">
                <label className="block">CATEGORIA: </label>
                <input type='text' className={errors.name ? 'text-[#dc2626] rounded-lg' : 'text-[#075985] rounded-lg'} name='name' value={input.name} placeholder='Ingrese el Titulo del libro' onChange={(e) => handleChange(e)} autoFocus /><br />
                {errors.name ? <p className="text-[#dc2626]">{errors.name}</p> : null}<br />
                
                <label className="block">IMAGEN: </label>
                <input type='file' name='imageLinks' className="w-64" accept="image/png, image/jpeg" onChange={(e) => uploadImage(e)} />
                <img src={input.imageLinks} alt="imagen" className="h-10 w-16" />
               
            </fieldset>
            <fieldset className="text-center">
               
                {loading?<p>{loading}</p>:null}
                <input type='submit' className={(Object.keys(errors).length) ? "bg-[#94a3b8] p-5 m-2 cursor-pointer rounded-3xl" : "bg-[#9a3412] p-5 m-2 cursor-pointer rounded-3xl"} id='enviar' disabled={(Object.keys(errors).length) ? true : false} value='Guardar' />

                <Link to="/admin">
                    <input type='button' className="bg-[#9a3412] p-5 cursor-pointer rounded-3xl" value='Regresar' />
                </Link>
            </fieldset>
        </form>

    </div>
}
