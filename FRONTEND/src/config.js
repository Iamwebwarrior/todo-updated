import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://akz-todo-app.herokuapp.com/api/",
});