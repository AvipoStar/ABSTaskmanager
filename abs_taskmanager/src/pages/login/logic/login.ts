import { axiosInstance } from "../../../config/axios/axiosInstance";

export const login = async (login: string, password: string) => {
  let result: any;
  await axiosInstance
    .post("/authReg/login", { login: login, password: password })
    .then((res) => {
      if (res.data.worker) {
        result = res.data.worker;
      }
    });
  if (result) return result;
};
