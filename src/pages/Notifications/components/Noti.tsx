import { CiWarning } from "react-icons/ci";
import { GrLinkNext } from "react-icons/gr";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

interface IProps {
  title?: string;
  upperArea: number;
  lowerArea: number;
  uploadTime?: string;
  score?: number;
  photoUrl?: string;
  postId: number;
}

export default function Noti({
  title,
  upperArea,
  lowerArea,
  uploadTime,
  score,
  photoUrl,
  postId,
}: IProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/noti/${postId}`);
  };
  return (
    <div
      className="flex border border-gray-300 rounded-md p-5 items-center justify-around gap-5 hover:bg-gray-100 hover:cursor-pointer transition"
      onClick={handleClick}
    >
      <div className="w-32 h-32 overflow-hidden">
        <img
          src={
            photoUrl
              ? photoUrl
              : "https://imagescdn.gettyimagesbank.com/500/202202/jv12533599.jpg"
          }
          className="object-cover object-center h-full w-full rounded-md"
        />
      </div>
      <div className="flex flex-col flex-1">
        <div className="text-xl font-bold mb-3">{title || '제목 없음'}</div>
        <div className="flex items-center gap-3">
          <IoLocationOutline className="text-blue-500" />
          <span className="text-gray-500">
            {upperArea}블록 / {lowerArea}동
          </span>
        </div>
        <div className="flex items-center gap-3">
          <IoTimeOutline className="text-blue-500" />
          <span className="text-gray-500">{uploadTime || '시간 정보 없음'}</span>
        </div>
        <div className="flex items-center gap-3">
          <CiWarning className="text-brand" />
          <span className="text-gray-500">{score || 0}점</span>
        </div>
      </div>
      <div className="flex items-center justify-center rounded-full p-1 hover:cursor-pointer">
        <GrLinkNext className="w-7 h-7" />
      </div>
    </div>
  );
}
