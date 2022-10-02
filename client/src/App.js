import Home from "./components/Home";
import FormBook from "./components/FormBook";
import Favorites from "./components/Favorites";
import CategoryBooksSmart from "./components/CategoryBooksSmart"
//import Categories from "./components/Categories";
import CategoriesSmart from "./components/CategoriesSmart";
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

          <Route exact path="/books/:id" element={<BookDetail />} />

          <Route exact path="/categories/:category" element={<CategoryBooksSmart/>}/>

          //<Route exact path="/categories" element={<CategoriesSmart/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

//<Route exact path="/categories" element={<Categories />} />
