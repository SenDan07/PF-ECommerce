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
import { useSelector } from "react-redux";
// import { useEffect } from "react";
// import { logoutUser } from "./redux/actions";
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
import RecordOrderSmart from "./components/RecordOrderSmart";
import RecordDetailsSmart from "./components/RecordDetailsSmart";
import Footer from "./components/Footer";
import FormBookEdit from "./components/FormBookEdit";
import FormUserEdit from "./components/FormUserEdit"
import { ResetPassword } from "./components/ResetPassword";

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

          {LOGIN === 1 && ROLE === "USER" ? (
            <Route exact path="/favorites" element={<Favorites />} />
          ) : (
            <Route exact path="/favorites" element={<ErrorNotFound />} />
          )}
          <Route exact path="/books/:id" element={<BookDetail />} />
          <Route exact path="/searchbar" element={<SearchBarSmart />} />
          <Route exact path="/user/edit/:id" element={<FormUserEdit />} />
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
            <Route
              excat
              path="/historyorder/:id"
              element={<RecordOrderSmart />}
            />
          ) : (
            <Route excat path="/historyorder/:id" element={<ErrorNotFound />} />
          )}

          {LOGIN === 1 && ROLE === "USER" ? (
            <Route
              excat
              path="/historyorder/:id/:idOrder"
              element={<RecordDetailsSmart />}
            />
          ) : (
            <Route
              excat
              path="/historyorder/:id/:idOrder"
              element={<ErrorNotFound />}
            />
          )}

          {LOGIN === 1 && ROLE === "ADMIN" ? (
            <Route exact path="/deletebook" element={<DeleteBooksSmart />} />
          ) : null}

          {LOGIN === 1 && ROLE === "ADMIN" ? (
            <Route exact path="edit/:id" element={<FormBookEdit />} />
          ) : null}

          {LOGIN === 1 && ROLE === "ADMIN" ? (
            <Route exact path="/adminuser" element={<ManageUsers />} />
          ) : null}

          {LOGIN === 1 && ROLE === "ADMIN" ? (
            <Route exact path="/createbook" element={<FormBook />} />
          ) : null}

          {LOGIN === 1 && ROLE === "ADMIN" ? (
            <Route exact path="/createcategory" element={<FormCategory />} />
          ) : null}

          {LOGIN === 1 ? (
            <Route exact path="/reset-password" element={<ErrorNotFound />} />
          ) : (
            <Route exact path="/reset-password" element={<ResetPassword />} />
          )}
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

/* 

*/
