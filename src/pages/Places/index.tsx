import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { Box, Typography } from "@mui/material";

import placesAxios from "utils/placesAxios";

import PlacesList from "components/PlacesList";
import { CustomErrorType, PlacesDataType, UserDataType } from "types";
import useLayout from "hooks/useLayout";

const Places = () => {
  let { uid } = useParams();
  const queryClient = useQueryClient();
  const queries = queryClient.getQueryData<UserDataType[]>("allUsers");

  const CurrentUser = queries?.find((user) => user.id === uid);

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
      {CurrentUser ? (
        <Typography>
          Places of user {CurrentUser.name} {CurrentUser.family}
        </Typography>
      ) : null}

      <PlacesList data={data || []} />
    </Box>
  );
};

export default Places;
