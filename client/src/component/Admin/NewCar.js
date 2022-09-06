import React, { useEffect, useState } from 'react'
import "./Dashboard.css";
import Sidebar from './Sidebar';
import "./NewCar.css"
import TextField from '@mui/material/TextField';
import { Button, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createCar, getCarDetails, updateCar } from '../../actions/carAction';
import { useNavigate, useParams } from 'react-router';
import { HashLoader, RingLoader } from "react-spinners";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";

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

function NewCar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const alert = useAlert();
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
    const { loading, error, success } = useSelector((state) => state.newCar);
    const { car, error: cardetailsError } = useSelector(
        (state) => state.carDetails
    );

    const { isUpdated, error: updateError, loading: updateLoading } = useSelector(
        (state) => state.car
    );

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [newCar, setNewCar] = useState({
        name: "",
        brand: "",
        type: "",
        images: [],
        numOfSeats: "",
        numOfDoors: "",
        airConditioner: "",
        numInStock: "",
        dailyRentalRate: ""

    });

    const onHandleChange = (e) => {
        setNewCar({ ...newCar, [e.target.name]: e.target.value });
    }

    const handleSubmitForm = (data) => {
        // e.preventDefault();
        // let data = newCar;
        data.images = images
        data.type = newCar.type;
        data.airConditioner = newCar.airConditioner;
        setNewCar(data);
        if (params.id) {
            // dispatch(updateCar(params.id, newCar));
            dispatch(updateCar(params.id, data));
        } else {
            dispatch(createCar(data));
        }

    }

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    useEffect(() => {
        if (params.id) {
            if (car && car._id !== params.id) {
                dispatch(getCarDetails(params.id));
            } else {
                setNewCar({
                    name: car.name,
                    brand: car.brand,
                    type: car.type,
                    images: car.images,
                    numOfSeats: car.numOfSeats,
                    numOfDoors: car.numOfDoors,
                    airConditioner: car.airConditioner,
                    numInStock: car.numInStock,
                    dailyRentalRate: car.dailyRentalRate
                })
                setValue('name', car.name);
                setValue('brand', car.brand);
                // setValue('type', car.type);
                setValue('numOfSeats', car.numOfSeats);
                setValue('numOfDoors', car.numOfDoors);
                // setValue('airConditioner', car.airConditioner);
                setValue('numInStock', car.numInStock);
                setValue('dailyRentalRate', car.dailyRentalRate);
            }
        }

        if (success || isUpdated) {
            alert.success(success ? "Car Created Successfully" : "Car Updated Successfully");
            navigate("/admin/cars");
            dispatch({ type: "NEW_CAR_RESET" });
            dispatch({ type: "UPDATE_CAR_RESET" });
        }
    }, [dispatch, car, params.id, success, isUpdated, navigate])

    return (
        <>
            {loading || updateLoading ? <div className='loader'><HashLoader size={50} color={"#20A8D9"} /></div> : (
                <div className='dashboard'>
                    <Sidebar />
                    <div className='right_side'>
                        <div className='container-fluid'>
                            {!params.id ? (
                                <div className='p-3 dashboard_title mb-3'>
                                    <h5 className='m-0 text-white'>Add New Car</h5>
                                </div>
                            ) : (
                                <div className='p-3 dashboard_title mb-3'>
                                    <h5 className='m-0 text-white'>Update Car</h5>
                                </div>
                            )}

                            <div className='my-4'>
                                <form onSubmit={handleSubmit(handleSubmitForm)} method="POST">
                                    <div className='d_grid form_input_grid'>
                                        <TextField
                                            id="carName"
                                            name="name"
                                            label="Car Name"
                                            type="text"
                                            {...register("name", {
                                                required: "Car name is required",
                                                minLength: {
                                                    value: 3,
                                                    message: "Car name length minimum 3 charchters"
                                                }
                                            })}
                                            error={errors.name ? true : false}
                                            helperText={errors.name?.message}
                                        />

                                        <TextField
                                            id="carBrand"
                                            name="brand"
                                            label="Car Brand"
                                            type="text"
                                            {...register("brand", {
                                                required: "Car brand is required",
                                                minLength: {
                                                    value: 3,
                                                    message: "Car brand length minimum 3 charchters"
                                                },
                                                pattern: {
                                                    value: /^((\w+ )*\w+)?$/,
                                                    message: "Username contains only alpabet letters"
                                                }
                                            })}
                                            error={errors.brand ? true : false}
                                            helperText={errors.brand?.message}
                                        />

                                        <TextField
                                            id="carType"
                                            name='type'
                                            select
                                            label="Select"
                                            value={newCar.type}
                                            onChange={onHandleChange}
                                        >
                                            {carTypes.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>

                                        <TextField
                                            id="numOfSeats"
                                            name="numOfSeats"
                                            label="Number Of Seats"
                                            type="number"
                                            {...register("numOfSeats", {
                                                required: "Please enter number of seats",
                                                min: {
                                                    value: 1,
                                                    message: "Minimum 1 seat is required"
                                                }
                                            })}
                                            error={errors.numOfSeats ? true : false}
                                            helperText={errors.numOfSeats?.message}
                                        />

                                        <TextField
                                            id="numOfDoors"
                                            name='numOfDoors'
                                            label="Number Of Doors"
                                            type="number"
                                            {...register("numOfDoors", {
                                                required: "Please enter number of doors",
                                                min: {
                                                    value: 1,
                                                    message: "Minimum 1 door is required"
                                                }
                                            })}
                                            error={errors.numOfDoors ? true : false}
                                            helperText={errors.numOfDoors?.message}
                                        />

                                        <TextField
                                            id="numInStock"
                                            name="numInStock"
                                            label="Number Of Stock"
                                            type="number"
                                            {...register("numInStock", {
                                                required: "Please enter number of stock",
                                                min: {
                                                    value: 1,
                                                    message: "Minimum 1 stock is required"
                                                }
                                            })}
                                            error={errors.numInStock ? true : false}
                                            helperText={errors.numInStock?.message}

                                        />

                                        <TextField
                                            id="dailyRentalRate"
                                            name="dailyRentalRate"
                                            label="Rent Per Day"
                                            type="number"
                                            {...register("dailyRentalRate", {
                                                required: "Please enter rent per day"
                                            })}
                                            error={errors.dailyRentalRate ? true : false}
                                            helperText={errors.dailyRentalRate?.message}
                                        />

                                        <TextField
                                            id="airConditioner"
                                            name="airConditioner"
                                            select
                                            label="Select airconditioner"
                                            value={newCar.airConditioner}
                                            onChange={onHandleChange}
                                        >
                                            {[{ value: true, label: "True" }, { value: false, label: "False" }].map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>

                                        <div id="createProductFormFile">
                                            <input
                                                type="file"
                                                name="avatar"
                                                accept="image/*"
                                                onChange={createProductImagesChange}
                                                multiple

                                            />
                                        </div>

                                    </div>


                                    <div id="createProductFormImage" className='text-left mt-4'>
                                        {imagesPreview.map((image, index) => (
                                            <img key={index} src={image} alt="Product Preview" />
                                        ))}
                                    </div>

                                    {params.id && <div id="createProductFormImage">
                                        {newCar.images &&
                                            newCar.images.map((image, index) => (
                                                <img key={index} src={image.url} alt="Old Product Preview" />
                                            ))}
                                    </div>}

                                    <Button
                                        id="createProductBtn"
                                        type="submit"
                                        variant="contained"
                                        disabled={loading || updateLoading ? true : false}
                                    >
                                        {!params.id ? "Create" : "Update"}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </>

    )
}

export default NewCar;