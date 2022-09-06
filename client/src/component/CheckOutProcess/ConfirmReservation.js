import React from 'react'
import CheckoutSteps from './CheckOutSteps';
import "./ConfirmReservation.css";
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import moment from "moment";

function ConfirmReservation() {
    const navigate = useNavigate();

    const cart_item = JSON.parse(localStorage.getItem("cart_item"));
    const address = `${cart_item.reservationDetails.address}, ${cart_item.reservationDetails.city}, ${cart_item.reservationDetails.state}`
    const diffTime = Math.abs(new Date(cart_item.dateOut) - new Date(cart_item.dateReturned));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const handleSubmit = (e) => {
        navigate("/reservation/payment");
    }

    return (
        <>
            <CheckoutSteps activeStep={1} />
            <div className='confirm_reservation my-4 mb-5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8'>
                            <div className='reservation_information'>
                                <h5 className='my-4 font-weight-bold'>Your Information</h5>
                                <div className='d_grid reservation_info'>
                                    <div>
                                        <h6>First Name</h6>
                                        <p>{cart_item.reservationDetails.firstName}</p>
                                    </div>
                                    <div>
                                        <h6>Last Name</h6>
                                        <p>{cart_item.reservationDetails.lastName}</p>
                                    </div>
                                    <div>
                                        <h6>Mobile</h6>
                                        <p>{cart_item.reservationDetails.mobile}</p>
                                    </div>
                                    <div>
                                        <h6>Age</h6>
                                        <p>{cart_item.reservationDetails.age}</p>
                                    </div>
                                    <div>
                                        <h6>Address</h6>
                                        <p>{address}</p>
                                    </div>
                                </div>

                                <div>
                                    <h5 className='my-4 font-weight-bold'>Car Information</h5>
                                    {/* <img src={bmwimg} className="w-50" /> */}
                                    <div className='d_grid reservation_info'>
                                        <div>
                                            <h6>Car Name</h6>
                                            <p>{cart_item.car.name}</p>
                                        </div>
                                        <div>
                                            <h6>Car Brand</h6>
                                            <p>{cart_item.car.brand}</p>
                                        </div>
                                        <div>
                                            <h6>Number Of Seats</h6>
                                            <p>{cart_item.car.numOfSeats}</p>
                                        </div>
                                        <div>
                                            <h6>Number Of Doors</h6>
                                            <p>{cart_item.car.numOfDoors}</p>
                                        </div>
                                        <div>
                                            <h6>Car Rent</h6>
                                            <span><h6 className='d-inline'>₹ {cart_item.car.dailyRentalRate} </h6> / day</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='billing_info my-4'>

                                <h5 className='mb-4 font-weight-bold'>Date And Time</h5>
                                <div>
                                    <div>
                                        <h6>Pick Up Date</h6>
                                        <p>{moment(cart_item.dateOut).format('DD-MM-YYYY h:mm a')}</p>
                                    </div>
                                    <div>
                                        <h6>Drop Off Date</h6>
                                        <p>{moment(cart_item.dateReturned).format('DD-MM-YYYY h:mm a')}</p>
                                    </div>
                                </div>

                                <h5 className='mt-5 mb-4 font-weight-bold'>Billing Information</h5>
                                <div>
                                    <div>
                                        <h6>Car Rent</h6>
                                        <p>₹ {cart_item.car.dailyRentalRate}</p>
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <div>
                                            <h6>Total Quntatiy</h6>
                                            <p>{cart_item.qty}</p>
                                        </div>
                                        <div className='ml-5'>
                                            <h6>Total Days</h6>
                                            <p>{diffDays}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h6><b>Total Rent</b></h6>
                                        <p className='font-weight-bold'>₹ {(cart_item.car.dailyRentalRate * cart_item.qty) * parseInt(diffDays)}</p>
                                    </div>
                                    <Button
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, backgroundColor: "rgb(32,168,217)" }}
                                        onClick={handleSubmit}
                                    >
                                        Proceed To Payment
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmReservation;