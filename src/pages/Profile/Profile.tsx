import Layout from "../../shared/layout/Layout";
import Button from "../../shared/layout/Button";
import { useProfile } from "../../shared/hooks/useProfile";
import { useLogout } from "../../shared/hooks/useLogout";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import ProfileForm from "./components/ProfileForm";
import type { IProfileData } from "./types";

export default function Profile() {
  const navigate = useNavigate();
  const userRole = useSelector((state: RootState) => state.user.role);
  const isAdmin = userRole === "ROLE_ADMIN";
  
  const {
    profileData,
    isLoading: queryLoading,
    isError: queryError,
    mutate,
    isSuccess: mutationSuccess,
    isPending: mutationLoading,
  } = useProfile();

  const { mutate: logout, isPending: isLogoutPending } = useLogout();

  // 저장 중인지 추적하는 ref
  const isSaving = useRef(false);
  // 프로필 저장 성공 토스트
  useEffect(() => {
    if (mutationSuccess) {
      toast.success("프로필이 성공적으로 저장되었습니다!", {
        position: "top-center",
        autoClose: 3000,
      });
      // 저장 완료 후 잠시 기다린 다음 저장 상태 해제
      setTimeout(() => {
        isSaving.current = false;
      }, 1000);
    }
  }, [mutationSuccess]);

  // 쿼리 에러시 에러 화면 표시
  if (queryError) {
    return (
      <Layout title="프로파일" showBackButton={false} activeTab="profile">
        <div className="text-center py-16">
          <p className="text-red-500 mb-4">
            프로필 데이터를 불러올 수 없습니다. 새로고침을 해주세요.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            다시 시도
          </button>
        </div>
      </Layout>
    );
  }

  // 초기 로딩 중이거나 데이터가 없으면 스켈레톤 코드
  if (queryLoading || !profileData) {
    return <></>;
  }

  const handleSubmit = (data: IProfileData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phoneNumber", data.phone);
    formData.append("radioNumber", String(data.radio));
    formData.append("department", data.department);
    formData.append("position", data.position);
    if (data.image && data.image instanceof File) {
      formData.append("image", data.image);
    }
    isSaving.current = true;
    mutate(formData);
  };

  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      logout();
    }
  };

  return (
    <Layout title="프로파일" showBackButton={false} activeTab="profile">
      <ProfileForm defaultValues={profileData} onSubmit={handleSubmit} />
      {isAdmin && (
        <Button
          disabled={mutationLoading}
          className="rounded-2xl w-full mb-3"
          baseColor="black"
          hoverColor="black"
          onClick={() => navigate("/management")}
        >
          현장 관리
        </Button>
      )}
      <Button
        disabled={isLogoutPending}
        className="rounded-2xl w-full"
        baseColor="red"
        hoverColor="red"
        onClick={handleLogout}
      >
        {isLogoutPending ? "로그아웃 중..." : "로그아웃"}
      </Button>
    </Layout>
  );
}
