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
import { useSelector } from "react-redux";

function App() {
  // const LOGIN = useSelector((state) => state.login);
  // const ROLE = useSelector((state) => state.role);

  const LOGIN = localStorage.getItem("LOGIN");
  const ROLE = localStorage.getItem("ROLE");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/createbook" element={<FormBook />} />
          {LOGIN == 1 && ROLE == "USER" ? (
            <Route exact path="/favorites" element={<Favorites />} />
          ) : null}
          <Route exact path="/books/:id" element={<BookDetail />} />
          <Route exact path="/searchbar" element={<SearchBarSmart />} />
          <Route
            exact
            path="/categories/:category"
            element={<CategoryBooksSmart />}
          />
          <Route exact path="/categories" element={<CategoriesSmart />} />
          {LOGIN == 1 && ROLE == "ADMIN" ? (
            <Route exact path="/admin" element={<MenuAdmin />} />
          ) : null}
          <Route exact path="/register" element={<FormUser />} />
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
