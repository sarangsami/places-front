import { useNavigate } from "react-router-dom";
import { Button, Box, Typography, Stack } from "@mui/material";

import { PlacesDataType } from "types";
import PlaceListItem from "components/PlaceListItem";

const PlacesList = (props: { data: PlacesDataType[] }) => {
  const { data } = props;
  const navigate = useNavigate();
  if (!data.length) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ my: 6 }}>
          No Places Found Maybe Create one?
        </Typography>
        <Button onClick={() => navigate("/places/new")} variant="contained">
          Share Places
        </Button>
      </Box>
    );
  }
  return (
    <Stack spacing={2} mt={4}>
      {data.map((place) => (
        <PlaceListItem key={place?.id} place={place} />
      ))}
    </Stack>
  );
};

export default PlacesList;
