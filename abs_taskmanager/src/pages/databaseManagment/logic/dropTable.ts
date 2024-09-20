import { axiosInstance } from "../../../config/axios/axiosInstance";
import { IEditedTable } from "../main/DatabaseManagment";

export const dropTable = async (tableName: string) => {
  await axiosInstance.delete(`database/dropTable/${tableName}`);
};
