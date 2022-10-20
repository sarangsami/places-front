import { Fragment, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Stack,
  Box,
  Button,
  CardMedia,
  Divider,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import placesAxios from "utils/placesAxios";
import { PlacesDataType } from "types";

import Modal from "components/Modal";
import Map from "components/Map";
import { useMutation, useQueryClient } from "react-query";
import { useAppSelector } from "redux/store";

type PlaceItemModals = {
  mapModal: boolean;
  deleteModal: boolean;
};

type PlaceItemModalsActionType = {
  type: string;
  value: boolean;
};

const modalReducer = (
  state: PlaceItemModals,
  action: PlaceItemModalsActionType
) => {
  const { type } = action;
  switch (type) {
    case "DELETE_MODAL":
      return {
        ...state,
        deleteModal: action.value,
      };
    case "MAP_MODAL":
      return {
        ...state,
        mapModal: action.value,
      };

    default:
      return state;
  }
};

const PlaceListItem = (props: { place: PlacesDataType }) => {
  const {
    place: { id, title, description, image, address, location, creator },
  } = props;
  const navigate = useNavigate();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const user = useAppSelector((state) => state.authState.user);
  const { uid } = useParams();

  const [modals, dispatch] = useReducer(modalReducer, {
    deleteModal: false,
    mapModal: false,
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (id: string) => placesAxios.deletePlaceById(`${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`UserPlaces ${creator}`]);
      },
    }
  );

  const { mapModal, deleteModal } = modals;

  const CloseModal = (type: string) => {
    dispatch({ type, value: false });
  };
  const OpenModal = (type: string) => {
    dispatch({ type, value: true });
  };
  const handleDeletePlace = () => {
    mutate(`${id}`);
    CloseModal("DELETE_MODAL");
  };
  return (
    <Paper sx={{ borderRadius: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={title}
        sx={{ borderRadius: "8px 8px 0 0" }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "ceneter",
          p: 4,
          flexDirection: "column",
        }}
      >
        <Typography align="center" sx={{ fontWeight: "bold" }} variant="h5">
          {title}
        </Typography>
        <Typography align="center" sx={{ my: 2, fontWeight: "bold" }}>
          {address}
        </Typography>
        <Typography align="center">{description}</Typography>
      </Box>
      <Divider />
      <Box>
        <Stack
          direction={isSm ? "row" : "column"}
          justifyContent="center"
          my={2}
          spacing={2}
          p={2}
        >
          <Modal
            title="Google Map"
            open={mapModal}
            handleClose={() => CloseModal("MAP_MODAL")}
            CustomButton={
              <Button
                onClick={() => OpenModal("MAP_MODAL")}
                variant="contained"
                color="success"
              >
                View on Map
              </Button>
            }
            Actions={
              <Fragment>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => CloseModal("MAP_MODAL")}
                >
                  Close
                </Button>
              </Fragment>
            }
          >
            <Map locationName={title} zoom={18} center={location} />
          </Modal>
          {user?._id === uid ? (
            <Fragment>
              <Button
                onClick={() => navigate(`/places/${id}`)}
                variant="contained"
                color="primary"
              >
                Edit
              </Button>

              <Modal
                title="Delete Warning"
                open={deleteModal}
                maxWidth="xs"
                handleClose={() => CloseModal("DELETE_MODAL")}
                CustomButton={
                  <Button
                    onClick={() => OpenModal("DELETE_MODAL")}
                    variant="contained"
                    color="error"
                  >
                    {isLoading ? "Deleting..." : "Delete"}
                  </Button>
                }
                Actions={
                  <Fragment>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleDeletePlace}
                    >
                      Yes
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => CloseModal("DELETE_MODAL")}
                    >
                      No
                    </Button>
                  </Fragment>
                }
              >
                <Typography>
                  Are you Sure you want to Delete this Place?
                </Typography>
              </Modal>
            </Fragment>
          ) : null}
        </Stack>
      </Box>
    </Paper>
  );
};

export default PlaceListItem;
