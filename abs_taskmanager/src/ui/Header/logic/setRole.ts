import { axiosInstance } from "../../../config/axios/axiosInstance";

export const setRole = async (name: string, team_id: number) => {
  let result: any = {};
  await axiosInstance
    .post("team/create_role", { name: name, team_id: team_id })
    .then((res) => {
      if (res.data.role_id) {
        result = res.data.role_id;
      }
    });
  if (result) return result;
};
