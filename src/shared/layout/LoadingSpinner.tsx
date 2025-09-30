import { SyncLoader } from "react-spinners";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <SyncLoader color="#ff7f4c" />
      <span className="text-brand mt-10">데이터를 불러오는 중입니다 ...</span>
    </div>
  );
}
