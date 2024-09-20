import { axiosInstance } from "../../../config/axios/axiosInstance";

export const getUserTeams = async (userId: number) => {
  let result: any;
  await axiosInstance.get(`worker/get_teams/${userId}`).then((res) => {
    if (res.data.teams) {
      result = res.data.teams;
    }
  });
  if (result) return result;
};
