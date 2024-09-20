import { axiosInstance } from "../../../config/axios/axiosInstance";

export const createProjectDirection = async (name: string, team_id: number) => {
  let result: any = {};
  await axiosInstance
    .post("team/create_project_direction", { name: name, team_id: team_id })
    .then((res) => {
      if (res.data.project_direction_id) {
        result = res.data.project_direction_id;
      }
    });
  if (result) return result;
};
