import { GET_BOOKS } from "./types.js";

export const getBooks = () => (dispatch) => {
  fetch(`https://videogame-deploy-app.herokuapp.com/videogames`)
    .then((response) => response.json())
    .then((data) =>
      dispatch({
        type: GET_BOOKS,
        payload: data,
      })
    );
};
