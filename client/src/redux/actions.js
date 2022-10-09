import {
  GET_BOOKS,
  GET_DETAIL_BOOK,
  POST_CREATE_BOOK,
  POST_CREATE_CATEGORY,
  ORDER_NAME,
  ORDER_PRICE,
  RESET_DETAIL,
  SEARCH_BOOK,
  GET_ALL_CATEGORIES,
  CATEGORY_BOOKS,
  RESET_SEARCH_BOOK,
  RESET_CATEGORY_BOOKS,
  FILTER_PRICE,
  LOGIN,
  REGISTER,
  SET_STATUS,
  IS_LOGIN,
  DELETE_BOOKS,
  GET_USERS,
  DELETE_USER,
  DELETE_CATEGORY,
  RESET_USER,
  LOGIN_WITH_GOOGLE,
} from "./types.js";
import axios from "axios";

export const getBooks = () => async (dispatch) => {
  let dataBooks = await axios(`http://localhost:3001/shop/books`);

  return dispatch({
    type: GET_BOOKS,
    payload: dataBooks.data,
  });
};

export const getDetailBook = (id) => async (dispatch) => {
  let bookDetail = await axios(`http://localhost:3001/shop//book/${id}`);

  return dispatch({
    type: GET_DETAIL_BOOK,
    payload: bookDetail.data,
  });
};

export const resetDetail = () => ({ type: RESET_DETAIL });

export function getAllCategories() {
  return async (dispatch) => {
    let res = await axios.get(`http://localhost:3001/shop/categories`);
    return dispatch({
      type: GET_ALL_CATEGORIES,
      payload: res.data,
    });
  };
}

export function postCreateBook(input) {
  return async (dispatch) => {
    try {
      dispatch(setStatus("Guardando"));
      var res = await axios.post(
        `http://localhost:3001/admin/create-book`,
        input
      );
      return dispatch({
        type: POST_CREATE_BOOK,
        payload: res.data,
      });
    } catch (e) {
      dispatch(setStatus("Datos no se guardaron correctamente"));
    }
  };
}

export function postCreateCategory(input) {
  return async (dispatch) => {
    try {
      dispatch(setStatus("Guardando"));
      var res = await axios.post(
        `http://localhost:3001/admin/create-category`,
        input
      );
      return dispatch({
        type: POST_CREATE_CATEGORY,
        payload: res.data,
      });
    } catch (e) {
      dispatch(setStatus("Datos no se guardaron correctamente"));
    }
  };
}

export function orderName(order) {
  return {
    type: ORDER_NAME,
    payload: order,
  };
}

export function orderPrice(order) {
  return {
    type: ORDER_PRICE,
    payload: order,
  };
}

export function filterPrice(price) {
  return {
    type: FILTER_PRICE,
    payload: price,
  };
}

export function categoryBooks(category) {
  return async (dispatch) => {
    let res = await axios.get(
      `http://localhost:3001/shop/booksCategory?name=${category}`
    );
    return dispatch({
      type: CATEGORY_BOOKS,
      payload: res.data,
    });
  };
}

export const resetCategoryBooks = () => ({ type: RESET_CATEGORY_BOOKS });

export function searchBook(book) {
  return async (dispatch) => {
    try {
      dispatch(setStatus("Cargando"));
      var res = await axios.get(
        `http://localhost:3001/shop/books/filter?value=${book}`
      );
      return dispatch({
        type: SEARCH_BOOK,
        payload: res.data,
      });
    } catch (e) {
      return console.log(res);
    }
  };
}

export function login(body) {
  return async (dispatch) => {
    let res = await axios.post(`http://localhost:3001/users/login`, body);

    return dispatch({
      type: LOGIN,
      payload: res.data,
    });
  };
}

export function deleteBook(idBook) {
  return async (dispatch) => {
    let res = await axios.delete(`http://localhost:3001/admin/books/${idBook}`);
    return dispatch({
      type: DELETE_BOOKS,
      payload: res.data,
    });
  };
}

export function register(body) {
  console.log(body);
  return async (dispatch) => {
    try {
      dispatch(setStatus("Guardando"));
      let res = await axios.post("http://localhost:3001/users/register", body);

      return dispatch({
        type: REGISTER,
        payload: res.data.status
          ? "Usuario se guardo correctamente"
          : res.data.messsage,
      });
    } catch (e) {
      dispatch(setStatus("Datos no se guardaron correctamente"));
    }
  };
}
export function setStatus(mensaje) {
  return {
    type: SET_STATUS,
    payload: mensaje,
  };
}

export const resetSearchBook = () => ({ type: RESET_SEARCH_BOOK });

export const isLogin = (data) => {
  return {
    type: IS_LOGIN,
    payload: data,
  };
};

export const getUsers = () => async (dispatch) => {
  let dataBooks = await axios(`http://localhost:3001/users/allUsers`);

  return dispatch({
    type: GET_USERS,
    payload: dataBooks.data,
  });
};

export const deleteUser =
  (idUser, data = { isActive: "false" }) =>
  async (dispatch) => {
    let usersActive = await axios.put(
      `http://localhost:3001/users/${idUser}`,
      data
    );

    return dispatch({
      type: DELETE_USER,
      payload: usersActive.data,
    });
  };

export function deleteCategory(idCategory) {
  return async (dispatch) => {
    const res = await axios.delete(
      `http://localhost:3001/admin/category/${idCategory}`
    );

    return dispatch({
      type: DELETE_CATEGORY,
      payload: res.data,
    });
  };
}
// (idUser, data = { isActive: "false" }) =>

export const resetUser =
  (idUser, data = { isActive: "true" }) =>
  async (dispatch) => {
    let users = await axios.put(`http://localhost:3001/users/${idUser}`, data);

    return dispatch({
      type: RESET_USER,
      payload: users.data,
    });
  };

export function loginWithGoogle(info) {
  return async (dispatch) => {
    const response = await axios.post(
      `http://localhost:3001/users/google`,
      info
    );

    return dispatch({
      type: LOGIN_WITH_GOOGLE,
      payload: response.data,
    });
  };
}

// export function orderName(value) {
//   return async (dispatch) => {
//     let res = await axios.get(
//       `http://localhost:3001/shop/books/order?type=${value}`
//     );
//     return dispatch({
//       type: ORDER_NAME,
//       payload: res.data,
//     });
//   };
// }

// export function orderPriece(value) {
//   return async (dispatch) => {
//     let res = await axios.get(
//       `http://localhost:3001/shop/books/orderprice?type=${value}`
//     );
//     return dispatch({
//       type: ORDER_PRIECE,
//       payload: res.data,
//     });
//   };
// }
