import {
  Avatar,
  Box,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import { UserDataType } from "types";
import { BackendURL } from "utils/utils";

const UserListItem = (props: { data: UserDataType }) => {
  const {
    data: { id, name, image, places },
  } = props;
  const navigate = useNavigate();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Paper
      elevation={6}
      sx={{
        p: 2,
        cursor: "pointer",
        transition: "transform .3s ease-out",
        "&:hover": {
          transform: "translate(8px, 0)",
        },
      }}
      onClick={() => navigate(`/${id}/places`)}
    >
      <Grid container alignItems="center" spacing={2}>
        <Grid item xl={2} lg={2} md={4} sm={4} xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              alt={name}
              src={BackendURL + image}
              sx={{
                maxWidth: 150,
                height: 150,
                width: "100%",
              }}
            />
          </Box>
        </Grid>
        <Grid item xl lg md sm xs>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              align={isSm ? "center" : "left"}
              sx={{ fontWeight: "bold" }}
            >
              {name}
            </Typography>
            <Typography align={isSm ? "center" : "left"}>
              Place{places?.length === 1 ? "" : "s"} : {places?.length}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserListItem;
