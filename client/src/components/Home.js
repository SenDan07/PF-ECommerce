import NavBar from "./NavBar";
import { Route, BrowserRouter, Switch, Routes } from "react-router-dom"
import BookList from "./BookList";


export default function Home() {
    return (
        <div>
            <NavBar />

            <BookList />
            <Routes>
            </Routes>

        </div>
    )
}