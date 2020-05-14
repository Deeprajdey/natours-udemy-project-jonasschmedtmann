/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";
import { loadStripe } from "@stripe/stripe-js";

export const bookTour = async (tourId) => {
  try {
    const stripe = await loadStripe(
      "pk_test_JYSX8eIuJ1UErqRPcCcJn2sY00kMVKwlwz"
    );
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );

    // 2) Create checkout form + chanre credit card

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
    // console.log(session);
  } catch (err) {
    showAlert("error", err);
  }
};
