import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { SubmitHandler, useForm } from "react-hook-form";

import { AuthFormData } from "types";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, register as thunkRegister } from "redux/features/authSlice";
import { AppDispatch, useAppSelector } from "redux/store";
import { setLoading, setSnackbar } from "redux/features/layoutSlice";
import ImageUpload from "components/ImageUpload";

const Authentication = () => {
  const routeNavigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const authRole = searchParams.get("role");
  const { isLoggedIn } = useAppSelector((state) => state.authState);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const {
    register,
    unregister,
    handleSubmit,
    reset,
    formState,
    setValue,
    clearErrors,
  } = useForm<AuthFormData>();
  const { errors, isSubmitSuccessful } = formState;

  useEffect(() => {
    if (isLoggedIn) {
      routeNavigate("/");
    }
    if (authRole === "register") {
      setIsLogin(false);
      register("firstName", {
        required: "Name is Required",
      });
      register("lastName", {
        required: "Last Name is Required",
      });
      register("image", {
        required: "Image is Required",
      });
    } else {
      setIsLogin(true);
      unregister("firstName");
      unregister("lastName");
      unregister("image");
    }
  }, [authRole, register, unregister, isLoggedIn, routeNavigate]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length === 1) {
      const currentFile = event.target.files[0];
      setValue("image", currentFile);
      clearErrors("image");
    }
  };

  const onSubmitHandler: SubmitHandler<AuthFormData> = (
    values: AuthFormData
  ) => {
    dispatch(setLoading(true));
    if (isLogin) {
      dispatch(login(values))
        .unwrap()
        .then(() => {
          routeNavigate("/");
          dispatch(setLoading(false));
          dispatch(
            setSnackbar({
              open: true,
              color: "success",
              message: "Welcome!",
            })
          );
        })
        .catch(() => {
          dispatch(setLoading(false));
        });
    } else {
      dispatch(thunkRegister(values))
        .unwrap()
        .then(() => {
          routeNavigate({
            pathname: "/authentication",
            search: createSearchParams({
              role: "login",
            }).toString(),
          });
          dispatch(setLoading(false));
          dispatch(
            setSnackbar({
              open: true,
              color: "success",
              message: "You have registered Successfully!",
            })
          );
        })
        .catch(() => {
          dispatch(setLoading(false));
        });
    }
  };
  return (
    <Container maxWidth="sm">
      <Paper>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 4,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign {isLogin ? "in" : "up"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            {!isLogin && (
              <Fragment>
                <ImageUpload
                  handleImageChange={handleImageChange}
                  hasError={errors?.image ? `${errors.image.message}` : ""}
                />
                <Grid container spacing={3}>
                  <Grid item xl lg md sm xs>
                    <TextField
                      error={errors.firstName ? true : false}
                      {...register("firstName", {
                        required: "First Name is Required",
                      })}
                      helperText={errors.firstName && errors.firstName?.message}
                      margin="normal"
                      fullWidth
                      id="firstName"
                      label="First Name"
                    />
                  </Grid>
                  <Grid item xl lg md sm xs>
                    <TextField
                      error={errors.lastName ? true : false}
                      {...register("lastName", {
                        required: "Last Name is Required",
                      })}
                      helperText={errors.lastName && errors.lastName?.message}
                      margin="normal"
                      fullWidth
                      id="lastName"
                      label="Last Name"
                    />
                  </Grid>
                </Grid>
              </Fragment>
            )}
            <TextField
              error={errors.email ? true : false}
              {...register("email", {
                required: "Email Addres is Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              helperText={errors.email && errors.email?.message}
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <TextField
              error={errors.password ? true : false}
              {...register("password", {
                required: "Password is Required",
                minLength: {
                  value: 6,
                  message: "Your password should at least 6 characters",
                },
              })}
              helperText={errors.password && errors.password?.message}
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              sx={{ mt: 2 }}
              control={<Checkbox value="remember" color="primary" />}
              label={
                isLogin
                  ? "Remember me"
                  : "I want to receive inspiration, marketing promotions and updates via email."
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign {isLogin ? "in" : "up"}
            </Button>
            <Grid container>
              <Grid item xs>
                {isLogin && (
                  <Button sx={{ textTransform: "none" }}>
                    Forgot password?
                  </Button>
                )}
              </Grid>

              <Grid item>
                <Button
                  sx={{ textTransform: "none" }}
                  onClick={() =>
                    routeNavigate({
                      pathname: "/authentication",
                      search: createSearchParams({
                        role: isLogin ? "register" : "login",
                      }).toString(),
                    })
                  }
                >
                  {isLogin
                    ? "Don't have an account? Sign Up"
                    : "Already have an Account? Sign in"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Authentication;
