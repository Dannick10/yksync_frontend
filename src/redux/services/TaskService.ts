import { Task } from "@/@types/taskTypes";
import { api, requestConfig } from "@/utils/useBaseApi";

const createTask = async (data: Task, _id: string, token: any) => {
  const config = requestConfig("POST", data, token);

  try {
    const res = await fetch(api + "task/create/" + _id, config)
      .then((res) => res.json())
      .catch((res) => res);

    return res;
  } catch (err) {
    console.log(err);
  }
};
const updateTask = async (_id: string, status: string, token: any) => {
  const config = requestConfig("PUT", {status: status}, token);
  try {
    const res = await fetch(api + "task/update/" + _id, config)
      .then((res) => res.json())
      .catch((res) => res);

    return res;
  } catch (err) {
    console.log(err);
  }
};

const getTask = async (_id: string, token: any) => {
  const config = requestConfig("GET", null, token);
  try {
    const res = await fetch(api + "task/" + _id, config)
      .then((res) => res.json())
      .catch((res) => res);

    return res;
  } catch (err) {
    console.log(err);
  }
};

const deleteTaks = async (_id: string, token: any) => {
  const config = requestConfig("DELETE", null, token);
  try {
    const res = await fetch(api + "task/delete/" + _id, config)
      .then((res) => res.json())
      .catch((res) => res);

    return res;
  } catch (err) {
    console.log(err);
  }
}

const taskService = {
  createTask,
  updateTask,
  getTask,
  deleteTaks
};

export default taskService;
