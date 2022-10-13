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
          bookId: bookId,
        },
      });
      return res.status(200).send(bookRevs);
    } catch (err) {
      const error = new HttpError(
        "No se han encontrado reseñas para este libro",
        404
      );
      return next(error);
    }
  },

  fetchReviewsByUser: async (req, res, next) => {
    const { userId } = req.params;
    try {
      if (!userId) {
        const error = new HttpError("No se ha detectado ningún usuario", 400);
        return next(error);
      }
      const userRevs = await Review.findAll({
        where: {
          userId: userId,
        },
      });
      return res.status(200).send(userRevs);
    } catch (err) {
      const error = new HttpError(
        "No se han encontrado reseñas para este usuario",
        404
      );
      return next(error);
    }
  },
  
  postNewReview: async (req, res, next) => {
    const { score, comment } = req.body;
    const { userId, bookId } = req.params;
    try {
      if (!score || !comment) {
        const error = new HttpError(
          "Necesita llenar todos los campos para proceder",
          422
        );
        return next(error);
      }
      const createReview = await Review.create({
        score,
        comment,
        userId,
        bookId,
      });
      return res.status(201).send(createReview);
    } catch (err) {
      const error = new HttpError(
        "No se ha podido guardar la reseña, por favor intente nuevamente",
        500
      );
      return next(error);
    }
  },
};
