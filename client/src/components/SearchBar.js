import { useState } from "react"


export default function SearchBar() {
    const [search, setSearch] = useState("")
    function onSubmit(e) {
        e.preventDefault()
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