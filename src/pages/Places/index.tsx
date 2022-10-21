import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Box, Typography } from "@mui/material";

import placesAxios from "utils/placesAxios";

import PlacesList from "components/PlacesList";
import { CustomErrorType, PlacesDataType } from "types";
import useLayout from "hooks/useLayout";

const Places = () => {
  let { uid } = useParams();

  const { data, isError, isLoading, error } = useQuery<PlacesDataType[]>(
    [`UserPlaces ${uid}`],
    () => {
      return placesAxios
        .getUsersPlacesById(`${uid}`)
        .then((res) => res.data.userPlaces);
    }
  );
  useLayout({
    isError,
    isLoading,
    errorMessage: `${(error as CustomErrorType)?.response?.data.message}`,
  });
  return (
    <Box>
      <Typography>Places of user {uid}</Typography>
      <PlacesList data={data || []} />
    </Box>
  );
};

export default Places;
