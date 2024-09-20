import { axiosInstance } from "../../../config/axios/axiosInstance";

export const getColumnNulls = async (tableName: string, columnName: string) => {
  let result: any = {};
  await axiosInstance
    .post(`database/getColumnNulls`, {
      tableName: tableName,
      columnName: columnName,
    })
    .then((res) => {
      if (res.data.result) {
        result = res.data.result;
      }
    });
  if (result) return result;
};
