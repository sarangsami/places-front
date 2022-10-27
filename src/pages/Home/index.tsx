import { Box } from "@mui/material";
import UsersList from "components/UsersList";
import useLayout from "hooks/useLayout";
import { useQuery } from "react-query";
import { CustomErrorType, UserDataType } from "types";
import placesAxios from "utils/placesAxios";

const Home = () => {
  const { data, isError, error, isLoading } = useQuery<UserDataType[]>(
    "allUsers",
    () => {
      return placesAxios.getUsers().then((res) => res.data.users);
    }
  );
  useLayout({
    isError,
    isLoading,
    errorMessage: `${(error as CustomErrorType)?.response?.data.message}`,
  });
  return (
    <Box pt={3}>{isLoading ? null : <UsersList users={data || []} />}</Box>
  );
};

export default Home;
