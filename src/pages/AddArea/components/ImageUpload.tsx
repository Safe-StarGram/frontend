import { useRef } from "react";
import { LuCirclePlus } from "react-icons/lu";
import { useAddAreaContext } from "../context/AddAreaContext";

export default function ImageUpload() {
  const { imagePreview, handleImageSelect } = useAddAreaContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div 
        onClick={handleImageClick}
        className="w-full h-64 bg-gray-200 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors relative overflow-hidden"
      >
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="선택된 이미지"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 bg-transparent rounded-full flex items-center justify-center">
              <LuCirclePlus className="w-20 h-20 text-orange-500" />
            </div>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
      />
    </div>
  );
}
