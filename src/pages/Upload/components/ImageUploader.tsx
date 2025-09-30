import { LuCirclePlus } from "react-icons/lu";
import { useRef, useState, useEffect } from "react";

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Canvas 크기 조정
  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const resize = () => {
      const width = img.clientWidth;
      const height = img.clientHeight;

      if (width && height) {
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(img);

    return () => {
      observer.disconnect();
    };
  }, [preview]);

  // Canvas 변경 시 부모 컴포넌트에 알림
  useEffect(() => {
    onCanvasChange?.(canvasRef.current);
  }, [onCanvasChange]);

  // Canvas 좌표 계산
  const getCanvasCoords = (
    e: MouseEvent | TouchEvent,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX, clientY;
    if (e instanceof MouseEvent) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    return { x, y };
  };

  // 그리기 시작
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getCanvasCoords(e.nativeEvent as MouseEvent | TouchEvent, canvas);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    setIsDrawing(true);
  };

  // 그리기
  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getCanvasCoords(e.nativeEvent as MouseEvent | TouchEvent, canvas);
    ctx.lineTo(coords.x, coords.y);
    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  // 그리기 중지
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Canvas 초기화
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {preview ? (
        <div className="w-full h-64 relative rounded-xl border border-gray-300 mb-3">
          <img
            ref={imageRef}
            src={preview}
            alt="업로드 미리보기"
            className="w-full h-full object-contain rounded-xl"
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
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
            onClick={clearCanvas}
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
