import { USER_DATA } from "./../../DummyData/constants";

export const userRole = (data) => {
  return {
    type: USER_DATA,
    payload: data,
  };
};
