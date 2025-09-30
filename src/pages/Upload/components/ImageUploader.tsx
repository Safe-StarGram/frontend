import { LuCirclePlus } from "react-icons/lu";
import { CanvasPainting } from "../../../features/CanvasPainting";

interface ImageUploaderProps {
  preview: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCanvasChange?: (canvas: HTMLCanvasElement | null) => void;
}

export const ImageUploader = ({
  preview,
  onFileChange,
  onCanvasChange,
}: ImageUploaderProps) => {

  return (
    <div className="w-full flex flex-col items-center">
      {preview ? (
        <div className="w-full h-64 relative rounded-xl border border-gray-300 mb-3">
          <CanvasPainting
            preview={preview}
            onCanvasChange={onCanvasChange}
            className="w-full h-full rounded-xl"
          />
        </div>
      ) : (
        <label
          htmlFor="imageUpload"
          className="w-full h-64 flex flex-col justify-center items-center rounded-xl cursor-pointer bg-gray-200 hover:bg-gray-300 transition mb-3"
        >
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <LuCirclePlus className="w-24 h-24 text-orange-500" />
            <p className="text-sm text-gray-600">위험 사진 올리기</p>
          </div>
        </label>
      )}
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
      {preview && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              // CanvasPainting 컴포넌트에서 clearCanvas 함수를 가져와서 실행
              const clearCanvasElement = document.querySelector('[data-clear-canvas]') as any;
              if (clearCanvasElement?.clearCanvas) {
                clearCanvasElement.clearCanvas();
              }
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition text-sm"
          >
            그리기 지우기
          </button>
          <label
            htmlFor="imageUpload"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm cursor-pointer"
          >
            사진 변경
          </label>
        </div>
      )}
    </div>
  );
};