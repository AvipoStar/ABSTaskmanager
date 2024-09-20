import { axiosInstance } from "../../../config/axios/axiosInstance";

export const loginPassword = async (login: string, password: string) => {
  let result: any = {};
  await axiosInstance
    .post("/authReg/login", { login: login, password: password })
    .then((res) => {
      if (res.data.worker) {
        result.worker = res.data.worker;
        result.access_token = res.data.access_token;
      }
    });
  if (result) return result;
};

export const loginToken = async (token: string) => {
  let result: any = {};
  await axiosInstance
    .post("/authReg/loginToken", { token: token })
    .then((res) => {
      if (res.data.worker) {
        result.worker = res.data.worker;
        result.access_token = res.data.access_token;
      }
    });
  if (result) return result;
};
