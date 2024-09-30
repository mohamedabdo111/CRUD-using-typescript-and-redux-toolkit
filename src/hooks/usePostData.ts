import baseUrl from "../Api/baseUrl";
import cookieService from "../services/cookieService";

export const usePostData = async (url: string, params: any) => {
  const res = await baseUrl.post(url, params);
  return res;
};
export const usePostDataToke = async (url: string, params: any) => {
  let token = "";
  if (cookieService.get("UserData") !== undefined) {
    token = cookieService.get("UserData").token;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await baseUrl.post(url, params, config);
  return res;
};

export const usePostDataWithImage = async (url: string, params: any) => {
  let token = "";
  if (cookieService.get("UserData") !== undefined) {
    token = cookieService.get("UserData").token;
  }

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await baseUrl.post(url, params, config);
  return res;
};
