
const HttpError = require("../errors/http-error");

const { Categories, Books,Order,Detalle,User } = require("../db");
const Stripe=require('stripe');
const { format } = require("morgan");

const orderControllers = {
    createOrder:async (req, res) => {

        try {
           const { UserId,direccion, total,telefono,pais,carrito,id} = req.body;
  
  const stripe= new Stripe(process.env.CLAVE_SECRETA_STRIPE)
           
  console.log({ UserId,direccion, total,telefono,pais,carrito,id})
      const payment=await stripe.paymentIntents.create({
          amount:total,
          currency:"USD",
          description:"Books",
          payment_method:id,
          confirm:true
      })
      console.log(payment)
  
           const order = await Order.create({
              UserId,
              direccion,
              telefono,
              pais,
              total
           })
       

           let namesBooks = carrito.map(el => el.title)
           const books = await Books.findAll({ where: { title: namesBooks } });
           console.log(books)
           //pedido.addProduct(products,{ through: { cantidad: 5 } });
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
            console.log(carrito)
            
               const det=await Detalle.create({
                  BookId: element.id,
                  orderId: order.id,
                  cantidad: carrito[index].cantidad
               })
               console.log(det)
            
            
           });

           
           res.status(200).json(true)
        } catch (error) {
         console.log(error)
           res.status(400).json({error})
        }
     },
     getOrders:async(req,res)=>{
      const { idUser }=req.params;

     /* const orders=await Order.findAll({
         where:{
           UserId:idUser
         },
         include: [
           {
             model: Detalle,
             include: [Books]
           }
           
         ]
       })*/

      const orders=await Order.findAll({
         where:{UserId:idUser},
         include:Books
       })

       let refactorOrder=orders.map(el=>{
         return {
            direccion:el.direccion,
            telefono:el.telefono,
            pais:el.pais,
            total:el.total/100,
            fecha:el.createdAt,
            detalle:el.Books.map(el=>{
               return {
                  title:el.title,
                  price:el.price,
                  cantidad:el.detalle.cantidad,
                  sutTotal:el.detalle.cantidad*el.price
               }
            })
            
         }
       })
       res.status(200).json(refactorOrder)

     }
};

module.exports = orderControllers;