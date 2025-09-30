export interface IForm {
  image: File | null;
  upperArea: string;
  lowerArea: string;
  title: string;
  description: string;
  score: number;
}

export interface IUploadData {
  image?: File;
  areaId: string;
  subAreaId: string;
  title: string;
  content: string;
  reporterRisk: string;
}

// 미조치 건수, 위험요소 신고 건수 필요.
export interface IArea {
  id: number;
  areaName: string;
  imageUrl: string;
  subAreas: ISubArea[];
}

export interface ISubArea {
  id: number;
  name: string;
}
