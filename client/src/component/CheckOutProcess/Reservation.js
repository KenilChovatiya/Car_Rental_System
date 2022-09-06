import { TextField, MenuItem, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import CheckoutSteps from './CheckOutSteps';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack'
import "./Reservation.css";

function Reservation() {

    const [pickUpDate, setPickUpDate] = useState(new Date());
    const [dropDate, setDropDate] = useState(new Date());
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();


    const handleSubmitForm = (formData) => {
        // event.preventDefault();
        if (localStorage.getItem("cart_item")) {
            let data = JSON.parse(localStorage.getItem("cart_item"));
            data['reservationDetails'] = formData;
            data['dateOut'] = pickUpDate;
            data['dateReturned'] = dropDate;
            localStorage.setItem("cart_item", JSON.stringify(data));
            navigate("/reservation/confirm");
        }
    };


    return (
        <>
            <CheckoutSteps activeStep={0} />

            <div className='reservation_details'>
                <div className='container'>
                    <div className='reservation_forms my-5'>
                        <div className='row'>
                            <div className='col-md-4'>
                                <h5>Reservation Form</h5>
                                <form className='pickup_form my-4'>

                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <Stack spacing={4}>
                                            <DateTimePicker
                                                renderInput={(params) => <TextField {...params} />}
                                                label="Pick Up Date"
                                                value={pickUpDate}
                                                // onChange={(e) => { setPickUpDate(e.target.value) }}
                                                onChange={(newValue) => {
                                                    setPickUpDate(newValue);
                                                }}
                                                minDateTime={new Date() - 1000}
                                                inputFormat="dd/MM/yyyy hh:mm a"
                                            />

                                            <DateTimePicker
                                                renderInput={(params) => <TextField {...params} />}
                                                label="Drop off Date"
                                                value={dropDate}
                                                onChange={(newValue) => {
                                                    setDropDate(newValue);
                                                }}
                                                minDateTime={pickUpDate}
                                                inputFormat="dd/MM/yyyy hh:mm a"
                                            />
                                        </Stack>

                                    </LocalizationProvider>
                                </form>
                            </div>
                            <div className='col-md-8'>
                                <h5>Personal Information</h5>
                                <form className='personal_form' onSubmit={handleSubmit(handleSubmitForm)}>
                                    <TextField
                                        id="fName"
                                        name="firstName"
                                        label="First Name"
                                        variant="outlined"
                                        type="text"
                                        className='text_field'
                                        sx={{ my: 2, mr: 3 }}
                                        {...register("firstName", {
                                            required: "Frist Name is required",
                                            minLength: {
                                                value: 3,
                                                message: "First Name length minimum 3 charchters"
                                            },
                                            pattern: {
                                                value: /^[A-Za-z]+$/,
                                                message: "First name contains only alpabet letters"
                                            }
                                        })}
                                        error={errors.firstName ? true : false}
                                        helperText={errors.firstName?.message}
                                    />
                                    <TextField
                                        id="lName"
                                        name="lastName"
                                        label="Last Name"
                                        variant="outlined"
                                        type="text"
                                        className='text_field'
                                        sx={{ my: 2 }}
                                        {...register("lastName", {
                                            required: "Last Name is required",
                                            minLength: {
                                                value: 3,
                                                message: "Last Name length minimum 3 charchters"
                                            },
                                            pattern: {
                                                value: /^[A-Za-z]+$/,
                                                message: "Last name contains only alpabet letters"
                                            }
                                        })}
                                        error={errors.lastName ? true : false}
                                        helperText={errors.lastName?.message}
                                    />
                                    <TextField
                                        id="mobile"
                                        name="mobile"
                                        label="mobile"
                                        variant="outlined"
                                        type="number"
                                        sx={{ my: 2, mr: 3 }}
                                        className='text_field'
                                        {...register("mobile", {
                                            required: "Mobile is required",
                                            pattern: {
                                                value: /^\d{10}$/,
                                                message: "Mobile must be contains only 10 digits"
                                            }
                                        })}
                                        error={errors.mobile ? true : false}
                                        helperText={errors.mobile?.message}
                                    />
                                    <TextField
                                        id="age"
                                        name="age"
                                        label="Age"
                                        variant="outlined"
                                        type="number"
                                        sx={{ my: 2 }}
                                        className='text_field'
                                        {...register("age", {
                                            required: "Age is required",
                                            min: {
                                                value: 18,
                                                message: "Minimum 18 or above age is required"
                                            }
                                        })}
                                        error={errors.age ? true : false}
                                        helperText={errors.age?.message}
                                    />
                                    <TextField
                                        id="address"
                                        name="address"
                                        label="Address"
                                        variant="outlined"
                                        type="text"
                                        sx={{ my: 2 }}
                                        className='text_field_address'
                                        style={{ width: "100%" }}
                                        {...register("address", {
                                            required: "Address is required"
                                        })}
                                        error={errors.address ? true : false}
                                        helperText={errors.address?.message}
                                    />

                                    <TextField
                                        id="state"
                                        name="state"
                                        label="State"
                                        variant="outlined"
                                        type="text"
                                        sx={{ my: 2, mr: 3 }}
                                        className="text_filed_2"
                                        {...register("state", {
                                            required: "State is required",
                                            pattern: {
                                                value: /^((\w+ )*\w+)?$/,
                                                message: "State contains only alpabet letters"
                                            }
                                        })}
                                        error={errors.state ? true : false}
                                        helperText={errors.state?.message}
                                    />

                                    <TextField
                                        id="city"
                                        name="city"
                                        label="City"
                                        variant="outlined"
                                        type="text"
                                        sx={{ my: 2, mr: 3 }}
                                        className="text_filed_2"
                                        {...register("city", {
                                            required: "City is required",
                                            pattern: {
                                                value: /^((\w+ )*\w+)?$/,
                                                message: "City contains only alpabet letters"
                                            }
                                        })}
                                        error={errors.city ? true : false}
                                        helperText={errors.city?.message}
                                    />

                                    <TextField
                                        id="pinCode"
                                        name="pinCode"
                                        label="Pin Code"
                                        variant="outlined"
                                        type="number"
                                        sx={{ my: 2 }}
                                        className="text_filed_2"
                                        {...register("pinCode", {
                                            required: "Pincode is required",
                                        })}
                                        error={errors.pinCode ? true : false}
                                        helperText={errors.pinCode?.message}

                                    />

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, backgroundColor: "rgb(32,168,217)" }}
                                    >
                                        Continue
                                    </Button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reservation;