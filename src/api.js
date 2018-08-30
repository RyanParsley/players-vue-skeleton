import axios from "axios";
const tokenData = window.localStorage.getItem("token");
export const api = axios.create({
  baseURL: `https://players-api.developer.alchemy.codes/api/`,
  headers: {
    Authorization: "Bearer " + tokenData
  }
});
export default api;
