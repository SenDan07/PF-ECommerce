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

    return <div className="bg-[#a3a3a3] flex flex-col justify-left">
                            
            <CardElement />
            <br />
            <button onSubmit={hanledSubmit} className="border-1 border-rose-500 rounded w-max mx-auto px-3 py-2 bg-button text-white" disabled={!stripe}>
               Procesar compra
            </button>
    </div >
}

export default function FormPayment() {

    return <div>
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>

    </div>
}