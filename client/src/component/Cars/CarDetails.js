import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./CarDetails.css";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { getCarDetails, getCars } from '../../actions/carAction';
import { Button } from '@mui/material';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { HashLoader, RingLoader } from "react-spinners";
import CarCard from '../Home/CarCard';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useAlert } from 'react-alert';

function CarDetails() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    
    const { car, loading, error } = useSelector(
        (state) => state.carDetails
    );

    const { loading: carsloadind, error: carserror, cars } = useSelector((state) => state.cars);


    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        if (car.numInStock <= quantity) return;
        setQuantity(quantity + 1);
    }

    const decreaseQuantity = () => {
        if (quantity <= 1) return;
        setQuantity(quantity - 1);
    }


    const rentHandler = () => {
        // dispatch(addItemsToCart(id, quantity));
        // alert.success("Item Added To Cart");
        const cart_data = {
            car: car,
            qty: quantity
        }
        localStorage.setItem("cart_item", JSON.stringify(cart_data));
        navigate("/reservation");
    }

    useEffect(() => {
        if (error) {
            alert.error("Some error occured")
        }

        dispatch(getCarDetails(id));
        dispatch(getCars());
    }, [error, id, dispatch, alert])

    return (
        <>
            {loading ? <div className='loader'><HashLoader size={50} color={"#20A8D9"} /></div> : (
                car && <div className='my-5'>
                    <div className='container'>
                        <h2>{car.name}</h2>

                        <div className='d-flex flex-wrap justify-content-between my-4 car_details'>
                            <div className='car_img'>
                                {/* <img src={car.images && car.images[0].url} alt="Mercedez Benz" className='w-100' /> */}
                                <Carousel showThumbs={true} thumbWidth={150}>
                                    {car.images &&
                                        car.images.map((image, i) => {
                                            return (
                                                <img
                                                    className="CarouselImage"
                                                    key={i}
                                                    src={image.url}
                                                    alt={`${i} Slide`}
                                                />
                                            )
                                        })
                                    }
                                </Carousel>
                            </div>
                            <div className='car_info p-4'>
                                <div className='d-flex flex-sm-row flex-column justify-content-between align-items-sm-center'>
                                    <span><h3 className='d-inline'>₹ {car.dailyRentalRate} </h3> / Per Day</span>
                                    <button className='btn btn-lg mt-sm-0 mt-4 common_btn'
                                        disabled={car.numInStock < 1 ? true : false}
                                        onClick={rentHandler}
                                    >Rent Now</button>
                                </div>
                                <h6 className='text-muted my-3'>Brand: {car.brand}</h6>
                                <h6 className='text-muted mt-3 mb-4'><DirectionsCarOutlinedIcon fontSize='small' sx={{ verticalAlign: "middle", color: "rgb(32,168,217)" }} /> {car.type} </h6>
                                <hr />
                                <h5 className='text-secondary'>Car Details</h5>
                                <div className='card_desc_grid'>
                                    <span className='mt-2'><PeopleAltOutlinedIcon fontSize="small" sx={{ verticalAlign: "middle", color: "rgb(32,168,217)" }} /> {car.numOfSeats} People</span>
                                    <span className='mt-2'><MeetingRoomOutlinedIcon fontSize='small' sx={{ verticalAlign: "middle", color: "rgb(32,168,217)" }} /> {car.numOfDoors} Doors</span>
                                    <span className='mt-2'><AcUnitOutlinedIcon fontSize='small' sx={{ verticalAlign: "middle", color: "rgb(32,168,217)" }} /> AC / Heater</span>
                                    <span className='mt-2'><DirectionsCarOutlinedIcon fontSize='small' sx={{ verticalAlign: "middle", color: "rgb(32,168,217)" }} /> Automic</span>
                                </div>
                                <hr />
                                <div className='my-3 card_desc_grid'>
                                    <p className='mb-1'><DoneOutlinedIcon fontSize="small" sx={{ verticalAlign: "middle", color: "rgb(32,168,217)" }} /> Air Conditioning</p>
                                    <p className='mb-1'><DoneOutlinedIcon fontSize="small" sx={{ verticalAlign: "middle", color: "rgb(32,168,217)" }} /> Roadside Assistance</p>
                                    <p className='mb-1'><DoneOutlinedIcon fontSize="small" sx={{ verticalAlign: "middle", color: "rgb(32,168,217)" }} /> Theft Protection</p>
                                    <p className='mb-1'><DoneOutlinedIcon fontSize="small" sx={{ verticalAlign: "middle", color: "rgb(32,168,217)" }} /> Sunroof</p>
                                    <p className='mb-1'><DoneOutlinedIcon fontSize="small" sx={{ verticalAlign: "middle", color: "rgb(32,168,217)" }} /> GPS Navigation</p>
                                </div>
                                <div className='car_qty'>
                                    <button onClick={decreaseQuantity}>-</button>
                                    <input readOnly type="number" value={car.numInStock < 1 ? "0" : quantity} />
                                    <button onClick={increaseQuantity}>+</button>
                                </div>
                                {car.numInStock < 1 &&
                                    <div className='mt-4'>
                                        <h6 className='font-weight-bold text-danger'>Currently not available</h6>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className='my-5'>
                            <div className='d-flex justify-content-between align-items-center heading_cars'>
                                <h4 className=''>You may also like</h4>
                                <Link to="/cars" className='text-muted' >View More <ArrowRightAltIcon sx={{ verticalAlign: "middle" }} /></Link>
                            </div>
                            {carsloadind ? <div className='loader'><HashLoader size={50} color={"#20A8D9"} /></div> : (
                                <div className='cars'>
                                    <div className='row'>
                                        {cars && cars.map((car,i) => { return i< 6 && <CarCard car={car} key={car._id} /> })}
                                    </div>
                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default CarDetails;