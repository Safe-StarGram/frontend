import { useState } from "react";
import { IoCamera } from "react-icons/io5";
import type { UseFormSetValue } from "react-hook-form";
import type { IProfileData } from "../types";
import { compressImageForProfile } from "../../../shared/utils/imageCompression";
import { toast } from "react-toastify";

interface Props {
  setValue: UseFormSetValue<IProfileData>;
  defaultImage?: string | null;
}

export default function ProfileImageUpload({ setValue, defaultImage }: Props) {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // 이미지 압축
        const compressedFile = await compressImageForProfile(file);
        
        setPreview(URL.createObjectURL(compressedFile));
        setValue("image", compressedFile);
      } catch (error) {
        console.error("이미지 압축 실패:", error);
        toast.error("이미지 압축에 실패했습니다.", {
          position: "top-center",
          autoClose: 3000,
        });
        
        // 압축 실패 시 원본 파일 사용
        setPreview(URL.createObjectURL(file));
        setValue("image", file);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 my-5">
      <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-200">
        {preview ? (
          <img
            src={preview}
            alt="프로필"
            className="w-full h-full object-cover"
          />
        ) : (
          <IoCamera className="w-full h-full p-6 text-gray-400" />
        )}
      </div>
      <label
        htmlFor="profileUpload"
        className="flex items-center space-x-2 bg-orange-400 hover:bg-orange-500 transition text-white font-bold py-2 px-4 rounded-full cursor-pointer"
      >
        <IoCamera />
        <span>프로필 사진 변경</span>
      </label>
      <input
        type="file"
        id="profileUpload"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
}
