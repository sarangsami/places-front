import axios from "axios";
import { FormData as MyFormData, AuthFormData } from "types";
import { BackendURL } from "./utils";

let APIsURL = BackendURL + "api/";

const instance = axios.create({
  baseURL: APIsURL,
});
const APIs = {
  instance,
  baseUrl: APIsURL,
  getUsers: () => instance.get("/users"),
  register: (data: FormData) => instance.post("/users/register", data),
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
  patchSinglePlace: (id: string, data: MyFormData) =>
    instance.patch(`/places/${id}`, data),
  deletePlaceById: (id: string) => instance.delete(`/places/${id}`),
};
export default APIs;
