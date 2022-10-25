import NavBar from "../NavBar/NavBar";
import BookList from "../BookList/BookList";
// import Carousel from "../Carousel";
import Slider from "../Carousel/Slider";

export default function Home() {
  return (
    <div className="bg-bgHome">
      <NavBar />
      {/* <Carousel /> */}
      <div className="flex mt-0">
        <Slider />
      </div>
      <BookList />
    </div>
  );
}
