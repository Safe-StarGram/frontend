import { useRef, useState, useEffect } from "react";

interface CanvasPaintingProps {
  preview: string | null;
  onCanvasChange?: (canvas: HTMLCanvasElement | null) => void;
  className?: string;
}

export const CanvasPainting = ({ 
  preview, 
  onCanvasChange, 
  className = "w-full h-full" 
}: CanvasPaintingProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Canvas 크기 조정
  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const resize = () => {
      // 이미지가 로드될 때까지 기다림
      if (img.complete && img.naturalWidth && img.naturalHeight) {
        const containerWidth = img.clientWidth;
        const containerHeight = img.clientHeight;
        const imageAspectRatio = img.naturalWidth / img.naturalHeight;
        const containerAspectRatio = containerWidth / containerHeight;

        let displayWidth, displayHeight, offsetX, offsetY;

        if (imageAspectRatio > containerAspectRatio) {
          // 이미지가 더 넓음 - 너비에 맞춤
          displayWidth = containerWidth;
          displayHeight = containerWidth / imageAspectRatio;
          offsetX = 0;
          offsetY = (containerHeight - displayHeight) / 2;
        } else {
          // 이미지가 더 높음 - 높이에 맞춤
          displayHeight = containerHeight;
          displayWidth = containerHeight * imageAspectRatio;
          offsetX = (containerWidth - displayWidth) / 2;
          offsetY = 0;
        }

        // 캔버스 크기를 이미지 표시 크기로 설정
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        canvas.style.width = `${displayWidth}px`;
        canvas.style.height = `${displayHeight}px`;
        canvas.style.position = 'absolute';
        canvas.style.left = `${offsetX}px`;
        canvas.style.top = `${offsetY}px`;
        
        // 캔버스 컨텍스트 설정
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.strokeStyle = "#ff0000";
          ctx.lineWidth = 3;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
        }

        // 이미지 표시 정보를 캔버스에 저장
        (canvas as any).imageDisplayInfo = {
          displayWidth,
          displayHeight,
          offsetX,
          offsetY,
          imageAspectRatio
        };
      }
    };

    // 이미지 로드 완료 후 크기 설정
    img.onload = resize;
    
    // 초기 크기 설정 (이미 로드된 경우)
    resize();

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

    let clientX, clientY;
    if (e instanceof MouseEvent) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    // 캔버스 내의 상대 좌표 (캔버스 크기와 표시 크기가 동일하므로 스케일링 불필요)
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
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
    ctx.stroke();
  };

  // 그리기 중지
  const stopDrawing = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.beginPath(); // 다음 그리기를 위해 새로운 경로 시작
      }
    }
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

  if (!preview) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      <img
        ref={imageRef}
        src={preview}
        alt="업로드 미리보기"
        className="w-full h-full object-contain"
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
      {/* clearCanvas 함수를 외부에서 사용할 수 있도록 data 속성으로 노출 */}
      <div 
        style={{ display: 'none' }} 
        data-clear-canvas 
        ref={(el) => {
          if (el) {
            (el as any).clearCanvas = clearCanvas;
          }
        }} 
      />
    </div>
  );
};
