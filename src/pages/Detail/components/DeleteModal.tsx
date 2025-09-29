import { FaRegTrashAlt } from "react-icons/fa";
import Button from "../../../shared/layout/Button";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export default function DeleteModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isDeleting = false 
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <FaRegTrashAlt className="w-8 h-8 text-red-500" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            게시물 삭제
          </h3>
          
          <p className="text-gray-600 mb-6">
            정말로 이 게시물을 삭제하시겠습니까?<br />
            삭제된 게시물은 복구할 수 없습니다.
          </p>
          
          <div className="flex gap-3 w-full">
            <Button
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1"
              baseColor="gray"
              hoverColor="gray"
            >
              취소
            </Button>
            <Button
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex-1"
              baseColor="red"
              hoverColor="red"
            >
              {isDeleting ? "삭제 중..." : "삭제"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
