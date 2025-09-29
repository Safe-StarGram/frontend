import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "../api/axiosInstance";
import type { IDetailInfo } from "../../pages/Detail/types";

interface CheckActionData {
  postId: number;
  actionType: 'check' | 'action' | 'managerRisk';
  userId: number;
  currentData: IDetailInfo;
  managerRisk?: string; // managerRisk 업데이트 시 사용
}

export const useCheckAction = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ postId, actionType, userId, currentData, managerRisk }: CheckActionData) => {
      const currentDate = new Date().toISOString();
      
      // 기본 요청 바디 (모든 필드 포함)
      const requestBody = {
        isChecked: currentData.isChecked,
        checkerId: currentData.checkerId,
        checkedAt: currentData.checkedAt,
        isActionTaked: currentData.isActionTaked,
        actionTakerId: currentData.actionTakerId,
        actionTakenAt: currentData.actionTakenAt,
        managerRisk: currentData.managerRisk,
      };

      // 액션 타입에 따라 해당 필드만 업데이트 (토글 기능)
      if (actionType === 'check') {
        // 이미 체크된 상태라면 비활성화, 아니면 활성화
        const isCurrentlyChecked = Number(currentData.isChecked) === 1;
        requestBody.isChecked = isCurrentlyChecked ? 0 : 1;
        requestBody.checkerId = isCurrentlyChecked ? null : userId;
        requestBody.checkedAt = isCurrentlyChecked ? null : currentDate;
        
        console.log("확인 토글 디버깅:", {
          isCurrentlyChecked,
          currentDate,
          requestBody: {
            isChecked: requestBody.isChecked,
            checkerId: requestBody.checkerId,
            checkedAt: requestBody.checkedAt
          }
        });
      } else if (actionType === 'action') {
        // 이미 조치된 상태라면 비활성화, 아니면 활성화
        const isCurrentlyActionTaken = Number(currentData.isActionTaked) === 1;
        requestBody.isActionTaked = isCurrentlyActionTaken ? 0 : 1;
        requestBody.actionTakerId = isCurrentlyActionTaken ? null : userId;
        requestBody.actionTakenAt = isCurrentlyActionTaken ? null : currentDate;
        
        console.log("조치 토글 디버깅:", {
          isCurrentlyActionTaken,
          currentDate,
          requestBody: {
            isActionTaked: requestBody.isActionTaked,
            actionTakerId: requestBody.actionTakerId,
            actionTakenAt: requestBody.actionTakenAt
          }
        });
      } else if (actionType === 'managerRisk') {
        // managerRisk 업데이트
        requestBody.managerRisk = managerRisk;
        
        console.log("managerRisk 업데이트 디버깅:", {
          managerRisk,
          requestBody: {
            managerRisk: requestBody.managerRisk
          }
        });
      }

      console.log("API 요청 바디:", requestBody);
      const response = await api.patch(`/api/admin/notices/${postId}`, requestBody);
      console.log("API 응답:", response.data);
      return response.data;
    },
    onSuccess: (data, variables) => {
      let message = "";
      
      if (variables.actionType === 'managerRisk') {
        message = "안전/보건 관리자 평가가 업데이트되었습니다!";
      } else {
        const action = variables.actionType === 'check' ? '확인' : '조치';
        const particle = variables.actionType === 'check' ? '이' : '가'; // 확인은 '이', 조치는 '가'
        
        // 현재 상태 확인하여 적절한 메시지 표시
        const isCurrentlyChecked = variables.actionType === 'check' 
          ? Number(variables.currentData.isChecked) === 1 
          : Number(variables.currentData.isActionTaked) === 1;
        
        message = isCurrentlyChecked 
          ? `${action}${particle} 취소되었습니다!` 
          : `${action}${particle} 완료되었습니다!`;
      }
        
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
      });
      
      // Detail 쿼리 무효화하여 데이터 새로고침
      queryClient.invalidateQueries({ queryKey: ["detail", { postId: variables.postId.toString() }] });
    },
    onError: (error: any) => {
      console.error("Check/Action error:", error);
      toast.error(`처리 중 오류가 발생했습니다: ${error.response?.data?.message || error.message}`, {
        position: "top-center",
        autoClose: 5000,
      });
    },
  });

  return {
    checkAction: mutation.mutate,
    isProcessing: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
