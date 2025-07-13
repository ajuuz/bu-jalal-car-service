import axios from "axios";

const userInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_USER_BASE_URL || "",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default userInstance;
