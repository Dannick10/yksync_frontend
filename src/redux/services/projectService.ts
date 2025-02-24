import { api, requestConfig } from "@/utils/useBaseApi";

const createProject = async (data: project, token: any) => {
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
      api + `project/user/` + _id + "?page=" + page + "&limit=6",
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

const projectEdit = async (project: project, token: any) => {
  const config = requestConfig("PUT",project, token);

  try {
    const res = await fetch(api + "project/update/" + project._id, config)
      .then((res) => res.json())
      .catch((res) => res);

    return res;
    
  } catch (err) {
    console.log(err);
  }
};

const projectDelete = async(_id: project, token: any) => {
  const config = requestConfig("DELETE", null, token)

  try {
    const res = await fetch(api + "project/delete/" + _id, config)
      .then((res) => res.json())
      .catch((res) => res);

    return res;
    
  } catch (err) {
    console.log(err);
  }
}

const projectService = {
  createProject,
  getProject,
  getProject_ID,
  projectEdit,
  projectDelete
};

export default projectService;
