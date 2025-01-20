import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import './CheckoutForm.css'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import useAxiosSecure from '../../hook/useAxiosSecure'

const CheckoutForm = ({setIsOpen,item, refetch, }) => {
    const  axiosSecure = useAxiosSecure();
  const navigate = useNavigate()
  
  const [clientSecret, setClientSecret] = useState('')
  const [processing, setProcessing] = useState(false)

  const  PaymentInfo ={
    employee_id:item?.employee_id,
    month:item?.month,
    year:item?.year,
    salary:item?.salary
  }
  useEffect(() => {
    getPaymentIntent()
  }, [])

  const getPaymentIntent = async () => {
    try {
      const { data } = await axiosSecure.post('/adminpayIntent', {
        PaymentInfo
      })
      setClientSecret(data.clientSecret)
      console.log(data);
    } catch (err) {
      console.log(err)
    }
  }

  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async event => {
    setProcessing(true)
   
    event.preventDefault()

    if (!stripe || !elements) {
    
      return
    }

    
    const card = elements.getElement(CardElement)

    if (card == null) {
      setProcessing(false)
      return
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    })
    if (error) {
      setProcessing(false)
      return console.log('[error]', error)
    } else {
      console.log('[PaymentMethod]', paymentMethod)
    }
  
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name:'Johnny' ,
          email:'mdjohnny063@gmail.com',
        },
      },
    })
 
    if (paymentIntent.status === 'succeeded') {
        console.log("intent");
      try {
      
      const {data} = await axiosSecure.patch(`/adminpay/${item?.employee_id}`,{
            employee_id:item?.employee_id,
            month:item?.month,
            year:item?.year
        })
        console.log(data);
        toast.success('Pay Successful!')
        refetch()
       
      } catch (err) {
        console.log(err)
      } finally {
        setProcessing(false)
        setIsOpen(false)
      }
    }
  }

  return (
    <div>
       <form onSubmit={handleSubmit}>
      
      <h1 className='text-white font-bold'>Amount : <span className='mx-4'>{item?.salary}$</span></h1>
    <CardElement
      options={{
        style: {
          base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#9e2146',
          },
        },
      }}
    />
   
     <button  className='outline px-5 rounded-lg bg-green-600 text-white'  disabled={!stripe || !clientSecret || processing}
        type='submit'
        >Pay</button>

    
   
  </form>
  <button  className='mt-2 outline px-2 rounded-lg bg-red-600 text-white'  onClick={() => setIsOpen(false)}>Cancel</button>
  <button  />
    </div>
   
  )
}


export default CheckoutForm
