import Home from "./components/Home";
import FormBook from "./components/FormBook";
import FormCategory from "./components/FormCategory";
import Favorites from "./components/Favorites";
import CategoryBooksSmart from "./components/CategoryBooksSmart";
//import Categories from "./components/Categories";
import CategoriesSmart from "./components/CategoriesSmart";
import BookDetail from "./components/BookDetail";
import SearchBarSmart from "./components/SearchBarSmart";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import MenuAdmin from "./components/MenuAdmin";
import { Login } from "./components/Login";
import FormUser from "./components/FormUser";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logoutUser } from "./redux/actions";
import DeleteBooksSmart from "./components/DeleteBookSmart";
import { ManageUsers } from "./components/ManageUsers";
import { ManageCategories } from "./components/ManageCategories";
// import { FormUserTwo } from "../src/components/FormUserTwo";
import FormOrder from "./components/FormOrder";
import FormPayment from "./components/FormPayment";
import Cart from "./components/Cart";
import "boxicons";
// import { FormUserTwo } from "../src/components/FormUserTwo";
// import FormPayment from "./components/FormPayment";
import { ErrorNotFound } from "./components/ErrorNotFound";
import RecordOrderSmart from "./components/RecordOrderSmart"
import RecordOrderDetails from "./components/RecordDetailsSmart"
import FormBookEdit from "./components/FormBookEdit"

function App() {
  // const dispatch = useDispatch();

  const LOGIN = useSelector((state) => state.login);
  const ROLE = useSelector((state) => state.role);

  // const activeLogin = localStorage.getItem("LOGIN");
  // const activeRole = localStorage.getItem("ROLE");

  // useEffect(() => {
  //   dispatch(
  //     isLogin({
  //       login: LOGIN,
  //       role: ROLE,
  //     })
  //   );
  // }, [LOGIN, ROLE]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/createbook" element={<FormBook />} />
          <Route exact path="/createcategory" element={<FormCategory />} />
          {LOGIN === 1 && ROLE === "USER" ? (
            <Route exact path="/favorites" element={<Favorites />} />
          ) : (
            <Route exact path="/favorites" element={<ErrorNotFound />} />
          )}
          <Route exact path="/books/:id" element={<BookDetail />} />
          <Route exact path="/searchbar" element={<SearchBarSmart />} />
          <Route
            exact
            path="/categories/:category"
            element={<CategoryBooksSmart />}
          />
          <Route exact path="/categories" element={<CategoriesSmart />} />
          {LOGIN === 1 && ROLE === "ADMIN" ? (
            <Route exact path="/admin" element={<MenuAdmin />} />
          ) : (
            <Route exact path="/admin" element={<ErrorNotFound />} />
          )}
          {LOGIN === 1 ? null : (
            <Route exact path="/register" element={<FormUser />} />
          )}
          {LOGIN === 1 ? null : (
            <Route exact path="/login" element={<Login />} />
          )}
          <Route exact path="/adminuser" element={<ManageUsers />} />
          <Route exact path="/admicategory" element={<ManageCategories />} />
          <Route exact path="/payment" element={<FormPayment />} />
          {LOGIN === 1 && ROLE === "ADMIN" ? null : (
            <Route exact path="/car" element={<Cart />} />
          )}

          {LOGIN === 1 && ROLE === "USER" ? (
            <Route excat path="/order" element={<FormOrder />} />
          ) : (
            <Route excat path="/order" element={<ErrorNotFound />} />
          )}


          {LOGIN === 1 && ROLE === "USER" ? (
            <Route excat path="/historyorder/:id" element={<RecordOrderSmart />} />
          ) : (
            <Route excat path="/historyorder/:id" element={<ErrorNotFound />} />
          )}


          {LOGIN === 1 && ROLE === "USER" ? (
            <Route excat path="/historyorder/:id/:idOrder" element={<RecordOrderDetails />} />
          ) : (
            <Route excat path="/historyorder/:id/:idOrder" element={<ErrorNotFound />} />
          )}

          {LOGIN === 1 && ROLE === "ADMIN" ? (
            <Route exact path="/deletebook" element={<DeleteBooksSmart />} />

          ) : null}


          {LOGIN === 1 && ROLE === "ADMIN" ? (
            <Route excat path="edit/:id" element={<FormBookEdit />} />
          ) : null}


          {LOGIN === 1 && ROLE === "ADMIN" ? (
            <Route exact path="/adminuser" element={<ManageUsers />} />
          ) : null}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
/* 

            <Route exact path="/deletebook" element={<DeleteBooksSmart/>}/>
*/
