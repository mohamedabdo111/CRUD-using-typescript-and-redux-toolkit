import baseUrl from "../Api/baseUrl";
import cookieService from "../services/cookieService";

export const uesDeleteData = async (url: string) => {
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

  const res = await baseUrl.delete(url, config);

  return res;
};
