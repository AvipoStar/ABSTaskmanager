import { axiosInstance } from "../../../config/axios/axiosInstance";

export const changeData = async (
  tableName: string,
  columnName: string,
  stringId: number,
  value: string
) => {
  await axiosInstance.put("database/changeData", {
    tableName: tableName,
    columnName: columnName,
    stringId: stringId,
    value: value,
  });
};
