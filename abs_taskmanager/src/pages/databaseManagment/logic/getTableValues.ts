import { axiosInstance } from "../../../config/axios/axiosInstance";

export const getTableValues = async (tableName: string) => {
  let result: any = {};
  await axiosInstance
    .get(`database/getTableValues/${tableName}`)
    .then((res) => {
      if (res.data.result) {
        result = res.data.result;
      }
    });
  if (result) return result;
};
