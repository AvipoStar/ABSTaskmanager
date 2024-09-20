import { axiosInstance } from "../../../config/axios/axiosInstance";

export const createProject = async (
  direction_id: number,
  name: string,
  team_id: number
) => {
  let result: any = {};
  await axiosInstance
    .post("team/create_project", {
      direction_id: direction_id,
      name: name,
      team_id: team_id,
      isActive: true,
    })
    .then((res) => {
      if (res.data.project_id) {
        result = res.data.project_id;
      }
    });
  if (result) return result;
};
