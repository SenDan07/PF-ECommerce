const HttpError = require("../errors/http-error");
const { Review } = require("../db");

const reviewControllers = {
  fetchallReviews: async (req, res, next) => {
    try {
      const allReviews = await Review.findAll();
      return res.status(200).json(allReviews);
    } catch (err) {
      const error = new HttpError("No hay reseñas en la base de datos", 404);
      return next(error);
    }
  },
  fetchReviewsByBook: async (req, res, next) => {
    const { bookId } = req.params;
    try {
      if (!bookId) {
        const error = new HttpError("No se ha seleccionado ningún libro", 400);
        return next(error);
      }
      const bookRevs = await Review.findAll({
        where: {
          id: bookId,
        },
      });
      return res.status(200).send(bookRevs);
    } catch (err) {
      const error = new HttpError("No se han encontrado reseñas", 404);
      return next(error);
    }
  },
  fetchReviewsByUser: async(req, res, next) => {
    const {userId} = req.params;
    try {
      const userRevs = await Review.findAll({
        where: {
          
        }
      })
    } catch (error) {
      
    }
  },
};
