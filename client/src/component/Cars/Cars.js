import React, { useEffect, useState } from 'react';
import CarCard from '../Home/CarCard';
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getCars } from '../../actions/carAction';
import { HashLoader, RingLoader } from "react-spinners";
import sadimg from "../../images/sadimg-removebg-preview.png";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FilterListIcon from '@mui/icons-material/FilterList';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from "@mui/material/Slider";
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';

const carTypes = [
    {
        value: 'Hatchback',
        label: 'Hatchback',
    },
    {
        value: 'Sedan',
        label: 'Sedan',
    },
    {
        value: 'SUV',
        label: 'SUV',
    },
    {
        value: 'MUV',
        label: 'MUV',
    },
    {
        value: 'Coupe',
        label: 'Coupe',
    },
    {
        value: 'Convertibles',
        label: 'Convertibles',
    },
    {
        value: 'Pickup',
        label: 'Pickup Trucks',
    },
];

function Cars() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const queryParmas = new URLSearchParams(window.location.search);

    const { loading, error, cars } = useSelector((state) => state.cars);

    // const [currentPage, setCurrentPage] = useState(1);
    const [rent, setRent] = useState([0, 100000]);
    const [carType, setCarType] = useState([]);
    const [seats, setSeats] = useState(0);
    const { keyword } = useParams();

    const [state, setState] = React.useState({
        right: false,
    });


    const rentHandler = (e, newRent) => {
        setRent(newRent);
    }

    const handleChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;

        // Case 1 : The user checks the box
        if (checked) {
            setCarType(items => {
                return [
                    ...items, value
                ]
            })
        }

        // Case 2  : The user unchecks the box
        else {
            setCarType(carType.filter((e) => e !== value));
        }

    };


    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };


    const handleSubmit = (anchor) => {
        setState({ ...state, [anchor]: false });
        dispatch(getCars("", rent, carType, seats));
    }

    useEffect(() => {
        if (error) {
            alert.error("Some error occured");
            dispatch(clearErrors());
        }
        if (queryParmas.get("name") || queryParmas.get("type")) {
            setCarType([...carType, queryParmas.get("type")])
            dispatch(getCars(queryParmas?.get("name"), rent, carType, seats));
            setCarType([]);
        } else {
            dispatch(getCars(keyword ? keyword : "", rent, carType, seats));
        }
    }, [dispatch, error]);


    const list = (anchor) => (
        <Box
            sx={{ width: 250, padding: 3 }}
            className="body_bg_color"
            role="presentation"
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
        >
            <div className='d-flex justify-content-center'>
                <FilterListIcon />
                <h5 className='ml-2'>Filters</h5>
            </div>
            <hr />
            <div className='mt-4'>
                <h6 className='text-muted font-weight-bold'>Sort By Car Type</h6>
                <FormGroup>
                    {
                        carTypes.map((type) => {
                            return (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value={type.value}
                                            checked={carType.includes(type.value) ? true : false}
                                            name="carType"
                                            onChange={handleChange}
                                            sx={{
                                                '&.Mui-checked': {
                                                    color: "rgb(32, 168, 217)",
                                                },
                                            }}
                                        />
                                    }
                                    label={type.label} />
                            );
                        })
                    }
                </FormGroup>
            </div>

            <Divider />

            <div className='mt-4'>
                <h6 className='text-muted font-weight-bold'>Sort By Car Rent</h6>
                <Slider
                    // aria-label="Rent"    
                    defaultValue={0}
                    value={rent}
                    valueLabelDisplay="auto"
                    step={50}
                    min={0}
                    max={10000}
                    onChange={rentHandler}
                    className="color_main"
                />
            </div>


            <div className='mt-4'>
                <h6 className='text-muted font-weight-bold'>Sort By Seats</h6>
                <Slider
                    // aria-label="Seats"
                    defaultValue={0}
                    valueLabelDisplay="auto"
                    step={1}
                    min={0}
                    max={10}
                    value={seats}
                    onChange={(e, newSeats) => {
                        setSeats(newSeats);
                    }}
                    className="color_main"
                />
            </div>

            <hr />

            <div className='text-center'>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => { handleSubmit(anchor) }}
                    className="common_btn"
                >Apply</Button>
            </div>
        </Box >
    );

    return (
        <>
            {loading ? <div className='loader'><HashLoader size={50} color={"#20A8D9"} /></div> : (
                cars.length > 0 ? (
                    <div className='container'>
                        <div className='d-flex justify-content-between align-items-center mb-3 mt-4'>
                            <h3 className='mb-0'>Choose Your Perfect Car</h3>
                            <div>
                                <Button variant="contained" startIcon={<FilterListIcon />} onClick={toggleDrawer("right", true)} className="common_btn">Add Filter</Button>
                                <Drawer
                                    anchor="right"
                                    open={state["right"]}
                                    onClose={toggleDrawer("right", false)}
                                >
                                    {list("right")}
                                </Drawer>
                            </div>
                        </div>
                        <div className='cars mb-5'>
                            <div className='row'>
                                {cars && cars.map((car) => { return <CarCard car={car} key={car._id} /> })}
                            </div>
                        </div>
                    </div>
                )
                    :
                    (
                        <>
                            <div className='container'>
                                <div className='text-center my_center'>
                                    <img src={sadimg} alt="List Empty" className='' style={{ width: "100px" }} />
                                    <h4 className='text-center mt-4'>Opps! Cars are not available</h4>
                                    <Link to="/" className='btn common_btn mt-4'>Explore another cars</Link>
                                </div>
                            </div>
                        </>
                    )
            )}

        </>
    )
}

export default Cars;