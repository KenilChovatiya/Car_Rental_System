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
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction';
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { HashLoader, RingLoader } from "react-spinners";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";

function UpdateProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
    const theme = createTheme();
    const [formData, setFormData] = useState({ username: "", email: "", mobile: "" });
    const [avatar, setAvatar] = useState("../../images/user.jpg");
    const [avatarPreview, setAvatarPreview] = useState("../../images/user.jpg");

    // handle Change in input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const profileImgChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    const handleSubmitForm = (data) => {
        // event.preventDefault();
        // formData.avatar = avatar;
        data.avatar = avatar;
        dispatch(updateProfile(data));
    };

    React.useEffect(() => {
        if (user) {
            setValue('username', user.username);
            setValue('email', user.email);
            setValue('mobile', user.mobile);
            // setFormData({ username: user.username, email: user.email, mobile: user.mobile });
            setAvatarPreview(user.avatar.url);
        }
        if (error) {
            alert.error("Some Error Occured");
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());
            navigate("/account");

            dispatch({
                type: "UPDATE_PROFILE_RESET",
            });
        }

    }, [error, isUpdated, user, dispatch, alert])

    return (
        <>
            {loading ? <div className='loader'><HashLoader size={50} color={"#20A8D9"} /></div> : (
                <div className='update_profile'>
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 5,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <ManageAccountsOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Change Your Profile
                                </Typography>
                                <Box component="form" noValidate onSubmit={handleSubmit(handleSubmitForm)} sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} style={{ textAlign: "center" }}>
                                            <img src={avatarPreview} alt="Avatar Preview" className='editable_profile_img' />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                autoComplete="given-name"
                                                name="username"
                                                required
                                                fullWidth
                                                id="firstName"
                                                label="First Name"
                                                // value={formData.username}
                                                // onChange={handleChange}
                                                {...register("username", {
                                                    required: "Username is required",
                                                    minLength: {
                                                        value: 3,
                                                        message: "Username length minimum 3 charchters"
                                                    },
                                                    pattern: {
                                                        value: /^((\w+ )*\w+)?$/,
                                                        message: "Username contains only alpabet letters"
                                                    }
                                                })}
                                                error={errors.username ? true : false}
                                                helperText={errors.username?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                                // value={formData.email}
                                                // onChange={handleChange}
                                                {...register("email", {
                                                    required: "Email is required",
                                                    pattern: {
                                                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                                        message: "Enter valid email"
                                                    }
                                                })}
                                                error={errors.email ? true : false}
                                                helperText={errors.email?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="mobile"
                                                label="Mobile"
                                                name="mobile"
                                                autoComplete="mobile"
                                                // value={formData.mobile}
                                                // onChange={handleChange}
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
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                name="avatar"
                                                label="Profile Picture"
                                                type="file"
                                                id="avatar"
                                                helperText="Profile Picture Is Not Required"
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                                onChange={profileImgChange}
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
                </div>
            )}
        </>
    )
}

export default UpdateProfile;