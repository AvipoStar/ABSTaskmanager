import { axiosInstance } from "../../../config/axios/axiosInstance";

export const setTask = async (
  columnName: string,
  columnId: number,
  creatorId: number,
  taskId?: number
) => {
  let result: any;
  if (taskId != -1)
    await axiosInstance
      .post(`taskmanager/create_task`, {
        name: columnName,
        column_id: columnId,
        id: taskId,
        creator_id: creatorId,
      })
      .then((res) => {
        if (res.data.column_id) {
          result = res.data.task_id;
        }
      });
  else
    await axiosInstance
      .post(`taskmanager/create_task`, {
        name: columnName,
        column_id: columnId,
        creator_id: creatorId,
      })
      .then((res) => {
        if (res.data.column_id) {
          result = res.data.task_id;
        }
      });
  if (result) {
    console.log("result", result);
    return result;
  }
};
