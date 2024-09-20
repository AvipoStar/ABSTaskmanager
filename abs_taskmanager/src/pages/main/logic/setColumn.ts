import { axiosInstance } from "../../../config/axios/axiosInstance";

export const setColumn = async (
  columnName: string,
  projectId: number,
  columnId?: number
) => {
  let result: any;
  if (columnId != -1)
    await axiosInstance
      .post(`taskmanager/create_column`, {
        name: columnName,
        project_id: projectId,
        id: columnId,
      })
      .then((res) => {
        if (res.data.column_id) {
          result = res.data.column_id;
        }
      });
  else
    await axiosInstance
      .post(`taskmanager/create_column`, {
        name: columnName,
        project_id: projectId,
      })
      .then((res) => {
        if (res.data.column_id) {
          result = res.data.column_id;
        }
      });
  if (result) return result;
};
