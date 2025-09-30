export interface IAreaData {
  areaId: number;
  subAreaId: number;
  createdAt: string;
  content: string;
}

export interface IDetailInfo {
  postId: number;
  title: string;
  postPhotoUrl: string;
  content: string;
  
  areaId: number;
  subAreaId: number;
  reporterId: number;

  isChecked: string | number;
  checkerId: string | number | null;
  checkedAt: string | null;

  isActionTaked: string | number;
  actionTakerId: string | number | null;
  actionTakenAt: string | null;

  reporterRiskScore: number;
  reporterRiskDescription: string;

  reporterRisk: number;
  managerRisk: string | null;

  createdAt: string;
  updatedAt: string | null;
}

export interface IActionForm {
  isChecked: number;
  isActionTaken: number;
}

export interface IComment {
  userId: number;
  commentId: number;
  userName: string;
  positionId: number;
  departmentId: number;
  message: string;
  createdAt: string;
  postId: string;
  profilePhotoUrl: string;
}

export interface Area {
  id: number;
  areaName: string;
  imageUrl: string | null;
  subAreas: SubArea[];
}

export interface SubArea {
  subAreaId: number;
  name: string;
}

export interface IForm {
  title: string;
  areaId: number;
  subAreaId: number;
  content: string;
  reporterRisk: string;
}
