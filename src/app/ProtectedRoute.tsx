import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
