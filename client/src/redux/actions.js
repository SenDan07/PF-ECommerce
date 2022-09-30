import {
  GET_BOOKS,
  GET_DETAIL_BOOK,
  ORDER_NAME,
  RESET_DETAIL,
  SEARCH_BOOK,
} from "./types.js";
import axios from "axios";

export const getBooks = () => async (dispatch) => {
  let dataBooks = await axios(`http://localhost:3001/shop/books`);

  return dispatch({
    type: GET_BOOKS,
    payload: dataBooks.data,
  });
};

// export const getDetailBook = (payload) => ({ type: GET_DETAIL_BOOK, payload });

export const getDetailBook = (id) => async (dispatch) => {
  let bookDetail = await axios(`http://localhost:3001/shop//book/${id}`);

  return dispatch({
    type: GET_DETAIL_BOOK,
    payload: bookDetail.data,
  });
};

export const resetDetail = () => ({ type: RESET_DETAIL });

export function orderName(order) {
  return {
    type: ORDER_NAME,
    payload: order,
  };
}

export function searchBook(book) {
  return {
    type: SEARCH_BOOK,
    payload: book,
  };
}
