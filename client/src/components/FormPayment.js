import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from "axios"

const stripePromise = loadStripe("pk_test_51LqNmzKNelZkcsqhA0Y4Si3IsNwEnuaalu9VlvdnXBGfQ9XQpKuNM0XsR43g2yP61kTBKHAcBrlbnaXCzEM3MEhJ00g6n3l06C")


function CheckoutForm() {
    const stripe = useStripe()
    const elements = useElements()

    async function hanledSubmit(e) {
        e.preventDefault()

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })
        if (!error) {
            const {id} = paymentMethod
            try {
                //El monto se multiplica por 100
                const { data } = await axios.post('http://localhost:3001/activities/api/checkout', {
                    id,
                    amount: 20000 
                })
                console.log(data)
                elements.getElement(CardElement).clear()
            } catch (error) {
                console.log(error)
            }

        }
    }

    return <div className="bg-[#ff99ff] flex justify-center mx-56 my-5">
        <form className="flex flex-col justify-center" onSubmit={hanledSubmit}>
            < h1> Pasarela de Pagos</h1 >
            <img className="w-64 h-80" src="https://res.cloudinary.com/dzcpdipdg/image/upload/v1664824207/samples/400x600/1-min_wzgipv.jpg" />
            <h3>Price: 100$</h3>
            <CardElement />
            <br />
            <button className="bg-[#606020] w-32 h-12" disabled={!stripe}>
                Buy
            </button>

        </form >
    </div >
}

export default function FormPayment() {

    return <div>
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>

    </div>
}