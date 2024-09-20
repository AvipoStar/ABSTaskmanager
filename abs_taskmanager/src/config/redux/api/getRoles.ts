import { axiosInstance } from "../../../config/axios/axiosInstance";

export const getRoles = async (team_id: number) => {
  let result: any = {};
  await axiosInstance.get(`team/get_roles/${team_id}`).then((res) => {
    if (res.data.roles) {
      result = res.data.roles;
    }
  });
  if (result) {
    return result;
  }
};
