import {
  GET_BOOKS,
  GET_DETAIL_BOOK,
  POST_CREATE_BOOK,
  ORDER_NAME,
  ORDER_PRICE,
  RESET_DETAIL,
  SEARCH_BOOK,
  GET_ALL_CATEGORIES,
  CATEGORY_BOOKS,
  RESET_SEARCH_BOOK,
  RESET_CATEGORY_BOOKS,
  SET_STATUS
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
    try{
        dispatch(setStatus("Guardando"))
        var res = await axios.post(
        `http://localhost:3001/admin/create-book`,
        input
      );
      return dispatch({
        type: POST_CREATE_BOOK,
        payload: res.data,
      });
    }catch(e){
      dispatch(setStatus("Datos no se guardaron correctamente"))
    }
    
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
    try{
      dispatch(setStatus('Cargando'))
      var res = await axios.get(
      `http://localhost:3001/shop/books/filter?value=${book}`
    );
    return dispatch({
      type: SEARCH_BOOK,
      payload: res.data,
    });
    }catch(e){
      return console.log(res)
    }
      
  };
}

export function setStatus(mensaje){
  return {
    type: SET_STATUS,
    payload:mensaje
  }
}
export const resetSearchBook = () => ({ type: RESET_SEARCH_BOOK });
