import { promises } from "dns";

export const api: string = process.env.NEXT_PUBLIC_API || 'http://localhost:8081/api/';


export const requestConfig = (method: string, data: Promise<any>, token = null) => {
  let config: any;

  if (method === "DELETE" || data === null) {
    config = {
      method,
      headers: {},
    };
  } else {
    config = {
        method, 
        body: JSON.stringify(data),
        headers:{
            "content-Type": "application/json"
        }
    }
  }

  if(token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config;
};