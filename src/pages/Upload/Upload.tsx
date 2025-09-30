import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import Button from "../../shared/layout/Button";
import Layout from "../../shared/layout/Layout";
import { useCurrentTime } from "../../shared/hooks/useCurrentTime";
import { useProfile } from "../../shared/hooks/useProfile";
import type { IForm, IUploadData } from "./types";
import { ImageUploader } from "./components/ImageUploader";
import { LocationSelector } from "./components/LocationSelector";
import { ReportInfo } from "./components/ReportInfo";
import { FormFields } from "./components/FormFields";
import { useArea } from "../../features/Areas/useArea";
import { usePost } from "../../features/Posts/usePost";
import { compressImageForPost } from "../../shared/utils/imageCompression";
import { toast } from "react-toastify";

export default function Upload() {
  const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm<IForm>();
  const { profileData } = useProfile();
  const time = useCurrentTime();
  const { uploadMutation } = usePost();
  const { areas } = useArea();
  const [preview, setPreview] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      try {
        // 이미지 압축
        const compressedFile = await compressImageForPost(file);
        
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(compressedFile);
        
        // 압축된 파일을 form에 설정
        setValue("image", compressedFile);
      } catch (error) {
        console.error("이미지 압축 실패:", error);
        toast.error("이미지 압축에 실패했습니다.", {
          position: "top-center",
          autoClose: 3000,
        });
        
        // 압축 실패 시 원본 파일 사용
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        setValue("image", file);
      }
    }
  };


  // Canvas와 이미지를 합치고 Blob으로 변환
  const mergeImageAndCanvas = (): Promise<Blob | null> => {
    const canvasLayer = canvasRef.current;
    
    if (!preview || !canvasLayer) {
      return Promise.resolve(null);
    }

    return new Promise((resolve) => {
      const img = new Image();
      img.src = preview;
      img.onload = () => {
        // 원본 이미지의 실제 크기 사용
        const originalWidth = img.naturalWidth;
        const originalHeight = img.naturalHeight;
        
        const mergedCanvas = document.createElement("canvas");
        mergedCanvas.width = originalWidth;
        mergedCanvas.height = originalHeight;

        const ctx = mergedCanvas.getContext("2d");
        if (!ctx) {
          return resolve(null);
        }

        // 원본 이미지를 원본 크기로 그리기
        ctx.drawImage(img, 0, 0, originalWidth, originalHeight);
        
        // 캔버스 레이어의 이미지 표시 정보 가져오기
        const imageDisplayInfo = (canvasLayer as any).imageDisplayInfo;
        
        if (imageDisplayInfo) {
          // 이미지 표시 영역에 맞게 캔버스 내용을 스케일링하여 그리기
          const scaleX = originalWidth / imageDisplayInfo.displayWidth;
          const scaleY = originalHeight / imageDisplayInfo.displayHeight;
          
          ctx.save();
          ctx.scale(scaleX, scaleY);
          ctx.drawImage(canvasLayer, 0, 0);
          ctx.restore();
        } else {
          // fallback: 기존 방식
          const scaleX = originalWidth / canvasLayer.width;
          const scaleY = originalHeight / canvasLayer.height;
          
          ctx.save();
          ctx.scale(scaleX, scaleY);
          ctx.drawImage(canvasLayer, 0, 0);
          ctx.restore();
        }

        mergedCanvas.toBlob((blob) => {
          resolve(blob);
        }, "image/jpeg", 0.9);
      };
      img.onerror = () => {
        resolve(null);
      };
    });
  };

  // Canvas 참조 업데이트
  const handleCanvasChange = (canvas: HTMLCanvasElement | null) => {
    canvasRef.current = canvas;
  };

  const onSubmit = async (data: IForm) => {
    // 필수 필드 검증
    if (!data.image) {
      toast.error("이미지를 선택해주세요.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    if (!data.title || data.title.trim() === "") {
      toast.error("제목을 입력해주세요.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    if (!data.description || data.description.trim() === "") {
      toast.error("내용을 입력해주세요.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    if (!data.upperArea) {
      toast.error("상위구역을 선택해주세요.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    if (!data.lowerArea) {
      toast.error("하위구역을 선택해주세요.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    if (!data.score) {
      toast.error("위험성 평가를 선택해주세요.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    try {
      const uploadData: IUploadData = {
        areaId: data.upperArea,
        subAreaId: data.lowerArea,
        title: data.title,
        content: data.description,
        reporterRisk: String(data.score),
      };

      if (data.image && preview) {
        // Canvas와 이미지를 합친 결과를 사용
        const mergedBlob = await mergeImageAndCanvas();
        
        if (mergedBlob) {
          // Blob을 File 객체로 변환
          const file = new File([mergedBlob], "merged-image.jpg", { type: "image/jpeg" });
          uploadData.image = file;
        } else {
          uploadData.image = data.image;
        }
      } else if (data.image) {
        uploadData.image = data.image;
      }

      uploadMutation.mutate(uploadData, {
        onSuccess: () => {
          toast.success("게시물이 성공적으로 업로드되었습니다!", {
            position: "top-center",
            autoClose: 3000,
          });
          reset();
          setPreview(null);
          canvasRef.current = null;
        },
        onError: (error) => {
          console.error("업로드 실패:", error);
          toast.error("업로드에 실패했습니다. 다시 시도해주세요.", {
            position: "top-center",
            autoClose: 3000,
          });
        },
      });
    } catch (error) {
      console.error("onSubmit 에러:", error);
      toast.error("업로드 중 오류가 발생했습니다.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <Layout
      title="위험 요소 사진 올리기"
      showBackButton={false}
      activeTab="upload"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ImageUploader 
          preview={preview} 
          onFileChange={handleFileChange} 
          onCanvasChange={handleCanvasChange}
        />

        <div className="flex flex-col gap-5 mt-10">
          <h3 className="text-xl font-bold">위험 요소 설명</h3>
          <LocationSelector register={register} watch={watch} areas={areas} errors={errors} />
          <ReportInfo profileData={profileData} currentTime={time} />
        </div>

        <FormFields register={register} isLoading={uploadMutation.isPending} errors={errors} />

        {uploadMutation.isError && (
          <div className="mt-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            업로드 중 오류가 발생했습니다. 다시 시도해주세요.
          </div>
        )}

        <Button
          disabled={uploadMutation.isPending}
          className={`${
            uploadMutation.isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-brand hover:cursor-pointer hover:bg-orange-300"
          } transition rounded-2xl mt-5 w-full border-none`}
        >
          {uploadMutation.isPending ? "업로드 중..." : "등록"}
        </Button>
      </form>
    </Layout>
  );
}
