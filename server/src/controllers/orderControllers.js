const axios = require("axios");
const { format } = require("morgan");
const Stripe = require("stripe");
const HttpError = require("../errors/http-error");
const { Categories, Books, Order, Detalle, User } = require("../db");

const orderControllers = {
  createOrder: async (req, res) => {
    try {
      const {
        UserId,
        nombreCompleto,
        direccion,
        total,
        email,
        telefono,
        pais,
        carrito,
        id,
      } = req.body;

     /* for (item of carrito) {
        if (item.cantidad > item.stock) {
          const error = new HttpError(
            `No hay suficientes copias del libro ${item.title} para cubrir el pedido. Se ha cancelado la orden.`
          );
          return next(error);
        }
      }*/

      const stripe = new Stripe(process.env.CLAVE_SECRETA_STRIPE);

      let totalFormat = Math.ceil(parseFloat(total) * 100);

      console.log({
        UserId,
        nombreCompleto,
        direccion,
        total,
        email,
        telefono,
        pais,
        carrito,
        id,
      });

      const payment = await stripe.paymentIntents.create({
        amount: totalFormat,
        currency: "USD",
        description: "Books",
        payment_method: id,
        confirm: true,
      });

      const order = await Order.create({
        UserId,
        direccion,
        telefono,
        pais,
        total,
      });

      let namesBooks = carrito.map((el) => el.title);
      const books = await Books.findAll({ where: { title: namesBooks } });

      books.sort(function (a, b) {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });

      carrito.sort(function (a, b) {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });

      books.forEach(async (element, index) => {
        console.log(carrito);
        console.log(books)
        await Books.update(
          {
            stock:element.stock -carrito[index].cantidad,
          },
          {
            where: {
              id: element.id,
            },
          }
        );

        const det = await Detalle.create({
          BookId: element.id,
          orderId: order.id,
          cantidad: carrito[index].cantidad,
        });
        console.log(det);
      });

      if (payment.status === "succeeded") {
        await axios.post("http://localhost:3001/alert/email", {
          emails: email,
          subject: `Orden ID:${id} confirmada`,
          content: `
              <div>
                <h1>Libreria PF</h1>
                <h4>ORDEN ID:${id}</h4>
                <h3>Gracias por tu compra!</h3>
                <p>Hola ${nombreCompleto}, estamos preparando su pedido para ser enviado. Le notificaremos cuando se haya despachado.</p>
              </div>
              `,
        });
      }

      res.status(200).json(true);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  },
  getOrders: async (req, res) => {
    const { idUser } = req.params;

    const orders = await Order.findAll({
      where: { UserId: idUser },
      include: Books,
    });

    let refactorOrder = orders.map((el) => {
      return {
        id: el.id,
        direccion: el.direccion,
        telefono: el.telefono,
        pais: el.pais,
        total: el.total,
        fecha: el.createdAt,
        detalle: el.Books.map((el) => {
          return {
            title: el.title,
            price: el.price,
            cantidad: el.detalle.cantidad,
            sutTotal: el.detalle.cantidad * el.price,
          };
        }),
      };
    });
    res.status(200).json(refactorOrder);
  },
};

module.exports = orderControllers;
