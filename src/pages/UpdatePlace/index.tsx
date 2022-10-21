import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMutation, useQuery, useQueryClient } from "react-query";

import placesAxios from "utils/placesAxios";
import { CustomErrorType, FormData, PlacesDataType } from "types";
import useLayout from "hooks/useLayout";
import { useDispatch } from "react-redux";
import { setLoading, setSnackbar } from "redux/features/layoutSlice";

const UpdatePlace = () => {
  const { pid } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const {
    data,
    isLoading: isFetchLoading,
    isError,
    error,
  } = useQuery<PlacesDataType>(["SinglePlace", `${pid}`], () => {
    return placesAxios.getPlaceById(`${pid}`).then((res) => res.data.place);
  });

  const { mutate, isLoading } = useMutation(
    (values: FormData) => placesAxios.patchSinglePlace(`${pid}`, values),
    {
      onSuccess() {
        queryClient.invalidateQueries([`UserPlaces ${data?.creator}`]);
        navigate(`/${data?.creator}/places`);
        dispatch(
          setSnackbar({
            open: true,
            message: "Place has successfully updated.",
            color: "success",
          })
        );
      },
      onError() {
        dispatch(
          setSnackbar({
            open: true,
            message: "Failed please try again later",
            color: "error",
          })
        );
      },
    }
  );

  useLayout({
    isError,
    isLoading: isFetchLoading,
    errorMessage: `${(error as CustomErrorType)?.response?.data.message}`,
  });

  useEffect(() => {
    if (data) {
      const { title, description } = data;
      const placeData = { title, description };
      reset(placeData);
    }
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [data, isLoading, dispatch, reset]);

  const onUpdateSubmit = handleSubmit((data) => mutate(data));

  if (!data) {
    return (
      <Box mt={8}>
        <Typography align="center">We can not find that Place</Typography>
      </Box>
    );
  }
  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mt: 6 }}>
        <form onSubmit={onUpdateSubmit}>
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
            <Stack
              direction={isSm ? "column" : "row"}
              spacing={2}
              justifyContent="flex-end"
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => navigate(`/${data.creator}/places`)}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                {isLoading ? "Updating..." : "Submit"}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdatePlace;
