import { Route, BrowserRouter, Switch, Routes } from "react-router-dom"
import NavBar from "./NavBar";
import BookList from "./BookList";
import Carousel from "./Carousel";
import OrderName from "./OrderName";

export default function Home() {
    return (
        <div className="bg-bgHome">
            <NavBar />
            <Carousel/>
            <OrderName/>
            <BookList />

        </div>
    )
}