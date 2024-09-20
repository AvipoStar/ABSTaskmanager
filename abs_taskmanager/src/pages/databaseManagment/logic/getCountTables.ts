import { axiosInstance } from "../../../config/axios/axiosInstance";

export const getCountTables = async () => {
  let result: any = {};
  await axiosInstance.get("database/getCountTables").then((res) => {
    if (res.data.result) {
      result = res.data.result;
    }
  });
  if (result) return result;
};
