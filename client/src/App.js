import Home from "./components/Home/Home";
import FormBook from "./components/Forms/FormBook/FormBook";
import FormCategory from "./components/Forms/FormCategories/FormCategory";
import CategoryBooksSmart from "./components/CategoryBooks/CategoryBooksSmart";
import CategoriesSmart from "./components/Categories/CategoriesSmart";
import BookDetail from "./components/BookDetail/BookDetail";
import SearchBarSmart from "./components/Search/SearchBar/SearchBarSmart";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import MenuAdmin from "./components/MenuAdmin/MenuAdmin";
import { Login } from "./components/Login/Login";
import FormUser from "./components/Forms/FormUser/FormUser";
import { useSelector } from "react-redux";
import DeleteBooksSmart from "./components/DeleteBooks/DeleteBookSmart";
import { ManageUsers } from "./components/ManagerUsers/ManageUsers";
import { ManageCategories } from "./components/ManagerCategories/ManageCategories";
import FormOrder from "./components/Forms/FormOrders/FormOrder";
import FormPayment from "./components/Forms/FormPayment/FormPayment";
import Cart from "./components/Cart/Cart";
import { ErrorNotFound } from "./components/ErrorNotFound/ErrorNotFound";
import RecordOrderSmart from "./components/RecordOrders/RecordOrderSmart";
import RecordDetailsSmart from "./components/RecordDetails/RecordDetailsSmart";
import Footer from "./components/Footer/Footer";
import FormBookEdit from "./components/Forms/FormBook/FormBook";
import FormUserEdit from "./components/Forms/FormUserEdit/FormUserEdit";
import { ResetPassword } from "./components/Reset/ResetPassword/ResetPassword";
import AllRecordSmart from "./components/AllRecord/AllRecordSmart";
import AllRecordDetailsSmart from "./components/AllRecordDetails/AllRecordDetailsSmart";

function App() {
  const LOGIN = useSelector((state) => state.login);
  const ROLE = useSelector((state) => state.role);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />

          {/* {LOGIN === 1 && ROLE === "USER" ? (
            <Route exact path="/favorites" element={<Favorites />} />
          ) : (
            <Route exact path="/favorites" element={<ErrorNotFound />} />
          )} */}
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

          {LOGIN === 1 && ROLE === "ADMIN" ? (
            <Route exact path="/allorders" element={<AllRecordSmart />} />
          ) : null}

          {LOGIN === 1 && ROLE === "ADMIN" ? (
            <Route
              exact
              path="/allorders/:idorder"
              element={<AllRecordDetailsSmart />}
            />
          ) : null}

          {LOGIN === 1 ? (
            <Route exact path="/reset-password" element={<ErrorNotFound />} />
          ) : (
            <Route exact path="/reset-password" element={<ResetPassword />} />
          )}

          <Route path="/:otherRoutes" element={<ErrorNotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

