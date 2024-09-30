import axios from "axios";

const baseUrl = axios.create({
  baseURL: "https://blogsapp.runasp.net/api",
});

export default baseUrl;
