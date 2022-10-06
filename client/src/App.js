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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { isLogin } from "./redux/actions";
import DeleteBooksSmart from "./components/DeleteBookSmart";

function App() {
  const dispatch = useDispatch();

  const LOGIN = useSelector((state) => state.login);
  const ROLE = useSelector((state) => state.role);

  const activeLogin = localStorage.getItem("LOGIN");
  const activeRole = localStorage.getItem("ROLE");

  useEffect(() => {
    dispatch(
      isLogin({
        login: activeLogin,
        role: activeRole,
      })
    );
  }, [activeLogin, activeRole]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route exact path="/createbook" element={<FormBook />} />

          {LOGIN == 1 && ROLE === "USER" ? (
            <Route exact path="/favorites" element={<Favorites />} />
          ) : null}

          <Route exact path="/books/:id" element={<BookDetail />} />

          <Route exact path="/searchbar" element={<SearchBarSmart />} />

          <Route exact path="/categories/:category" element={<CategoryBooksSmart />} />

          <Route exact path="/categories" element={<CategoriesSmart />} />

          {LOGIN == 1 && ROLE === "ADMIN" ? (
            <Route exact path="/admin" element={<MenuAdmin />} />
          ) : null}

          {activeLogin == 1 ? null : (
            <Route exact path="/register" element={<FormUser />} />
          )}

          {activeLogin == 1 ? null : (
            <Route exact path="/login" element={<Login />} />
          )}

          {LOGIN == 1 && ROLE === "ADMIN" ?
            (<Route exact path="/deletebook" element={<DeleteBooksSmart />} />) :
            null}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

/* 


            <Route exact path="/deletebook" element={<DeleteBooksSmart/>}/>
*/
