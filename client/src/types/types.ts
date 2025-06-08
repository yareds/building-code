export interface BuildingCode {
  _id?: string;
  buildingName: string;
  code: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BuildingCodeFormData {
  buildingName: string;
  code: string;
} 