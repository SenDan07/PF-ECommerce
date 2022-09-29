import { useState } from "react"
import { useDispatch } from "react-redux"
import { searchBook } from "../redux/actions"

export default function SearchBar() {
    const [search, setSearch] = useState("")
    let dispatch = useDispatch()

    function onSubmit(e) {
        e.preventDefault()
        dispatch(searchBook(search))
        setSearch("")
    }
    function onInputChange(e) {
        e.preventDefault()
        setSearch(e.target.value)
    }
    return (
        <div className="text-white">
            <form onSubmit={onSubmit}>
                <input className="text-xl py-3 rounded bg-bgSearch text-NavBar"
                    type="text"
                    onChange={onInputChange}
                    value={search}
                    placeholder="Libro, Autor, Editorial..." />

                <input className="bg-button text-xl px-4 py-3 rounded cursor-pointer hover:bg-hoverMenu"
                    type="submit"
                    value="Buscar" />
            </form>
        </div>
    )
}