import React,{ useEffect }  from "react";
//import {useDispatch, useSelector} from "react-redux"
//import { useHistory } from "react-router-dom"
//import { createActivity,setStatus } from "../Redux/actions";
//import  '../Styles/FormActivity.css'

let boton
export function validate(input){
   
    let errors={};
    let expLetras=/^[A-Za-z]+[A-Za-z\s]*[A-Za-z]$/
    if(!input.autor){
        errors.autor='Autor es requerido';
    }else if(!expLetras.test(input.autor)){
        errors.autor='Autor es invalido'
    }
    if(input.editorial){
       if(!expLetras.test(input.editorial)){
        errors.editorial='Editorial es invalida'
      }
    }
    if(!input.precio){
        errors.precio='precio es requerido';
    }
    else if(input.precio){
        if(input.precio<0 || /\D/.test(input.precio)){
            errors.precio="Precio no valido"
        }
    }
return errors;
}

export default function FormBook(){
  //  const dispatch=useDispatch()
    //const history=useHistory()

   function handleClick(e){
    // history.goBack()
    console.log("regresar")
  }
  
    useEffect(()=>{
       boton= document.getElementById('enviar')
       boton.disabled=true            
     },[]) 
     //let loading=useSelector(state=>state.loading)
     //let countries=useSelector(state=>state.countries)
        
     const [input,setInput]=React.useState({
         autor:'',
         editorial:'',
         precio:0,
         edicion:'',
         imagen:'',
         tipo:'',
         isbn:'',
         categoria:[],
         descripcion:''
     })
     const [errors,setErrors]=React.useState({});
      
     function handleSubmit(e){

         e.preventDefault()
        // dispatch(createActivity(input))
         setInput({
            autor:'',
         editorial:'',
         precio:0,
         edicion:'',
         imagen:'',
         tipo:'',
         isbn:'',
         categoria:[],
         descripcion:''
        })
        e.target.name.focus()
      //  let boton= document.getElementById('enviar')
        boton.disabled=true   
     //   setTimeout(()=>dispatch(setStatus('')),2000)
     }
    
     function handleChange(e) {
        setInput({
         ...input,
         [e.target.name]:e.target.value
        })   
        setErrors(validate({
         ...input,[e.target.name]:e.target.value
       }))     
     }
     function handleSelect(e){
                if(input.categoria.includes(e.target.value)){
                    setInput({
                        ...input,
                        categoria:input.categoria.filter((c)=>{
                           return c!==e.target.value
                    })
                })
                }else{
                    setInput({
                        ...input,
                        categoria:input.categoria.concat(e.target.value)
                    })
                }
              
     }
    return <div>
        
        <form onSubmit={(e)=>handleSubmit(e)} class="bg-[#a3a3a3] text-white container mx-auto p-20 m-20 rounded-3xl w-1/2">
            <h2 class="text-center text-xl text-[30px] text-black">REGISTRO DE NUEVO LIBRO</h2><br />
            <fieldset class="columns-2 text-[18px]">                
                <label class="block">AUTOR: </label>
                <input type='text' class={errors.autor?'text-red-600':'text-blue-600'} name='autor' value={input.autor} placeholder='Ingrese el nombre del Autor' onChange={(e)=>handleChange(e)} autoFocus /><br />
                {errors.autor?<p class="text-red-600">{errors.autor}</p>:null}<br />
                <label class="block">EDITORIAL: </label>
                <input type='text' class={errors.editorial?'text-red-600':'text-blue-600'} name='editorial' value={input.editorial} placeholder='Editorial' onChange={(e)=>handleChange(e)} /><br />
                {errors.editorial?<p class="text-red-600">{errors.editorial}</p>:null}<br />
                <label class="block">PRECIO: </label>
                <input type='text' class={errors.precio?'text-red-600':'text-blue-600'} name='precio' value={input.precio} placeholder='Ingrese el precio' onChange={(e)=>handleChange(e)} /><br />
                {errors.precio?<p class="text-red-600">{errors.precio}</p>:null}<br />
                <label class="block">EDICION: </label>
                <input type='text' class={errors.edicion?'text-red-600':'text-blue-600'} name='edicion' value={input.edicion} placeholder='Ingrese el precio' onChange={(e)=>handleChange(e)} /><br />
                {errors.edicion?<p class="text-red-600">{errors.edicion}</p>:null}<br /><br /><br />
                <label class="block">IMAGEN: </label>
                <input type='text' class={errors.imagen?'text-red-600':'text-blue-600'} name='imagen' value={input.imagen} placeholder='imagen' onChange={(e)=>handleChange(e)} />
                <input type='button'class="bg-[#9a3412] p-1" onClick={e=>{return e} } value='Buscar' /><br />
                {errors.imagen?<p class="text-red-600">{errors.imagen}</p>:null}<br />
                <label class="block">TIPO: </label>
                <input type='text' class={errors.tipo?'text-red-600':'text-blue-600'} name='tipo' value={input.tipo} placeholder='tipo' onChange={(e)=>handleChange(e)} /><br />
                {errors.tipo?<p class="text-red-600">{errors.tipo}</p>:null}<br />
                <label class="block">ISBN: </label>
                <input type='text' class={errors.isbn?'text-red-600':'text-blue-600'} name='isbn' value={input.isbn} placeholder='isbn' onChange={(e)=>handleChange(e)} /><br />
                {errors.isbn?<p class="text-red-600">{errors.isbn}</p>:null}<br />
                <label class="block">CATEGORIA:</label>
                <select name="categoria" value={input.categoria} placeholder='categoria' onClick={handleSelect} class={errors.categoria?'text-red-600':'text-blue-600'} multiple>
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
                {errors.categoria?<p class="text-red-600">{errors.categoria}</p>:null}<br />
                {input.categoria.map(cat=>{
                    return <span>{cat},</span> 
                })}
            </fieldset>
            <fieldset class="text-center">
            <legend>DESCRIPCION:</legend>
                    <textarea class="w-full text-blue-600" name="descripcion" value={input.descripcion} onChange={(e)=>handleChange(e)} />
            
            <br /> 
           {/*loading?<p>{loading}</p>:null*/ }
           <input type='submit' class={(Object.keys(errors).length)?"bg-[#94a3b8] p-5 m-2":"bg-[#9a3412] p-5 m-2"} id='enviar' disabled={(Object.keys(errors).length)? true:false} value='Guardar' />
           <input type='button'class="bg-[#9a3412] p-5" onClick={ handleClick } value='Regresar' />
           </fieldset>
        </form>
       
    </div>
}