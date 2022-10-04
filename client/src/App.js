import Home from "./components/Home";
import FormBook from "./components/FormBook";
import Favorites from "./components/Favorites";
import CategoryBooksSmart from "./components/CategoryBooksSmart";
//import Categories from "./components/Categories";
import CategoriesSmart from "./components/CategoriesSmart";
import BookDetail from "./components/BookDetail";
import SearchBarSmart from "./components/SearchBarSmart";
import { Route, BrowserRouter, Switch, Routes } from "react-router-dom";
import MenuAdmin from "./components/MenuAdmin";
import { Login } from "./components/Login";
import FormUser from "./components/FormUser";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/createbook" element={<FormBook />} />
          <Route exact path="/favorites" element={<Favorites />} />
          <Route exact path="/books/:id" element={<BookDetail />} />
          <Route exact path="/searchbar" element={<SearchBarSmart />} />
          <Route
            exact
            path="/categories/:category"
            element={<CategoryBooksSmart />}
          />
          <Route exact path="/categories" element={<CategoriesSmart />} />
          <Route exact path="/admin" element={<MenuAdmin />} />
          <Route exact path="/adminuser" element={<FormUser />} />
          {/* <Route exact path="/categories" element={<Categories />} /> */}
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

//

//
