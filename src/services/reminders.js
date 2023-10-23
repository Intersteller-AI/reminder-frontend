import axios from "axios";
import { HOST } from "../server";

export const createNewTask = async ({ taskData }) => {
  try {
    const { data } = await axios.post(`${HOST}/api/reminders/`, taskData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const updateTask = async ({ taskData }) => {
  try {
    const { data } = await axios.put(
      `${HOST}/api/reminders/`,
      { ...taskData },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
