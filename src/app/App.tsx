import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function App() {
  const token = useSelector((state: RootState) => state.auth.accessToken);

  return <div className="font-bold">{token}</div>;
}
