import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "https://tripplanner-server-tclz.onrender.com/api",
  withCredentials: true,
});