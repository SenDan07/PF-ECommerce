import { GET_BOOKS, GET_DETAIL_BOOK, ORDER_NAME, RESET_DETAIL, SEARCH_BOOK } from "./types.js";

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


export function orderName(order) {
  return {
    type: ORDER_NAME,
    payload: order
  }
}

export function searchBook(book){
  return {
    type: SEARCH_BOOK,
    payload: book
  }
}