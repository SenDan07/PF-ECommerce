import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51LqNmzKNelZkcsqhA0Y4Si3IsNwEnuaalu9VlvdnXBGfQ9XQpKuNM0XsR43g2yP61kTBKHAcBrlbnaXCzEM3MEhJ00g6n3l06C"
);

// const stripePromise = loadStripe(
//   "pk_test_51LrhdADD3n1DlZme5rNKcMnzhpKbXNBCLT4CI2EQwVrMGSamEv7o277x4MdBtiMhG5j9l8MkJ4UNqoNtYWf4TydS00eh2jXt9c"
// );

function CheckoutForm({ user }) {
  const stripe = useStripe();
  const elements = useElements();

  async function hanledSubmit(e) {
    e.preventDefault();
    console.log(user);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log(paymentMethod);

      const { id } = paymentMethod;
      /*try {
                let cart = JSON.parse(localStorage.getItem("bookDetail"));
                //El monto se multiplica por 100
                const { data } = await axios.post('http://localhost:3001/checkout/create', {
                    id,
                    userId:"db71b0e6-ccd4-4e8f-96f0-cb284ceaead9",
                    total: 20000,
                    direccion:props.user.address,
                    telefono: props.user.phone,
                    pais:props.user.country,
                    carrito:cart
                })
                console.log(paymentMethod)
                elements.getElement(CardElement).clear()
            } catch (error) {
                console.log(error)
            }*/
    }
  }

  return (
    <div className="bg-[#a3a3a3] flex flex-col justify-left">
      <CardElement />
      <br />
      <button
        onClick={hanledSubmit}
        className="border-1 border-rose-500 rounded w-max mx-auto px-3 py-2 bg-button text-white"
        disabled={!stripe}
      >
        Procesar compra
      </button>
    </div>
  );
}

export default function FormPayment() {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
