import { Navigate } from "react-router-dom";
import { useAppSelector } from "redux/store";
import { ReactChildrenType } from "types";

const ProtectedLayout = (props: { children: ReactChildrenType }) => {
  const { children } = props;
  const user = useAppSelector((state) => state.authState.user);
  if (!user) {
    return <Navigate to="/authentication" />;
  }
  return <>{children}</>;
};

export default ProtectedLayout;
