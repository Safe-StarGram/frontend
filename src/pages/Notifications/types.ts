export interface INotification {
  postId: number;
  title: string;
  postPhotoUrl: string;
  content: string;
  
  areaId: number;
  subAreaId: number;
  reporterId: number;

  isChecked: number;
  checkerId: number | null;
  checkedAt: string | null;

  isActionTaked: number;
  actionTakerId: number | null;
  actionTakenAt: string | null;

  reporterRiskScore: number;
  reporterRiskDescription: string;

  reporterRisk: string;
  managerRisk: string | null;

  createdAt: string;
  updatedAt: string | null;
}
