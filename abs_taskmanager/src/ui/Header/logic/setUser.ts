import { axiosInstance } from "../../../config/axios/axiosInstance";

export const createWorker = async (
  login: string,
  password: string,
  fio: string,
  mail: string
) => {
  let result: any = {};
  await axiosInstance
    .post("worker/create_worker", {
      login: login,
      password: password,
      fio: fio,
      mail: mail,
    })
    .then((res) => {
      if (res.data.worker_id) {
        result = res.data.worker_id;
      }
    });
  if (result) return result;
};
