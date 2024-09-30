import baseUrl from "../Api/baseUrl";

export const useGetData = async (url: string, params?: any) => {
  const res = baseUrl.get(url, params);

  return res;
};
