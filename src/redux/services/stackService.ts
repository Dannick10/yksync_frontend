import { api, requestConfig } from "@/utils/useBaseApi";

const getStacks = async (token: any) => {
    const config = requestConfig("GET", null, token);
  
    try {
      const res = await fetch(api + "status/stack", config)
        .then((res) => res.json())
        .catch((res) => res);
  
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  export const stacksService = {
    getStacks
  }