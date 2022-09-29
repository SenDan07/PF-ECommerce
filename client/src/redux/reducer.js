import { GET_BOOKS, GET_DETAIL_BOOK, RESET_DETAIL, ORDER_NAME, SEARCH_BOOK } from "./types";

const initialState = {
  books: [],
  detail: {},
  booksFilter: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: [...action.payload],
        booksFilter: [...action.payload]
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


    case ORDER_NAME:
      let orderAuxName = [...state.booksFilter]
      let orderBookName = orderAuxName.sort((a, b) => {
        if (a.title <= b.name) {
          return action.payload === "asc" ? -1 : 1
        }

        if (a.title > b.title) {
          return action.payload === "des" ? -1 : 1
        }
      })
      return {
        ...state,
        booksFilter: orderBookName
      }

      case SEARCH_BOOK:
        let searchBook = [...state.books]
        searchBook = searchBook.filter(e => e.title.toLowerCase().includes(action.payload.toLowerCase()))
        if(searchBook.length === 0){
          searchBook = [...state.books]
          alert("Libro no encontrado")
        }
        return {
          ...state,
          booksFilter: searchBook
        }


    default:
      return state;
  }
}

export default rootReducer;
