import axios from "axios";

const adminInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ADMIN_BASE_URL || "",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default adminInstance;
