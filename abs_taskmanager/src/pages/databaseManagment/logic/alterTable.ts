import { axiosInstance } from "../../../config/axios/axiosInstance";
import { IEditedTable } from "../main/DatabaseManagment";

export const alterTable = async (newTable: IEditedTable) => {
  console.log('newTable', newTable)
  await axiosInstance.put("database/alterTable", {
    name: newTable.name,
    columns: newTable.columns,
  });
};
