import { api, requestConfig } from "@/utils/useBaseApi";

const profile = async (token: string | null) => {
  const config = await requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "user", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const userService = { profile,  };

export default userService;
