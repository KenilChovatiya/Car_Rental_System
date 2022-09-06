import React from 'react'
import { Link } from "react-router-dom";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';

function CarCard({ car }) {
    return (
        <>
            <div className='col-lg-4 col-md-6 col-sm-12'>
                <Link to={`/car/${car._id}`} className='text-dark'>
                    <div className="card my-3 p-2 border-0 car_card">
                        <img className="card-img-top car_img_carCard" src={car.images[0].url} alt={car.name} />
                        <div className="card-body">
                            <h5 className="card-title">{car.name}</h5>
                            <div className='card_desc_grid'>
                                <span className='mt-2'><PeopleAltOutlinedIcon fontSize="small" sx={{ verticalAlign: "middle", color: "rgb(32,168,217)" }} /> {car.numOfSeats} People</span>
                                <span className='mt-2'><MeetingRoomOutlinedIcon fontSize='small' sx={{ verticalAlign: "middle", color: "rgb(32,168,217)" }} /> {car.numOfDoors} Doors</span>
                                <span className='mt-2'><AcUnitOutlinedIcon fontSize='small' sx={{ verticalAlign: "middle", color: "rgb(32,168,217)" }} /> AC / Heater</span>
                                <span className='mt-2'><DirectionsCarOutlinedIcon fontSize='small' sx={{ verticalAlign: "middle", color: "rgb(32,168,217)" }} /> {car.type}</span>
                            </div>
                            <hr />
                            <div className='d-flex justify-content-between align-items-center'>
                                <span><h4 className='d-inline'>₹ {car.dailyRentalRate} </h4> / day</span>
                                <Link to={`/car/${car._id}`} className='btn common_btn'>Rent Now</Link>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default CarCard