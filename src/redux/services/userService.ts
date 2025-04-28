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

const editProfile = async(token: string | null,body: any) => {
  const config = await requestConfig("PUT", body, token);

  try {
    const res = await fetch(api + "user/update", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
}

const userService = { profile, editProfile };

export default userService;
