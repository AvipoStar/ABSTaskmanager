import { axiosInstance } from "../../../config/axios/axiosInstance";

export const setIndex = async (
  table_name: string,
  index_name: string,
  column_name: string
) => {
  await axiosInstance.post("database/setIndex", {
    table_name: table_name,
    index_name: index_name,
    column_name: column_name,
  });
};
