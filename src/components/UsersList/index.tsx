import { Box, Stack, Typography } from "@mui/material";
import UserListItem from "components/UserListItem";

import { UserDataType } from "types";

const UsersList = (props: { users: UserDataType[] }) => {
  const { users } = props;

  if (!users?.length) {
    return (
      <Box sx={{ width: "100%" }}>
        <Typography align="center">No User Found</Typography>
      </Box>
    );
  }
  return (
    <Stack spacing={3}>
      {users.map((user) => (
        <UserListItem key={user?.id} data={user} />
      ))}
    </Stack>
  );
};

export default UsersList;
