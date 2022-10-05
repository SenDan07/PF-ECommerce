import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { register, setStatus } from "../redux/actions"


let boton
export function validate(input) {

    let errors = {};
    let expLetras = /^[A-Za-z]+[A-Za-z\s]*[A-Za-z]$/
    let email=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
   
    if (!input.name) {
        errors.name = 'Nombre es requerido';
    } else if (!expLetras.test(input.name)) {
        errors.name = 'Nombre es invalido'
    }
    if (!input.lastName) {
        errors.lastName = 'Apellido es requerido';
    } else if (!expLetras.test(input.lastName)) {
        errors.lastName = 'Apellido es invalido'
    }
    if (!input.password) {
        errors.password = 'Password es requerido';
    }
    if (!input.role) {
        errors.role = 'Rol es requerido';
    } else if (!input.role=='ADMIN'||!input.role=='USER') {
        errors.role = 'Rol es invalido'
    }
    if (!input.email) {
        errors.email = 'Email es requerido';
    }else if (!email.test(input.email)) {
        errors.email = 'Email es invalido'
    }
    return errors;
}

export default function FormUser() {
    const dispatch = useDispatch()
 
    let loading=useSelector(state=>state.loading)
   
    const [input, setInput] = React.useState({
        name:'',
        lastName:'',
        password: '',
        role:'USER',
        email:''
    })
    const [errors, setErrors] = React.useState({});

    /*const uploadImage= async (e)=>{
        
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
    
    }*/

    function handleSubmit(e) {

        e.preventDefault()
        dispatch(register(input))
       
        setInput({
        name:'',
        lastName:'',
        password: '',
        role:'USER',
        email:''
        })
        e.target.name.focus()
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

    useEffect(() => {
        
        boton = document.getElementById('enviar')

        //dispatch(getAllCategories())
        boton.disabled = true
        boton.className="bg-[#94a3b8] p-5 m-2"
    }, [])
    //let categories=useSelector(state=>state.categories)
    return <div>

        <form onSubmit={(e) => handleSubmit(e)} className="bg-[#a3a3a3] text-white container mx-auto p-20 m-20 rounded-3xl w-1/2">
            <h2 className="text-center text-xl text-[30px] text-black">REGISTRO DE USUARIOS</h2><br />
            <fieldset className="columns-2 text-[18px] m-2">
                <label className="block">NOMBRE: </label>
                <input type='text' className={errors.name ? 'text-[#dc2626] rounded-lg' : 'text-[#075985] rounded-lg'} name='name' value={input.name} placeholder='Ingrese el Nombre de Usuario' onChange={(e) => handleChange(e)} autoFocus /><br />
                {errors.name ? <p className="text-[#dc2626]">{errors.name}</p> : null}<br />
                <label className="block">APELLIDO: </label>
                <input type='text' className={errors.lastName ? 'text-[#dc2626] rounded-lg' : 'text-[#075985] rounded-lg'} name='lastName' value={input.lastName} placeholder='Ingrese el Apellido de Usuario' onChange={(e) => handleChange(e)} /><br />
                {errors.lastName ? <p className="text-[#dc2626]">{errors.lastName}</p> : null}<br />
                <label className="block">PASSWORD: </label>
                <input type='password' className={errors.password ? 'text-[#dc2626] rounded-lg' : 'text-[#075985] rounded-lg'} name='password' value={input.password} placeholder='Password' onChange={(e) => handleChange(e)} /><br />
                {errors.password ? <p className="text-[#dc2626]">{errors.password}</p> : null}<br />
                <label className="block">EMAIL: </label>
                <input type='email' className={errors.email ? 'text-[#dc2626] rounded-lg' : 'text-[#075985] rounded-lg'} name='email' value={input.email} placeholder='Email' onChange={(e) => handleChange(e)} /><br />
                {errors.email ? <p className="text-[#dc2626]">{errors.email}</p> : null}<br />                               
                
                {/*<label className="block">IMAGEN: </label>
                <input type='file' name='imageLinks' className="w-64" accept="image/png, image/jpeg" onChange={(e) => uploadImage(e)} />
                <img src={input.imageLinks} alt="imagen" className="h-10 w-16" />*/}
                <label className="block">ROL:</label>           
                <select name="role" value={input.role} onChange={handleChange} className={errors.role ? 'text-[#dc2626]' : 'text-[#075985]'} >
                          <option value='USER'>USER</option>
                          <option value='ADMIN'>ADMIN</option>                         
                </select>
                <br /><br /><br />
                
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