import { axiosInstance } from "../../../config/axios/axiosInstance";
import { IEditedTable } from "../main/DatabaseManagment";

export const setTable = async (newTable: IEditedTable) => {
  await axiosInstance.post("database/setNewTable", {
    name: newTable.name,
    columns: newTable.columns,
  });
};
