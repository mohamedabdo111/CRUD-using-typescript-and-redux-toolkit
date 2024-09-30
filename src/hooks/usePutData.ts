import baseUrl from "../Api/baseUrl";
import cookieService from "../services/cookieService";

export const usePutData = async (url: string, params: any) => {
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

  const res = await baseUrl.put(url, params, config);

  return res;
};
export const usePutDatawhitoutimg = async (url: string, params: any) => {
  let token = "";
  if (cookieService.get("UserData") !== undefined) {
    token = cookieService.get("UserData").token;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await baseUrl.put(url, params, config);

  return res;
};
