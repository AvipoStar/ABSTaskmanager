import { axiosInstance } from "../../../config/axios/axiosInstance";

export const addRoles = async (
  user_id: number,
  team_id: number,
  role_ids: number[]
) => {
  let result: any = {};
  await axiosInstance
    .post("worker/add_roles", {
      user_id: user_id,
      team_id: team_id,
      role_ids: role_ids,
    })
    .then((res) => {
      if (res.data.success) {
        result = res.data.success;
      }
    });
  if (result) return result;
};
