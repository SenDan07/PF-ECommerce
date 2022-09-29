import Home from "./components/Home";
import FormBook from "./components/FormBook";
import Favorites from "./components/Favorites";
import Categories from "./components/Categories";
import BookDetail from "./components/BookDetail";
import { Route, BrowserRouter, Switch, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route exact path="/createbook" element={<FormBook />} />

          <Route exact path="/favorites" element={<Favorites />} />

          <Route exact path="/categories" element={<Categories />} />
          <Route exact path="/:id" element={<BookDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
