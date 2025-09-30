// 서브 구역 데이터 타입 (실제 API 응답에 맞게 수정)
export interface SubArea {
  id: number;  // subAreaId가 아니라 id
  name: string;
}

// 관리구역 데이터 타입 (실제 API 응답에 맞게 수정)
export interface ManagementArea {
  id: number;
  areaName: string;
  imageUrl: string;  // null이 아닌 string으로 수정
  subAreas: SubArea[];
}

// 관리자 데이터 타입
export interface Manager {
  id: number;
  name: string;
  department: string;
  phone: string;
  extension: string;
  status: "권한부여" | "권한제거";
  avatar: string;
}
