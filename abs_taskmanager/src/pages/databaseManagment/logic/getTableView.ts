import { axiosInstance } from "../../../config/axios/axiosInstance";

export const getFirstView = async () => {
  let result: any = {};
  await axiosInstance.get(`database/getFirstView/`).then((res) => {
    if (res.data.result) {
      result = res.data.result;
    }
  });
  if (result) return result;
};

export const getSecondView = async (dateStart: string, dateEnd: string) => {
  let result: any = {};
  await axiosInstance
    .post(`database/getSecondView/`, {
      start_date: dateStart,
      end_date: dateEnd,
    })
    .then((res) => {
      if (res.data.result) {
        result = res.data.result;
      }
    });
  if (result) return result;
};

export const getDirections = async () => {
  let result: any = {};
  await axiosInstance.get(`database/getProjectDirections/`).then((res) => {
    if (res.data.result) {
      result = res.data.result;
    }
  });
  if (result) return result;
};

export const getThirdView = async (project_direction_ids: number[]) => {
  let result: any = {};
  await axiosInstance
    .post(`database/getThirdView/`, { list: project_direction_ids })
    .then((res) => {
      if (res.data.result) {
        result = res.data.result;
      }
    });
  if (result) return result;
};
