import { axiosInstance } from "../../../config/axios/axiosInstance";

export const getTablesColumns = async () => {
  let result: any = {};
  await axiosInstance.get("/database/getTablesColumns").then((res) => {
    if (res.data.result) {
      result = res.data.result;
    }
  });
  if (result) return result;
};
