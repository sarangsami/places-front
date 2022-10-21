import axios from "axios";
import { FormData, AuthFormData } from "types";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
const APIs = {
  instance,
  baseUrl: process.env.REACT_APP_BASE_URL,
  getUsers: () => instance.get("/users"),
  register: (data: AuthFormData) => instance.post("/users/register", data),
  login: (data: AuthFormData) =>
    instance.post("/users/login", data).then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    }),
  logOut: () => localStorage.removeItem("user"),
  getUsersPlacesById: (id: string) => instance.get(`/places/user/${id}`),
  getPlaceById: (id: string) => instance.get(`/places/${id}`),
  postNewPlace: (data: FormData) => instance.post(`/places`, data),
  patchSinglePlace: (id: string, data: FormData) =>
    instance.patch(`/places/${id}`, data),
  deletePlaceById: (id: string) => instance.delete(`/places/${id}`),
};
export default APIs;
