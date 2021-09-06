import { UPDATE_DATA, USER_DATA } from "./../../DummyData/constants";
import { appointments } from "../../DummyData/resources";

// const initialData = {
//   users: appointments,
//   loading: true,
//   error: "",
// };

const userReducer = (state = appointments, action) => {
  switch (action.type) {
    case USER_DATA: {
      return {
        ...state,
        loading: false,
        role: action.payload,
      };
    }
    case UPDATE_DATA: {
      var stateTem = state;
      // console.log(action.type);
      // console.log("object: ", action.payload);
      state.map((data, index) => {
        // console.log("Data:, ", data.id);
        if (data.id == action.payload[0].id) {
          stateTem[index] = {
            id: data.id,
            firstName: action.payload[0].firstName,
            lastName: action.payload[0].lastName,
            day: action.payload[0].day,
            month: action.payload[0].month,
            year: action.payload[0].year,
            time: action.payload[0].time,
          };
        }
      });
      return [...stateTem];
      // return {
      //   ...state,
      //   // loading: false,
      //   // role: action.payload,
      // };
    }
    default:
      return state;
  }
};

export default userReducer;
