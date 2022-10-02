import {
  GET_BOOKS,
  GET_DETAIL_BOOK,
  POST_CREATE_BOOK,
  ORDER_NAME,
  ORDER_PRIECE,
  RESET_DETAIL,
  SEARCH_BOOK,
  GET_ALL_CATEGORIES,
  FILTER_BOOKS,
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
    let res = await axios.post(
      `http://localhost:3001/admin/create-book`,
      input
    );
    return dispatch({
      type: POST_CREATE_BOOK,
      payload: res.data,
    });
  };
}

export function orderName(value) {
  return async (dispatch) => {
    let res = await axios.get(
      `http://localhost:3001/shop/books/order?type=${value}`
    );
    return dispatch({
      type: ORDER_NAME,
      payload: res.data,
    });
  };
}

export function orderPriece(value) {
  return async (dispatch) => {
    let res = await axios.get(
      `http://localhost:3001/shop/books/orderprice?type=${value}`
    );
    console.log("res.data: ", res.data);
    return dispatch({
      type: ORDER_PRIECE,
      payload: res.data,
    });
  };
}

/* 
export function filterBooks(){
  return async (dispatch) => {
    let res = await axios.get(``);
    return dispatch({
      type: FILTER_BOOKS,
      payload: res.data
    })
  }  
}
 */

export function searchBook(book) {
  return {
    type: SEARCH_BOOK,
    payload: book,
  };
}
