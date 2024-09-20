import { axiosInstance } from "../../../config/axios/axiosInstance";

export const getProjectInfo = async (projectId: number) => {
  let result: any = {};
  await axiosInstance
    .get(`project/get_project_info/${projectId}`)
    .then((res) => {
      if (res.data.project_info) {
        result.project_info = res.data.project_info;
        result.columns = res.data.columns;
      }
    });
  if (result) {
    return result;
  }
};
