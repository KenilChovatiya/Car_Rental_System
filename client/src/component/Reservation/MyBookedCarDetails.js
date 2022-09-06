import React, { useEffect } from "react";
import "./MyBookedCarDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { cancelRentalCar, clearErrors, getBookedCarDetails } from "../../actions/reservationAction";
import { HashLoader, RingLoader } from "react-spinners";
import moment from "moment";


function MyBookedCarDetails() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();
    const navigate = useNavigate();


    const { bookedCar, error, loading } = useSelector((state) => state.bookedCarDetails);
    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.rentalCar
    );

    const address = bookedCar && `${bookedCar?.reservationDetails?.address}, ${bookedCar?.reservationDetails?.city}, ${bookedCar?.reservationDetails?.state}`
    const diffTime = Math.abs(new Date(bookedCar?.dateOut) - new Date(bookedCar?.dateReturned));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const handleDeleteBookedCar = () => {
        dispatch(cancelRentalCar(params.id));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error("Some Error Occured");
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Your Booked Car Canceled Successfully");
            navigate("/myBookedCars");
            dispatch({ type: "DELETE_RESERVATION_RESET" });
        }

        dispatch(getBookedCarDetails(params.id));
    }, [dispatch, alert, error, params.id, deleteError, isDeleted, navigate]);

    return (
        <>
            {loading ? <div className='loader'><HashLoader size={50} color={"#20A8D9"} /></div> : (

                <>
                    <div className='container'>
                        <div className='booked_car_info my-5'>
                            <h3 className='my-4'>Booked Car Details</h3>
                            {bookedCar &&
                                <div className='booked_car_details'>
                                    <div className="d-flex justify-content-between align-items-flex-start mb-4">
                                        <div>
                                            <h6 className="text-muted">Booked car id: {bookedCar?._id}</h6>
                                            <h6 className="text-muted">Booked car on: {moment(bookedCar?.createdAt).format('MMM Do YYYY, h:mm a')}</h6>
                                        </div>

                                        <div className="">
                                            <button
                                                className='btn btn-outline-danger border_radius-12 text-center'
                                                disabled={new Date() > new Date(bookedCar?.dateOut) ? true : false}
                                                onClick={handleDeleteBookedCar}
                                            >Cancel</button>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="d_grid booked_car_information">
                                                <div className="bookedcar_img">
                                                    <img src={bookedCar?.car?.images && bookedCar?.car?.images[0].url} className="w-100" />
                                                </div>
                                                <div className="car_details">
                                                    <h4 className="m-0 mb-2">{bookedCar?.car?.name}</h4>
                                                    <p className="m-0 mb-2">{bookedCar?.car?.type}</p>
                                                    <p className="m-0 mb-2">Total Seats: {bookedCar?.car?.numOfSeats}</p>
                                                    <p className="m-0 mb-2">Total Doors: {bookedCar?.car?.numOfDoors}</p>
                                                    <p className="m-0 mb-2 font-weight-bold">₹{bookedCar?.car?.dailyRentalRate} x {bookedCar?.qty} x {diffDays}d </p>
                                                </div>
                                            </div>

                                            <div className='d-flex mt-5 booked_car_date'>
                                                <div>
                                                    <h6 className='text-muted mb-1 font-weight-bold'>Pick Up Date</h6>
                                                    <p>{moment(bookedCar?.dateOut).format('DD-MM-YYYY h:mm a')}</p>
                                                </div>
                                                <div className="ml-5">
                                                    <h6 className='text-muted mb-1 font-weight-bold'>Dropp off Date</h6>
                                                    <p>{moment(bookedCar?.dateReturned).format('DD-MM-YYYY h:mm a')}</p>
                                                </div>
                                            </div>

                                            <div className="my-5 ">
                                                <h4>Your Information</h4>
                                                <div className='d_grid mt-4 booked_car_reservation_info'>
                                                    <div>
                                                        <h6>First Name</h6>
                                                        <p>{bookedCar?.reservationDetails?.firstName}</p>
                                                    </div>
                                                    <div>
                                                        <h6>Last Name</h6>
                                                        <p>{bookedCar?.reservationDetails?.lastName}</p>
                                                    </div>
                                                    <div>
                                                        <h6>Mobile</h6>
                                                        <p>{bookedCar?.reservationDetails?.mobile}</p>
                                                    </div>
                                                    <div>
                                                        <h6>Age</h6>
                                                        <p>{bookedCar?.reservationDetails?.age}</p>
                                                    </div>
                                                    <div>
                                                        <h6>Address</h6>
                                                        <p>{address && address}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="booked_car_reservation_info2">
                                                <div>
                                                    <h6>Status</h6>
                                                    <p className={
                                                        bookedCar?.status === "Processing" ? "text-danger" : "text-success"
                                                    }>{bookedCar?.status}</p>
                                                </div>

                                                <div>
                                                    <h6>Payment</h6>
                                                    <p>{bookedCar?.paymentStatus}</p>
                                                </div>

                                                <div className="mt-5">
                                                    <h5 className='mb-4 font-weight-bold'>Billing Information</h5>

                                                    <div>
                                                        <h6>Car Rent</h6>
                                                        <p>₹ {bookedCar?.car?.dailyRentalRate}</p>
                                                    </div>
                                                    <div>
                                                        <h6>Total Quntatiy</h6>
                                                        <p>{bookedCar?.qty}</p>
                                                    </div>
                                                    <div>
                                                        <h6>Total Days</h6>
                                                        <p>{diffDays}</p>
                                                    </div>
                                                    <div>
                                                        <h6><b>Total Rent</b></h6>
                                                        <p>₹ {bookedCar?.rentalFee}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                </>
            )}
        </>
    )
}

export default MyBookedCarDetails