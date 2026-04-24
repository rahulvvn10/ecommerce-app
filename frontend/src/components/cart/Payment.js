import { useElements, useStripe } from "@stripe/react-stripe-js";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
import { createOrder } from "../../actions/orderActions";
import { clearError } from "../../slices/orderSlice";

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Cache orderInfo ONCE (survives sessionStorage clearing)
  const [orderInfo] = useState(() => {
    const data = sessionStorage.getItem("orderInfo");
    return data ? JSON.parse(data) : null;
  });

  const { user } = useSelector(state => state.authState);
  const { items: cartItems, shippingInfo } = useSelector(
    state => state.cartState
  );
  const {error: orderError} = useSelector(state => state.orderState);

  // ✅ Flag for StrictMode-safe navigation
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // ✅ Redirect if orderInfo missing
  useEffect(() => {
    if (!orderInfo) {
      navigate("/cart");
    }
    if(orderError){
      toast.error(orderError, {
        position: "bottom-center",
        onOpen: () => dispatch(clearError())
      })
      
    }
  }, [orderInfo, navigate,orderError,dispatch]);

  // ✅ Handle navigation + cleanup SAFELY
  useEffect(() => {
    if (paymentSuccess) {
      navigate("/order/success");
      dispatch(orderCompleted());
    }
  }, [paymentSuccess, navigate, dispatch]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    document.querySelector("#pay_btn").disabled = true;

    try {
      // ✅ Create paymentData ONLY when needed
      const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
        shipping: {
          name: user.name,
          address: {
            city: shippingInfo.city,
            postal_code: shippingInfo.postalCode,
            country: shippingInfo.country,
            state: shippingInfo.state,
            line1: shippingInfo.address
          },
          phone: shippingInfo.phoneNo
        }
      };

      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData
      );

      const result = await stripe.confirmCardPayment(
        data.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: user.name,
              email: user.email
            }
          }
        }
      );

      if (result.error) {
        toast(result.error.message, {
          type: "error",
          position: "bottom-center"
        });
        document.querySelector("#pay_btn").disabled = false;
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        toast("Payment Success!", {
          type: "success",
          position: "bottom-center"
        });

        console.log({
    orderItems: cartItems,

    shippingInfo,

    itemsPrice: orderInfo.itemsPrice,
    taxPrice: orderInfo.taxPrice,
    shippingPrice: orderInfo.shippingPrice,
    totalPrice: orderInfo.totalPrice,

    paymentInfo: {
      id: result.paymentIntent.id,
      status: result.paymentIntent.status
    }
  })
        dispatch(
  createOrder({
    orderItems: cartItems,

    shippingInfo,

    itemsPrice: orderInfo.itemsPrice,
    taxPrice: orderInfo.taxPrice,
    shippingPrice: orderInfo.shippingPrice,
    totalPrice: orderInfo.totalPrice,

    paymentInfo: {
      id: result.paymentIntent.id,
      status: result.paymentIntent.status
    }
  })
);



        setPaymentSuccess(true);
      }

    } catch (error) {
      console.error(error);
      document.querySelector("#pay_btn").disabled = false;
    }
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form onSubmit={submitHandler} className="shadow-lg">
          <h1 className="mb-4">Card Info</h1>

          <div className="form-group">
            <label htmlFor="card_num_field">Card Number</label>
            <CardNumberElement
              id="card_num_field"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="card_exp_field">Card Expiry</label>
            <CardExpiryElement
              id="card_exp_field"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="card_cvc_field">Card CVC</label>
            {/* ❌ DO NOT control Stripe Elements */}
            <CardCvcElement
              id="card_cvc_field"
              className="form-control"
            />
          </div>

          <button
            id="pay_btn"
            type="submit"
            className="btn btn-block py-3"
            disabled={!stripe}
          >
            Pay - ${orderInfo ? orderInfo.totalPrice : 0}
          </button>
        </form>
      </div>
    </div>
  );
}
