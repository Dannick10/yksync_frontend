import { api, requestConfig } from "@/utils/useBaseApi";

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

const getProject = async (token: any, page: any, _id: any) => {
  const config = requestConfig("GET", null, token);
  console.log(_id);
  try {
    const res = await fetch(
      api + `project/user/` + _id + "?page=" + page,
      config
    )
      .then((res) => res.json())
      .catch((res) => res);
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const getProject_ID = async (_id: string, token: any) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "project/" + _id, config)
      .then((res) => res.json())
      .catch((res) => res);

    return res;
  } catch (err) {
    console.log(err);
  }
};

const projectEdit = async (project: any, token: any) => {
  const config = requestConfig("PUT",project, token);
  console.log(project)
  try {
    const res = await fetch(api + "project/update/" + project._id, config)
      .then((res) => res.json())
      .catch((res) => res);

    return res;
    
  } catch (err) {
    console.log(err);
  }
};

const projectService = {
  createProject,
  getProject,
  getProject_ID,
  projectEdit
};

export default projectService;
