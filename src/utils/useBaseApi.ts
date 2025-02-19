import { promises } from "dns";

export const api: string = process.env.NEXT_PUBLIC_API || 'http://localhost:8081/api/';


export const requestConfig = (method: string, data: any = null, token = null) => {
  let config: any = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data && method !== "GET") {
    config.body = JSON.stringify(data);
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};
