import {
  UPDATE_DATA,
  USER_DATA,
  UPDATE_DRAG_DATA,
  ADD_DATA,
} from "./../../DummyData/constants";
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
    case UPDATE_DRAG_DATA: {
      var stateTem = state;
      state.map((data, index) => {
        if (
          data.day == action.payload[1].day &&
          data.time == action.payload[1].time &&
          data.month == action.payload[1].month &&
          data.year == action.payload[1].year
        ) {
          stateTem[index] = {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            day: action.payload[0].day,
            month: action.payload[0].month,
            year: action.payload[0].year,
            time: action.payload[0].time,
          };
        }
      });
      return [...stateTem];
    }
    case ADD_DATA: {
      // console.log("Adding data", action.payload[0]);

      // var stateTem = state;
      // // state.map((data, index) => {
      // //   if (
      // //     data.day == action.payload[1].day &&
      // //     data.time == action.payload[1].time &&
      // //     data.month == action.payload[1].month &&
      // //     data.year == action.payload[1].year
      // //   ) {
      // //     stateTem[index] = {
      // //       id: data.id,
      // //       firstName: data.firstName,
      // //       lastName: data.lastName,
      // //       day: action.payload[0].day,
      // //       month: action.payload[0].month,
      // //       year: action.payload[0].year,
      // //       time: action.payload[0].time,
      // //     };
      // //   }
      // // });
      return [...state, action.payload[0]];
    }
    default:
      return state;
  }
};

export default userReducer;
