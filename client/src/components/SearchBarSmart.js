import { useSelector } from "react-redux"
import {Book} from "./Book"
import { Link } from "react-router-dom"

export default function SearchBarSmart(){

    const busqueda=useSelector((state)=>state.booksFilter)
    console.log(busqueda)
    return <div>
        <h1>Resultados de la busqueda {/*deberia mostrar el cards*/}</h1> 
       {
        busqueda.map((book) => {
            return (
              <Link to={`/books/${book.id}`} key={book.id}>
                <Book
                  name={book.title}
                  image={book.imageLinks}
                  price={book.price}
                />
              </Link>
            );
          })
       }
        
   

    </div>
}