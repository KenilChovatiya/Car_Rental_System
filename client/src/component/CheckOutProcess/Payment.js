import React, { useEffect, useRef } from 'react'
import { Button } from '@mui/material';
import "./Payment.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createReservation } from '../../actions/reservationAction';
import CheckoutSteps from './CheckOutSteps';
import { HashLoader, RingLoader } from "react-spinners";
import { useAlert } from "react-alert";
import { clearErrors } from '../../actions/userAction';
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import codicon from "../../images/cash-on-delivery.png"
import Swal from "sweetalert2";  

function Payment() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const [value, setValue] = React.useState(0);

    const { bookedCar, loading, error } = useSelector(
        (state) => state.reservation
    );
    const { user } = useSelector((state) => state.user);


    const cart_item = JSON.parse(localStorage.getItem("cart_item"));
    const diffTime = Math.abs(new Date(cart_item.dateOut) - new Date(cart_item.dateReturned));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const bookCar = {
        car: cart_item.car._id,
        reservationDetails: cart_item.reservationDetails,
        dateOut: cart_item.dateOut,
        dateReturned: cart_item.dateReturned,
        qty: cart_item.qty,
        rentalFee: (cart_item.car.dailyRentalRate * cart_item.qty) * diffDays,
    }

    const handleSubmitWithCard = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;

        try {
            let token = "";
            if (localStorage.getItem('profile')) {
                token = JSON.parse(localStorage.getItem('profile')).token;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
                },
            };
            const { data } = await axios.post(
                "http://localhost:4000/api/payment/process",
                { amount: (cart_item.car.dailyRentalRate * cart_item.qty) * 100, },
                config
            );

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: cart_item.reservationDetails.firstName + " " + cart_item.reservationDetails.lastName,
                        email: user.email,
                        address: {
                            line1: cart_item.reservationDetails.address,
                            city: cart_item.reservationDetails.city,
                            state: cart_item.reservationDetails.state,
                            postal_code: cart_item.reservationDetails.pinCode,
                            country: "IN",
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;

                alert.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    bookCar.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };
                    bookCar.paymentStatus = "CARD"

                    dispatch(createReservation(bookCar))
                    navigate("/MyBookedCars");
                    Swal.fire({  
                        title: 'Success',  
                        type: 'success',  
                        icon: 'success',
                        confirmButtonColor: 'rgb(32, 168, 217)',  
                        text: 'Booked Car Successfully.',  
                      }); 

                } else {
                    alert.error("There's some issue while processing payment ");
                }
            }


        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
        }
    }

    const handleSubmitCod = async () => {
        bookCar.paymentStatus = "COD";
        dispatch(createReservation(bookCar))
        Swal.fire({  
            title: 'Success',  
            type: 'success',  
            icon: 'success',
            confirmButtonColor: 'rgb(32, 168, 217)',  
            text: 'Booked Car Successfully.',  
          });  
        navigate("/MyBookedCars"); 
    }

    useEffect(() => {
        const cart_item = JSON.parse(localStorage.getItem("cart_item"));
        const diffTime = Math.abs(new Date(cart_item.dateOut) - new Date(cart_item.dateReturned));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (error) {
            alert.success("Some Error Occured");
            dispatch(clearErrors());
        }
    }, [error, alert]);

    return (
        <>
            {loading ? <div className='loader'><HashLoader size={50} color={"#20A8D9"} /></div> : (
                <>
                    <CheckoutSteps activeStep={2} />
                    <div className='container'>
                        {/* <div className='payment_info my-5'>
                            <h2 className='my-4'>Payment Method</h2>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div>
                                        <h6>Payment Mehod</h6>
                                        <p>CASH ON DELIVERY</p>
                                    </div>
                                    <div>
                                        <h6>Sub Total {cart_item.car.dailyRentalRate} * {cart_item.qty}</h6>
                                        <p>{cart_item.car.dailyRentalRate * cart_item.qty}</p>
                                    </div>
                                    <div>
                                        <h6 className='font-weight-bold'>Total Amount</h6>
                                        <p>{cart_item.car.dailyRentalRate * cart_item.qty}</p>
                                    </div>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, backgroundColor: "rgb(32,168,217)" }}
                                        onClick={handleSubmit}
                                    >
                                        Confirm Payment
                                    </Button>
                                </div>
                            </div>
                        </div> */}


                        <div className='payment_meyhod p-4 mb-5'>
                            <h3>Payment Method</h3>
                            <hr />
                            <p>Choose a Payment Method</p>
                            <div className="mynav_tab">
                                <ul className="nav nav-pills justify-content-center mynavpills" id="pills-tab" role="tablist">
                                    <li className="nav-item text-center">
                                        <a className="nav-link mb-sm-0 mb-3 active text-muted" id="pills-home-tab" data-toggle="pill" href="#card"
                                            role="tab" aria-controls="pills-home" aria-selected="true">
                                            <CreditCardIcon fontSize='large' />
                                            <h6 className='mt-2'>CREDIT / DEBIT</h6>
                                        </a>
                                    </li>
                                    <li className="nav-item text-center">
                                        <a className="nav-link mb-sm-0 mb-3 text-muted" id="pills-profile-tab" data-toggle="pill" href="#cod"
                                            role="tab" aria-controls="pills-profile" aria-selected="false">
                                            <img src={codicon} className="codimg" style={{ width: "40px" }} />
                                            <h6 className='mt-2'>PAY ON PICKUP TIME</h6>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="tab-content" id="pills-tabContent">

                                <div className="tab-pane fade show active" id="card" role="tabpanel" aria-labelledby="pills-home-tab">
                                    <div className="paymentContainer">
                                        <h6>Card Info</h6>
                                        <hr />
                                        <form className="paymentForm" onSubmit={(e) => handleSubmitWithCard(e)}>
                                            <div>
                                                <CreditCardIcon />
                                                <CardNumberElement className="paymentInput" />
                                            </div>
                                            <div>
                                                <EventIcon />
                                                <CardExpiryElement className="paymentInput" />
                                            </div>
                                            <div>
                                                <VpnKeyIcon />
                                                <CardCvcElement className="paymentInput" />
                                            </div>

                                            <input
                                                type="submit"
                                                value={`Pay - ₹${cart_item && cart_item.car.dailyRentalRate * cart_item.qty}`}
                                                ref={payBtn}
                                                className="paymentFormBtn"
                                            />
                                        </form>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="cod" role="tabpanel" aria-labelledby="pills-profile-tab">
                                    <div className='payment_info mt-4'>
                                        <div>
                                            <p>You will be able to give cash on pick up time</p>
                                        </div>
                                        <hr />
                                        <div className='w-50 mx-auto text-center'>
                                            <div>
                                                <h6 className='font-weight-bold' >Sub Total {cart_item.car.dailyRentalRate} * {cart_item.qty}</h6>
                                                <p className='font-weight-bold text-muted'>{cart_item.car.dailyRentalRate * cart_item.qty}</p>
                                            </div>
                                            <div>
                                                <h6 className='font-weight-bold'>Total Amount</h6>
                                                <p className='font-weight-bold text-muted'>{cart_item.car.dailyRentalRate * cart_item.qty}</p>
                                            </div>

                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, backgroundColor: "rgb(32,168,217)" }}
                                                onClick={handleSubmitCod}
                                            >
                                                PAY ON Pickup Time
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Payment;