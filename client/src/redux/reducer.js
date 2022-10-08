import {
  GET_BOOKS,
  GET_DETAIL_BOOK,
  POST_CREATE_BOOK,
  POST_CREATE_CATEGORY,
  RESET_DETAIL,
  ORDER_NAME,
  SEARCH_BOOK,
  GET_ALL_CATEGORIES,
  SEARCH_AUTHOR,
  ORDER_PRICE,
  CATEGORY_BOOKS,
  RESET_SEARCH_BOOK,
  RESET_CATEGORY_BOOKS,
  FILTER_PRICE,
  REGISTER,
  LOGIN,
  SET_STATUS,
  IS_LOGIN,
  DELETE_BOOKS,
  GET_USERS,
  DELETE_USER,
  DELETE_CATEGORY,
  RESET_USER,
  LOGIN_WITH_GOOGLE,
} from "./types";

const initialState = {
  books: [],
  detail: {},
  booksFilter: [],
  categories: [],
  mostPopulars: [],
  booksBySearch: [],
  booksByCategory: [],
  booksByPrice: [],
  login: [],
  loading: "",
  role: "",
  activeUsers: [],
  inactiveUsers: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      let auxBookFilter = action.payload.filter((book) => book.activado);
      return {
        ...state,
        books: [...action.payload],
        booksFilter: auxBookFilter,
      };

    case GET_DETAIL_BOOK:
      return {
        ...state,
        detail: { ...action.payload },
      };

    case POST_CREATE_BOOK:
      return {
        ...state,
        loading: action.payload,
      };

    case POST_CREATE_CATEGORY:
      console.log(action.payload);
      return {
        ...state,
        loading: action.payload,
      };

    case RESET_DETAIL:
      return {
        ...state,
        detail: {},
      };

    case GET_ALL_CATEGORIES:
      // console.log(action.payload  )
      return {
        ...state,
        categories: action.payload,
      };

    case ORDER_NAME:
      let orderAuxName = [...state.booksByPrice];

      let orderBookName = orderAuxName.sort((a, b) => {
        if (a.title <= b.title) {
          return action.payload === "AZ" ? -1 : 1;
        }

        if (a.title > b.title) {
          return action.payload === "ZA" ? -1 : 1;
        }
      });
      return {
        ...state,
        booksByPrice: orderBookName,
      };

    case ORDER_PRICE:
      let orderAuxPrice = [...state.booksByPrice];
      let orderBookPrice = orderAuxPrice.sort((a, b) => {
        if (a.price <= b.price) {
          return action.payload === "menor" ? -1 : 1;
        }

        if (a.price > b.price) {
          return action.payload === "mayor" ? -1 : 1;
        }
      });
      return {
        ...state,
        booksByPrice: orderBookPrice,
      };

    case FILTER_PRICE:
      state.booksByPrice = [...state.booksByCategory];
      let filterAuxPrice = [...state.booksByPrice];
      let filterPrice;

      let first = action.payload.split("-")[0] * 1;
      let last = action.payload.split("-")[1] * 1;

      first === 0
        ? (filterPrice = [...filterAuxPrice])
        : first === 100
        ? (filterPrice = filterAuxPrice.filter((e) => e.price > first))
        : (filterPrice = filterAuxPrice.filter(
            (e) => e.price >= first && e.price <= last
          ));

      return {
        ...state,
        booksByPrice: filterPrice,
      };

    case CATEGORY_BOOKS:
      let auxBookCategoryFilter = action.payload.filter(
        (book) => book.activado
      );
      return {
        ...state,
        booksByCategory: auxBookCategoryFilter,
        booksByPrice: state.booksByCategory,
      };

    case RESET_CATEGORY_BOOKS:
      return {
        ...state,
        booksByCategory: [],
        booksByPrice: [],
      };

    case SEARCH_BOOK:
      return {
        ...state,
        booksBySearch: [...action.payload],
      };

    case RESET_SEARCH_BOOK:
      return {
        ...state,
        booksBySearch: [],
      };
    case SET_STATUS:
      return {
        ...state,
        loading: action.payload,
      };

    case LOGIN:
      console.log(action.payload);
      return {
        ...state,
        login: action.payload.status,
        role: action.payload.role,
      };
    case REGISTER:
      console.log(action.payload);
      return {
        ...state,
        loading: action.payload,
      };

    case IS_LOGIN:
      return {
        ...state,
        login: action.payload.login,
        role: action.payload.role,
      };

    case GET_USERS:
      return {
        ...state,
        activeUsers: action.payload.activeRegData,
        inactiveUsers: action.payload.inactiveRegData,
      };

    case DELETE_USER:
      const idUserDelete = action.payload.data.id;

      const usersActive = state.activeUsers.filter(
        (user) => user.id !== idUserDelete
      );

      const usersInactive = [...state.inactiveUsers, action.payload.data];

      return {
        ...state,
        activeUsers: usersActive,
        inactiveUsers: usersInactive,
      };

    case DELETE_CATEGORY:
      console.log(action.payload);
      // const idUserDelete = action.payload.data.id;

      // const usersActive = state.users.filter(
      // (user) => user.id !== idUserDelete
      //);
      //const usersInactive = [...state.inactiveUsers, action.payload.data];

      return {
        ...state,
        //  categories: action.payload,
        //  inactiveUsers: usersInactive,
      };

    case RESET_USER:
      const idUserReset = action.payload.data.id;
      const activeUsersReset = [...state.activeUsers, action.payload.data];
      const inactiveUsersReset = state.inactiveUsers.filter(
        (user) => user.id !== idUserReset
      );

      return {
        ...state,
        activeUsers: activeUsersReset,
        inactiveUsers: inactiveUsersReset,
      };

    case DELETE_BOOKS:
      let auxBookDeleted = [...state.books];
      let bookDeleted = auxBookDeleted.filter(
        (book) => !!book.activado === true
      );
      console.log("bookDeleted: ", bookDeleted);
      return {
        ...state,
        booksFilter: [...bookDeleted],
      };

    case LOGIN_WITH_GOOGLE:
      console.log(action.payload);
      return {
        ...state,
      };

    default:
      return state;
  }
}

export default rootReducer;

/*
case ORDER_NAME:
  let orderAuxName = [...state.booksFilter];
  let orderBookName = orderAuxName.sort((a, b) => {
    if (a.title <= b.name) {
      return action.payload === "asc" ? -1 : 1;
    }

    if (a.title > b.title) {
      return action.payload === "des" ? -1 : 1;
    }
  });
  return {
    ...state,
    booksFilter: orderBookName,
  };

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

*/

// case CATEGORY_BOOKS:
//   return {
//     ...state,
//     books: action.payload,
//   };

// case ORDER_PRIECE:
//   console.log("action.payload: ", action.payload);
//   return {
//     ...state,
//     books: action.payload.items,
//   };

// case ORDER_NAME:
//   return {
//     ...state,
//     books: action.payload,
//   };
