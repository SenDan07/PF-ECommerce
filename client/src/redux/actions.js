import axios from "axios"
import { GET_BOOKS, GET_DETAIL_BOOK, ORDER_NAME, RESET_DETAIL, SEARCH_BOOK, GET_ALL_CATEGORIES, SEARCH_AUTHOR } from "./types.js";

export const getBooks = () => (dispatch) => {
  fetch(`http://localhost:3001/shop/books`)
    .then((response) => response.json())
    .then((data) =>
      dispatch({
        type: GET_BOOKS,
        payload: data,
      })
    );
};

export const getDetailBook = (payload) => ({ type: GET_DETAIL_BOOK, payload });

export const resetDetail = () => ({ type: RESET_DETAIL });


export function getAllCategories() {
  return async (dispatch) => {
    let res = await axios.get(`http://localhost:3001/shop/categories`)
    return dispatch({
      type: GET_ALL_CATEGORIES,
      payload: res.data
    })
  }
}


export function orderName(value) {
  return async (dispatch) => {
    let res = await axios.get(`http://localhost:3001/shop/books/order?type=${value}`)
    console.log("res: ", res.data)
    return dispatch({
      type: ORDER_NAME,
      payload: res.data
    })
  }

}

/* export function searchAuthor(author){
  return async (dispatch) => {
    let res = await axios.get(`http://localhost:3001/shop`)
  }
} */

/* 

export function searchBook(book){
  return {
    type: SEARCH_BOOK,
    payload: book
  }
} */