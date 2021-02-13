import axios from "axios";

export const HTTP = axios.create({
  baseURL: "/api",
  timeout: 1000 * 60,
  headers: {
    "X-Auth-Token": "27ac0e149ca24facad9cc2d91c09eb8e",
    "content-type": "application/json",
  },
});
