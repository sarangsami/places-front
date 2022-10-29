import { Box, Button, Container, Paper, Stack, TextField } from "@mui/material";
import Map from "components/Map";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import placesAxios from "utils/placesAxios";

import { FormData as MyFormData } from "types";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading, setSnackbar } from "redux/features/layoutSlice";
import ImageUpload from "components/ImageUpload";

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
    clearErrors,
    setValue,
  } = useForm<MyFormData>();

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

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
    const { title, description, address, image } = data;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("address", address || "");
    formData.append(`coordinates`, JSON.stringify(userLocation));
    formData.append("image", image);
    mutate(formData);
  });

  useEffect(() => {
    register("image", {
      required: "Image is Required",
    });
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
  }, [isLoading, dispatch,register]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length === 1) {
      const currentFile = event.target.files[0];
      setValue("image", currentFile);
      clearErrors("image");
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mt: 6 }}>
        <form onSubmit={onSubmit}>
          <Stack direction="column" spacing={3}>
            <ImageUpload
              newPlace
              handleImageChange={handleImageChange}
              hasError={errors?.image ? `${errors.image.message}` : ""}
            />
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
