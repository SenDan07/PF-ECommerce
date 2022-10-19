import {
  GET_BOOKS,
  GET_DETAIL_BOOK,
  POST_CREATE_BOOK,
  POST_CREATE_CATEGORY,
  PUT_EDIT_BOOK,
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
  LOGOUT,
  DELETE_BOOKS,
  GET_USERS,
  DELETE_USER,
  PUT_USER,
  DELETE_CATEGORY,
  RESET_USER,
  LOGIN_WITH_GOOGLE,
  ADD_CART,
  POST_CART,
  GET_CART,
  GET_STOCK_CART,
  DELETE_CART,
  ORDER_DELETE_BOOK,
  SEARCH_DELETE_BOOK,
  RESET_DELETE_BOOKS,
  GET_RECORD_ORDERS,
  FILTER_DISPONIBILITY,
  GET_BOOK_REVIEWS,
  POST_BOOK_REVIEW,
  RESET_BOOK_REVIEWS,
  GET_USERS_REVIEWS,
  RESET_USERS_REVIEWS,
  ORDER_USERS,
  SEARCH_USERS,
  GET_ALL_RECORD_ORDERS,
  RESET_PASSWORD,
  GET_ORDER_DETAILS,
  SEARCH_ORDERS,
} from "./types";

const initialState = {
  books: [],
  detail: {},
  booksFilter: [],
  booksDeleteAdmin: [],
  booksDeleteAdminFilter: [],
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
  cart: [],
  user: {},
  bookReviews: [],
  usersReviews: [],
  recordOrders: [],
  allRecordOrders: [],
  recordDetails: [],
  stock: 0,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      let auxBookFilter = action.payload.filter((book) => book.activado);
      return {
        ...state,
        books: [...action.payload],
        booksFilter: auxBookFilter,
        booksDeleteAdmin: [...action.payload],
        booksDeleteAdminFilter: [...action.payload],
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

    case PUT_EDIT_BOOK:
      return {
        ...state,
        loading: action.payload
          ? "Datos editados con exito"
          : "No se pudo realizar la actualizacion",
      };

    case RESET_DETAIL:
      return {
        ...state,
        detail: {},
      };

    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case ORDER_NAME:
      let orderAuxName = [...state.booksByPrice];
      let orderBookName = orderAuxName.sort((a, b) => {
        /*         if (a.title.toLowerCase() <= b.title.toLowerCase()) {
                  return action.payload === "AZ" ? -1 : 1;
                }
        
                if (a.title.toLowerCase() > b.title.toLowerCase()) {
                  return action.payload === "ZA" ? -1 : 1;
                } */
        if (action.payload === "AZ") {
          return a.title.localeCompare(b.title);
        }
        if (action.payload === "ZA") {
          return b.title.localeCompare(a.title);
        }
      });
      return {
        ...state,
        booksByPrice: orderBookName,
      };

    case ORDER_DELETE_BOOK:
      let orderAuxBookDelete = [...state.booksDeleteAdminFilter];
      let orderBookDelete = orderAuxBookDelete.sort((a, b) => {
        /*         if (a.title.toLowerCase() <= b.title.toLowerCase()) {
                  return action.payload === "AZ" ? -1 : 1;
                }
                if (a.title.toLowerCase() > b.title.toLowerCase()) {
                  return action.payload === "ZA" ? -1 : 1;
                } */
        if (action.payload === "AZ") {
          return a.title.localeCompare(b.title);
        }
        if (action.payload === "ZA") {
          return b.title.localeCompare(a.title);
        }
      });
      return {
        ...state,
        booksDeleteAdminFilter: orderBookDelete,
      };

    case FILTER_DISPONIBILITY:
      let auxFilterDisponibility = [...state.booksDeleteAdmin];
      if (action.payload === "si") {
        auxFilterDisponibility = auxFilterDisponibility.filter(
          (book) => book.activado === true
        );
      }
      if (action.payload === "no") {
        auxFilterDisponibility = auxFilterDisponibility.filter(
          (book) => book.activado === false
        );
      }
      return {
        ...state,
        booksDeleteAdminFilter: auxFilterDisponibility,
      };

    case SEARCH_DELETE_BOOK:
      let auxDeleteBookAuthor = [...state.booksDeleteAdmin];
      auxDeleteBookAuthor = auxDeleteBookAuthor.filter((book) =>
        book.authors.toLowerCase().includes(action.payload.toLowerCase())
      );
      let auxDeleteBookTitle = [...state.booksDeleteAdmin];
      auxDeleteBookTitle = auxDeleteBookTitle.filter((book) =>
        book.title.toLowerCase().includes(action.payload.toLowerCase())
      );
      let resultDeleteSearch = [...auxDeleteBookTitle, ...auxDeleteBookAuthor];
      return {
        ...state,
        booksDeleteAdminFilter: resultDeleteSearch,
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
        booksByPrice: auxBookCategoryFilter,
      };

    case RESET_CATEGORY_BOOKS:
      return {
        ...state,
        booksByCategory: [],
        booksByPrice: [],
      };

    case RESET_DELETE_BOOKS:
      let auxResetDeleteBooks = [...state.books];
      return {
        ...state,
        booksDeleteAdminFilter: [...auxResetDeleteBooks],
        booksBySearch: [],
      };

    case SEARCH_BOOK:
      let auxBooksBySearch = [...action.payload];
      let BooksBySearch = auxBooksBySearch.filter(
        (book) => book.activado === true
      );
      return {
        ...state,
        booksBySearch: [...BooksBySearch],
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
      console.log(action.payload.user);
      return {
        ...state,
        login: action.payload.status,
        role: action.payload.role,
        user: action.payload.user,
      };

    case REGISTER:
      console.log(action.payload);
      return {
        ...state,
        loading: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        login: 0,
        role: "",
        user: {},
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

    case PUT_USER:
      console.log("respuesta action", action.payload);
      return {
        ...state,
        user: action.payload,
        status: action.mesg,
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
      return {
        ...state,
        booksFilter: [...bookDeleted],
      };

    case LOGIN_WITH_GOOGLE:
      // console.log(action.payload);
      return {
        ...state,
        user: action.payload.user,
        login: action.payload.user.isActive ? 1 : 0,
        role: action.payload.user.role,
      };

    case ADD_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case GET_CART:
      // console.log("Reducer llena carro", action.payload);
      return {
        ...state,
        cart: action.payload,
      };

    case POST_CART:
      return {
        ...state,
      };

    case GET_STOCK_CART:
      console.log("stock", action.payload);
      return {
        ...state,
        stock: action.payload,
      };

    case DELETE_CART:
      return {
        ...state,
      };
    case GET_BOOK_REVIEWS:
      return {
        ...state,
        bookReviews: action.payload.reverse(),
      };

    case POST_BOOK_REVIEW:
      return {
        ...state,
      };

    case RESET_BOOK_REVIEWS:
      return {
        ...state,
        bookReviews: [],
      };

    case GET_USERS_REVIEWS:
      return {
        ...state,
        usersReviews: action.payload.activeRegData.map((user) => user.id),
      };

    case RESET_USERS_REVIEWS:
      return {
        ...state,
        usersReviews: [],
      };

    case GET_RECORD_ORDERS:
      return {
        ...state,
        recordOrders: action.payload,
      };

    case ORDER_USERS:
      let auxActiveUsers = [...state.activeUsers];
      auxActiveUsers = auxActiveUsers.sort((a, b) => {
        if (action.payload === "AZNAME") {
          return a.name.localeCompare(b.name);
        }
        if (action.payload === "ZANAME") {
          return b.name.localeCompare(a.name);
        }
        if (action.payload === "AZAPE") {
          return a.lastName.localeCompare(b.lastName);
        }
        if (action.payload === "ZAAPE") {
          return b.lastName.localeCompare(a.lastName);
        }
      });
      let auxInactiveUsers = [...state.inactiveUsers];
      auxInactiveUsers = auxInactiveUsers.sort((a, b) => {
        if (action.payload === "AZNAME") {
          return a.name.localeCompare(b.name);
        }
        if (action.payload === "ZANAME") {
          return b.name.localeCompare(a.name);
        }
        if (action.payload === "AZAPE") {
          return a.lastName.localeCompare(b.lastName);
        }
        if (action.payload === "ZAAPE") {
          return b.lastName.localeCompare(a.lastName);
        }
      });
      return {
        ...state,
        activeUsers: auxActiveUsers,
        inactiveUsers: auxInactiveUsers,
      };

    case SEARCH_USERS:
      let auxSearchActiveName = [...state.activeUsers];
      auxSearchActiveName = auxSearchActiveName.filter((user) =>
        user.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      let auxSearchActiveLastname = [...state.activeUsers];
      auxSearchActiveLastname = auxSearchActiveLastname.filter((user) =>
        user.lastName.toLowerCase().includes(action.payload.toLowerCase())
      );
      let auxSearchActiveEmail = [...state.activeUsers];
      auxSearchActiveEmail = auxSearchActiveEmail.filter((user) =>
        user.email.toLowerCase().includes(action.payload.toLowerCase())
      );
      let auxSearchInactiveName = [...state.inactiveUsers];
      auxSearchInactiveName = auxSearchInactiveName.filter((user) =>
        user.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      let auxSearchInactiveLastname = [...state.inactiveUsers];
      auxSearchInactiveLastname = auxSearchInactiveLastname.filter((user) =>
        user.lastName.toLowerCase().includes(action.payload.toLowerCase())
      );
      let auxSearchInactiveEmail = [...state.inactiveUsers];
      auxSearchInactiveEmail = auxSearchInactiveEmail.filter((user) =>
        user.email.toLowerCase().includes(action.payload.toLowerCase())
      );
      let resultActiveSearch = [
        ...auxSearchActiveName,
        ...auxSearchActiveLastname,
        ...auxSearchActiveEmail,
      ];
      let resultInactiveSearch = [
        ...auxSearchInactiveName,
        ...auxSearchInactiveLastname,
        ...auxSearchInactiveEmail,
      ];
      let setActivos = [...new Set(resultActiveSearch)];
      let setInactivos = [...new Set(resultInactiveSearch)];
      return {
        ...state,
        activeUsers: setActivos,
        inactiveUsers: setInactivos,
      };

    case GET_ALL_RECORD_ORDERS:
      return {
        ...state,
        allRecordOrders: action.payload,
      };

    case RESET_PASSWORD:
      return {
        ...state,
      };

    case GET_ORDER_DETAILS:
      let auxrecordDetails = [];
      let allorders = state.allRecordOrders.data;
      allorders.forEach((e) => {
        if (e.order.id == action.payload) {
          auxrecordDetails.push(...e.order.detalle);
        }
      });
      return {
        ...state,
        recordDetails: auxrecordDetails,
      };

    /*     case SEARCH_ORDERS:
      let auxSearchOrders = [...state.allRecordOrders.data]
             let auxSearchOrdersID = auxSearchOrders.filter(order => order.order == action.payload)
            let auxSearchOrdersName = aux *
      auxSearchOrders = auxSearchOrders.filter(e => {
        e.order == action.payload ||
        e.name.toLowerCase().includes(action.payload.toLowerCase()) ||
        e.email.toLowerCase().includes(action.payload.toLowerCase())
      })
      return{
        ...state,
        allRecordOrders: auxSearchOrders
      }
 */

    default:
      return state;
  }
}

export default rootReducer;
