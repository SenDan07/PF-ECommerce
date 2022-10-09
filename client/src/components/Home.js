// import { Route, BrowserRouter, Switch, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import BookList from "./BookList";
import Carousel from "./Carousel";
import Slider from "./Carousel/Slider";
/* import OrderName from "./OrderName";
import OrderPriece from "./OrderPriece" */

export default function Home() {
  return (
    <div className="bg-bgHome">
      <NavBar />
      {/* <Carousel /> */}
      <Slider />
      <BookList />
    </div>
  );
}
