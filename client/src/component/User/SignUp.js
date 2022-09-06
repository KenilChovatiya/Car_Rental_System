import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, signUp } from '../../actions/userAction';
import { useNavigate } from "react-router-dom";
import { HashLoader, RingLoader } from "react-spinners";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";

const theme = createTheme();

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = React.useRef({});
  password.current = watch("password", "");

  const [avatar, setAvatar] = React.useState("../../images/user.jpg");
  const [avatarPreview, setAvatarPreview] = React.useState("../../images/user.jpg");
  const { error, loading, isAuthenticated } = useSelector((state) => state.user);

  const handleSubmitForm = (data) => {
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // const signUpData = {
    //   username: data.get('username'),
    //   email: data.get('email'),
    //   mobile: data.get('mobile'),
    //   password: data.get('password'),
    //   cpassword: data.get('cpassword'),
    //   avatar,  
    // };
    data.avatar = avatar;
    if (data.password === data.cpassword) {
      dispatch(signUp(data))
    }
  };

  const profileImgChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };


  React.useEffect(() => {
    if (error) {
      alert.error("Some Error Occured");
      dispatch(clearErrors());
    }

    // If User Loggdin then redirect home page
    if (isAuthenticated) {
      alert.success("Registered Successfully");
      navigate("/");
    }
  }, [error, isAuthenticated, alert])

  return (
    <>
      {loading ? <div className='loader'><HashLoader size={50} color={"#20A8D9"} /></div> : (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit(handleSubmitForm)} sx={{ mt: 3, mb: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="username"
                      required
                      fullWidth
                      id="username"
                      label="User Name"
                      autoFocus
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
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/,
                          message: "Password 6 to above chacreters long and which contain at least one numeric digit and a special character"
                        }
                      })}
                      error={errors.password ? true : false}
                      helperText={errors.password?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="cpassword"
                      label="Confirm Password"
                      type="password"
                      id="cpassword"
                      autoComplete="confirm-password"
                      {...register("cpassword", {
                        required: "Confirm password is required",
                        validate: value =>
                          value === password.current || "Password does not match"
                      })}
                      error={errors.cpassword ? true : false}
                      helperText={errors.cpassword?.message}
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
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/signin" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </>
  );
}