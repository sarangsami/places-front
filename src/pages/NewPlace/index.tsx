import { Box, Button, Container, Paper, Stack, TextField } from "@mui/material";
import Map from "components/Map";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import placesAxios from "utils/placesAxios";

import { FormData } from "types";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading, setSnackbar } from "redux/features/layoutSlice";
import { useAppSelector } from "redux/store";

const NewPlace = () => {
  const [userLocation, setUserLocation] = useState({
    lat: 52,
    lng: 13,
  });
  const [btnName, setBtnName] = useState("Submit");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.authState.user);

  const { mutate, isLoading } = useMutation(
    (values: FormData) => placesAxios.postNewPlace(values),
    {
      onSuccess: (data) => {
        setBtnName("Saved!");
        navigate(`/${data.data.result.creator}/places`);
        queryClient.setQueryData(
          [`UserPlaces ${data?.data.result.creator}`],
          data
        );
        dispatch(
          setSnackbar({
            color: "success",
            open: true,
            message: "New Place has been created",
          })
        );
      },
      onError: () => {
        setBtnName("Error!");
        dispatch(
          setSnackbar({
            color: "error",
            open: true,
            message: "Failed, please try again later.",
          })
        );
      },
      onSettled: (data) => {
        queryClient.invalidateQueries([
          `UserPlaces ${data?.data.result.creator}`,
        ]);
      },
    }
  );

  const onSubmit = handleSubmit((data) => {
    const finalData = {
      ...data,
      coordinates: userLocation,
      image: "https://fakeimg.pl/300/",
      creator: `${user?._id}`,
    };
    mutate(finalData);
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
    if (isLoading) {
      dispatch(setLoading(true));
      setBtnName("Loading...");
    } else {
      dispatch(setLoading(false));
      setBtnName("Submit");
    }
  }, [isLoading, dispatch]);

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mt: 6 }}>
        <form onSubmit={onSubmit}>
          <Stack direction="column" spacing={3}>
            <TextField
              fullWidth
              error={errors.title ? true : false}
              id="title"
              label="Title"
              {...register("title", { required: "Title field is Required" })}
              helperText={errors.title && errors.title?.message}
            />
            <TextField
              fullWidth
              error={errors.description ? true : false}
              id="description"
              label="Description"
              rows={3}
              multiline
              {...register("description", {
                required: "Description is Required",
                maxLength: {
                  value: 10,
                  message: "Too Many Characters",
                },
              })}
              helperText={errors.description && errors.description?.message}
            />
            <TextField
              fullWidth
              error={errors.address ? true : false}
              id="address"
              label="Address"
              rows={3}
              multiline
              {...register("address", {
                required: "Addrerss is Required",
              })}
              helperText={errors.address && errors.address?.message}
            />
            <Map
              center={userLocation}
              zoom={12}
              locationName="My Location"
              setNewPosition={setUserLocation}
            />
            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" type="submit">
                {btnName}
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default NewPlace;
