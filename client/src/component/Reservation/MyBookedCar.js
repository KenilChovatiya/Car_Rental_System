import * as React from 'react';
import "./MyBookedCar.css";
import { useSelector, useDispatch } from "react-redux";
import { cancelRentalCar, clearErrors, myBookedCars } from '../../actions/reservationAction';
import { HashLoader, RingLoader } from "react-spinners";
import moment from "moment";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import sadimg from "../../images/sadimg-removebg-preview.png";

export default function MyBookedCar() {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.rentalCar
    );

    const { bookedCars, loading, error } = useSelector(
        (state) => state.myRentalCars
    );


    const handleDeleteBookedCar = (id) => {
        dispatch(cancelRentalCar(id));
    }


    React.useEffect(() => {
        if (error) {
            alert.error("Some Error Occured");
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error("Some Error Occured");
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Your Booked Car Canceled Successfully");
            dispatch({ type: "DELETE_RESERVATION_RESET" });
        }

        dispatch(myBookedCars());

    }, [dispatch, error, deleteError, isDeleted, alert])


    return (
        <>
            {loading ? <div className='loader'><HashLoader size={50} color={"#20A8D9"} /></div> : (
                <div className='container'>
                    <div className='booked_car_info my-5'>
                        <h3 className='my-4'>My Booked Car</h3>
                        <div className='booked_cars'>
                            {bookedCars && bookedCars.length > 0 ?
                                bookedCars.map((bookedCar) => {
                                    return (
                                        <div key={bookedCar._id} className='d-flex justify-content-between align-items-center p-4 my-3 border_radius-20 booked_car_div'>
                                            <Link to={`/myBookedCar/${bookedCar._id}`} className="text-dark d_grid booked_car">
                                                <div className='booked_car_img'>
                                                    <img src={bookedCar?.car?.images && bookedCar?.car?.images[0].url} className="w-75" />
                                                </div>
                                                <div className='booked_car_info'>
                                                    {
                                                        !bookedCar.car ? <p className='text-danger'>Opps! Car Are Not Available</p> : (
                                                            <>
                                                                <h5>{bookedCar.car.name}</h5>
                                                                <p className='mb-0 text-muted'>{bookedCar.car.type}</p>
                                                                <p className='mb-2 text-muted'>Quntatiy: {bookedCar.qty}</p>
                                                                <p className='m-0 font-weight-bolder'>₹ {bookedCar.rentalFee}</p>
                                                            </>
                                                        )
                                                    }
                                                </div>
                                                <div className='booked_car_status'>
                                                    <h6 className='text-muted mb-1 font-weight-bold'>Status</h6>
                                                    <p className={
                                                        bookedCar.status === "Processing" ? "text-danger" : "text-success"
                                                    }>{bookedCar.status}</p>
                                                </div>
                                                <div className='booked_car_date d-md-inline-block d-none'>
                                                    <div>
                                                        <h6 className='text-muted mb-1 font-weight-bold'>Pick Up Date</h6>
                                                        <p>{moment(bookedCar.dateOut).format('DD-MM-YYYY h:mm a')}</p>
                                                    </div>
                                                    <div>
                                                        <h6 className='text-muted mb-1 font-weight-bold'>Dropp off Date</h6>
                                                        <p>{moment(bookedCar.dateReturned).format('DD-MM-YYYY h:mm a')}</p>
                                                    </div>
                                                </div>

                                                <div className='booked_car_date'>
                                                    <h6 className='text-muted mb-1 font-weight-bold'>Created At</h6>
                                                    <p className='text-success'>{new Date(bookedCar.createdAt).toDateString()}</p>
                                                </div>
                                            </Link>
                                            <div className='booked_car_date text-right d-md-inline-block d-none'>
                                                <Link to={`/myBookedCar/${bookedCar._id}`} className='btn btn-outline-info border_radius-12 text-center mb-lg-3 mb-md-0 mb-3 mr-lg-0 mr-md-3 mr-0 btn_vc'>view</Link>

                                                <button
                                                    className='btn btn-outline-danger border_radius-12 text-center btn_vc'
                                                    onClick={() => { handleDeleteBookedCar(bookedCar._id) }}
                                                    disabled={new Date() > new Date(bookedCar.dateOut) ? true : false}
                                                >Cancel</button>

                                            </div>
                                        </div>
                                    );
                                })

                                :

                                (
                                    <div className='text-center booked_car_list_empty '>
                                        <img src={sadimg} alt="List Empty" className='' />
                                        <h5 className='mt-3 text-info'>You don't have any booked car</h5>
                                        <h6 className='text-muted'>Book your favirote car</h6>
                                        <Link to="/cars" className='btn common_btn mt-4'>Book Now</Link>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
