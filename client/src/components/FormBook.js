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
   
    if(Object.keys(errors)){
          boton.className='boton_disabled'
    }
    else{
        boton.className='boton_form'
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
       boton.className='boton_disabled'         
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
        let boton= document.getElementById('enviar')
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
        
        <form onSubmit={(e)=>handleSubmit(e)} className="form">
            <fieldset>
                <legend>Registro de Nuevo Libro</legend>
                <label>AUTOR: </label>
                <input type='text' className={errors.autor?'danger':'input'} name='autor' value={input.autor} placeholder='Ingrese el nombre del Autor' onChange={(e)=>handleChange(e)} autoFocus /><br />
                {errors.autor?<p>{errors.autor}</p>:null}<br />
                <label>EDITORIAL: </label>
                <input type='text' className={errors.editorial?'danger':'input'} name='editorial' value={input.editorial} placeholder='Editorial' onChange={(e)=>handleChange(e)} /><br />
                {errors.editorial?<p>{errors.editorial}</p>:null}<br />
                <label>PRECIO: </label>
                <input type='text' className={errors.precio?'danger':'input'} name='precio' value={input.precio} placeholder='Ingrese el precio' onChange={(e)=>handleChange(e)} /><br />
                {errors.precio?<p>{errors.precio}</p>:null}<br />
                <label>EDICION: </label>
                <input type='text' className={errors.edicion?'danger':'input'} name='edicion' value={input.edicion} placeholder='Ingrese el precio' onChange={(e)=>handleChange(e)} /><br />
                {errors.edicion?<p>{errors.edicion}</p>:null}<br />
                <label>IMAGEN: </label>
                <input type='text' className={errors.imagen?'danger':'input'} name='imagen' value={input.imagen} placeholder='imagen' onChange={(e)=>handleChange(e)} /><br />
                {errors.imagen?<p>{errors.imagen}</p>:null}<br />
                <label>TIPO: </label>
                <input type='text' className={errors.tipo?'danger':'input'} name='tipo' value={input.tipo} placeholder='tipo' onChange={(e)=>handleChange(e)} /><br />
                {errors.tipo?<p>{errors.tipo}</p>:null}<br />
                <label>ISBN: </label>
                <input type='text' className={errors.isbn?'danger':'input'} name='isbn' value={input.isbn} placeholder='isbn' onChange={(e)=>handleChange(e)} /><br />
                {errors.isbn?<p>{errors.isbn}</p>:null}<br />
                <label>CATEGORIA:</label>
                <select name="categoria" value={input.categoria} placeholder='categoria' onClick={handleSelect} className={input.categoria?'danger':'input'} multiple>
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
                {errors.categoria?<p>{errors.categoria}</p>:null}<br />
                {input.categoria.map(cat=>{
                    return <span>{cat},</span> 
                })}
            </fieldset>
            <fieldset>
            <legend>DESCRIPCION:</legend>
                    <textarea className={errors.descripcion?'danger':'input'} name="descripcion" value={input.descripcion} onChange={(e)=>handleChange(e)} />
            
            <br /> 
           {/*loading?<p>{loading}</p>:null*/ }
           <input type='submit' className="boton_form" id='enviar' disabled={(Object.keys(errors).length)? true:false} value='Guardar' />
           <input type='button' className="boton_form" onClick={ handleClick } value='Regresar' />
           </fieldset>
        </form>
       
    </div>
}