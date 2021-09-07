import {
  ADD_DATA,
  DELETE_DATA,
  UPDATE_DATA,
  UPDATE_DRAG_DATA,
  USER_DATA,
} from "./../../DummyData/constants";
import { appointments } from "../../DummyData/resources";

export const userRole = (data) => {
  return {
    type: USER_DATA,
    payload: data,
  };
};

export const updateUser = (data) => {
  return {
    type: UPDATE_DATA,
    payload: data,
  };
};

export const updateDrag = (data) => {
  return {
    type: UPDATE_DRAG_DATA,
    payload: data,
  };
};
export const addData = (data) => {
  return {
    type: ADD_DATA,
    payload: data,
  };
};
export const deleteData = (data) => {
  return {
    type: DELETE_DATA,
    payload: data,
  };
};
