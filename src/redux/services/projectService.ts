import { api, requestConfig } from "@/utils/useBaseApi";
import { request } from "http";

const createProject = async (data: any, token: any) => {
  const config = requestConfig("POST", data, token);

  try {
    const res = await fetch(api + "project/create", config)
      .then((res) => res.json())
      .catch((res) => res);

    return res;
  } catch (err) {
    console.log(err);
  }
};

const getProject = async(token: any) => {
    const config = requestConfig("GET", null, token)

    try {
        const res = await fetch(api + "project" , config)
        .then((res) => res.json())
        .catch((res) => res)

        return res
    } catch(err) {
        console.log(err)
    }
}

const getProject_ID = async(_id: string, token: any) => {

  const config = requestConfig("GET",null, token)

  try { 

    const res = await fetch(api + "project/" + _id, config )
    .then((res) => res.json())
    .catch((res) => res)

    return res

  } catch (err) {
    console.log(err)
  }
}

const projectService = {
    createProject,
    getProject,
    getProject_ID
}

export default projectService
