import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updatePassword } from '../../actions/userAction';
import { useNavigate } from "react-router-dom";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import InputAdornment from '@mui/material/InputAdornment';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { HashLoader, RingLoader } from "react-spinners";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";


function UpdatePassword() {
    const theme = createTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = React.useRef({});
    password.current = watch("newPassword", "");


    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const handleSubmitForm = (data) => {
        // event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // const updateData = {
        //     oldPassword: data.get('oldPassword'),
        //     newPassword: data.get('newPassword'),
        //     cPassword: data.get('cPassword'),
        // };
        if (data.newPassword === data.cPassword) {
            dispatch(updatePassword(data))
        }
    };

    React.useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Password Updated Successfully");
            navigate("/account");

            dispatch({
                type: "UPDATE_PASSWORD_RESET",
            });
        }

    }, [error, isUpdated, dispatch])

    return (
        <>
            {
                loading ? <div className='loader'><HashLoader  size={50} color={"#20A8D9"} /></div> : (
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    marginBottom: 17.3,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <ManageAccountsOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Change Your Password
                                </Typography>
                                <Box component="form" noValidate onSubmit={handleSubmit(handleSubmitForm)} sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>

                                            <TextField
                                                autoComplete="given-name"
                                                name="oldPassword"
                                                required
                                                fullWidth
                                                id="oldPassword"
                                                label="Old Password"
                                                type="password"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <VpnKeyIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                {...register("oldPassword", {
                                                    required: "Old Password is required"
                                                  })}
                                                  error={errors.oldPassword ? true : false}
                                                  helperText={errors.oldPassword?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="newPassword"
                                                label="New Password"
                                                name="newPassword"
                                                autoComplete="newPassword"
                                                type="password"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LockOpenIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                {...register("newPassword", {
                                                    required: "New Password is required",
                                                    pattern: {
                                                      value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/,
                                                      message: "Password 6 to above chacreters long and which contain at least one numeric digit and a special character"
                                                    }
                                                  })}
                                                  error={errors.newPassword ? true : false}
                                                  helperText={errors.newPassword?.message}
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="cPassword"
                                                label="Confirm Password"
                                                name="cPassword"
                                                autoComplete="cPassword"
                                                type="password"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LockIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                {...register("cPassword", {
                                                    required: "Confirm password is required",
                                                    validate: value =>
                                                      value === password.current || "Password does not match"
                                                  })}
                                                  error={errors.cPassword ? true : false}
                                                  helperText={errors.cPassword?.message}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, backgroundColor: "rgb(32,168,217)" }}
                                    >
                                        Update
                                    </Button>
                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>
                )
            }
        </>
    )
}

export default UpdatePassword;