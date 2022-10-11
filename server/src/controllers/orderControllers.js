const HttpError = require("../errors/http-error");

const { Categories, Books, Order, Detalle, User } = require("../db");
const Stripe = require("stripe");

const orderControllers = {
  createOrder: async (req, res) => {
    try {
      const { UserId, direccion, total, telefono, pais, carrito, id } =
        req.body;

      const stripe = new Stripe(process.env.CLAVE_SECRETA_STRIPE);

      //   console.log({ UserId,direccion, total,telefono,pais,carrito,id})
      const payment = await stripe.paymentIntents.create({
        amount: total,
        currency: "USD",
        description: "Books",
        payment_method: id,
        confirm: true,
      });
      // console.log(payment)

      const order = await Order.create({
        UserId,
        direccion,
        telefono,
        pais,
        total,
      });

      let namesBooks = carrito.map((el) => el.title);
      const books = await Books.findAll({ where: { title: namesBooks } });
      console.log(books);
      //pedido.addProduct(products,{ through: { cantidad: 5 } });

      books.forEach(async (element, index) => {
        // console.log(carrito)
        const det = await Detalle.create({
          BookId: element.id,
          orderId: order.id,
          cantidad: carrito[index].cantidad,
        });
        //   console.log(det)
      });

      res.status(200).json(true);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  },
};

module.exports = orderControllers;
