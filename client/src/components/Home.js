// import { Route, BrowserRouter, Switch, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import BookList from "./BookList";
import Carousel from "./Carousel";
import Slider from "./Carousel/Slider";
/* import OrderName from "./OrderName";
import OrderPriece from "./OrderPriece" */

export default function Home() {
/*   let flag = localStorage.getItem("bookDetail")
  if (flag.length) {
    localStorage.setItem("bookDetail", "[]")
    //flag = localStorage.getItem("bookDetail")
  } */
  return (
    <div className="bg-bgHome">
      <NavBar />
      {/* <Carousel /> */}
      <Slider />
      <BookList />
    </div>
  );
}
