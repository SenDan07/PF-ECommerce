import { GET_BOOKS, GET_DETAIL_BOOK, RESET_DETAIL } from "./types";

const initialState = {
  books: [],
  detail: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: [...action.payload],
      };

    case GET_DETAIL_BOOK:
      // console.log(action.payload);
      return {
        ...state,
        detail: state.books.filter((book) => book.id === action.payload)[0],
      };

    case RESET_DETAIL:
      return {
        ...state,
        detail: {},
      };

    default:
      return state;
  }
}

export default rootReducer;
