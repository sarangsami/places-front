import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading, setSnackbar } from "redux/features/layoutSlice";

const useLayout = (props: {
  isError: boolean;
  isLoading: boolean;
  errorMessage: string;
}) => {
  const { isError, isLoading, errorMessage } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
    if (isError) {
      dispatch(
        setSnackbar({
          open: true,
          color: "error",
          message: errorMessage,
        })
      );
    }
  }, [isError, errorMessage, isLoading, dispatch]);
};

export default useLayout;
