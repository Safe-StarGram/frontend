import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useAddArea } from "../../../features/AddArea/useAddArea";
import { compressImageForArea } from "../../../shared/utils/imageCompression";
import { toast } from "react-toastify";

interface SubArea {
  id: number;
  name: string;
}

interface AddAreaContextType {
  // 상태
  areaName: string;
  subAreas: SubArea[];
  newSubAreaName: string;
  selectedImage: File | null;
  imagePreview: string | null;
  
  // 액션들
  setAreaName: (name: string) => void;
  addSubArea: () => void;
  removeSubArea: (id: number) => void;
  handleSubAreaChange: (id: number, name: string) => void;
  setNewSubAreaName: (name: string) => void;
  handleImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegister: () => void;
  
  // API 상태
  isLoading: boolean;
}

const AddAreaContext = createContext<AddAreaContextType | undefined>(undefined);

interface AddAreaProviderProps {
  children: ReactNode;
}

export function AddAreaProvider({ children }: AddAreaProviderProps) {
  const addAreaMutation = useAddArea();
  
  // 상태들
  const [areaName, setAreaName] = useState("");
  const [subAreas, setSubAreas] = useState<SubArea[]>([]);
  const [newSubAreaName, setNewSubAreaName] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // 액션들
  const addSubArea = () => {
    if (newSubAreaName.trim()) {
      const newSubArea: SubArea = {
        id: Date.now(),
        name: newSubAreaName.trim(),
      };
      setSubAreas([...subAreas, newSubArea]);
      setNewSubAreaName("");
    }
  };

  const removeSubArea = (id: number) => {
    setSubAreas(subAreas.filter((area) => area.id !== id));
  };

  const handleSubAreaChange = (id: number, name: string) => {
    setSubAreas(subAreas.map(area => 
      area.id === id ? { ...area, name } : area
    ));
  };

  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        // 이미지 압축
        const compressedFile = await compressImageForArea(file);
        
        setSelectedImage(compressedFile);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("이미지 압축 실패:", error);
        toast.error("이미지 압축에 실패했습니다.", {
          position: "top-center",
          autoClose: 3000,
        });
        
        // 압축 실패 시 원본 파일 사용
        setSelectedImage(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleRegister = () => {
    if (!areaName.trim()) {
      alert("관리구역명을 입력해주세요.");
      return;
    }
    if (subAreas.length === 0) {
      alert("최소 하나의 소구역을 추가해주세요.");
      return;
    }

    // API 호출
    addAreaMutation.mutate({
      areaName: areaName.trim(),
      subAreas: subAreas,
      image: selectedImage,
    });
  };

  const value: AddAreaContextType = {
    // 상태
    areaName,
    subAreas,
    newSubAreaName,
    selectedImage,
    imagePreview,
    
    // 액션들
    setAreaName,
    addSubArea,
    removeSubArea,
    handleSubAreaChange,
    setNewSubAreaName,
    handleImageSelect,
    handleRegister,
    
    // API 상태
    isLoading: addAreaMutation.isPending,
  };

  return (
    <AddAreaContext.Provider value={value}>
      {children}
    </AddAreaContext.Provider>
  );
}

// Custom hook for using the context
export function useAddAreaContext() {
  const context = useContext(AddAreaContext);
  if (context === undefined) {
    throw new Error('useAddAreaContext must be used within an AddAreaProvider');
  }
  return context;
}
