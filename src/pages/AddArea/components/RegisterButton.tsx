import Button from "../../../shared/layout/Button";
import { LuUpload } from "react-icons/lu";
import { useAddAreaContext } from "../context/AddAreaContext";

export default function RegisterButton() {
  const { handleRegister, isLoading } = useAddAreaContext();
  return (
    <Button
      disabled={isLoading}
      className="w-full rounded-lg py-4 text-lg font-medium mt-8 mb-4"
      baseColor="brand"
      hoverColor="orange-300"
      onClick={handleRegister}
    >
      <LuUpload className="w-5 h-5" />
      {isLoading ? "등록 중..." : "관리구역 등록하기"}
    </Button>
  );
}
