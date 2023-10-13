import axios from "axios";

const instance = axios.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 1000,
  headers: { "Cache-Control": "no-cache", "Content-Type": "application/json" },
});

export default instance;