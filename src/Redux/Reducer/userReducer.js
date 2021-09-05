import { USER_DATA } from "./../../DummyData/constants";
import { appointments } from "../../DummyData/resources";

const userReducer = (state = appointments, action) => {
  switch (action.type) {
    case USER_DATA: {
      return {
        ...state,
        loading: false,
        role: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
