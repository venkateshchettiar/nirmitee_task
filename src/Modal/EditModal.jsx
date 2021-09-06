import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getUpdateData, updateUser } from "../Redux/Action/userAction";
import { Calendar } from "react-modern-calendar-datepicker";

import "date-fns";
// import Grid from "@material-ui/core/Grid";
// import DateFnsUtils from "@date-io/date-fns";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { userRole } from "./../Redux/Action/userAction";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
  },
}));

const EditModal = (props) => {
  const { data } = props;
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [time, setTime] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setFirstName(data?.firstName);
    setLastName(data?.lastName);
  }, [data]);

  const handleUpdate = (e) => {
    const userData = [
      {
        id: data.id,
        firstName: firstName,
        lastName: lastName,
        day: data.day,
        month: data.month,
        year: data.year,
        time: data.time,
      },
    ];
    dispatch(updateUser(userData));
  };

  // const handleDate = (data) => {
  //   const newDate = data.split("-");
  //   console.log("date", newDate);
  //   setDate(newDate[0]);
  //   setMonth(newDate[1]);
  //   setYear(newDate[2]);
  // };

  // const handleTime = (data) => {
  //   const newTime = data.split(":");
  //   setTime(newTime[0]);
  // };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form>
        <div className="col m-2">
          <div className="row mt-4 mb-5">
            <div className="col">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </div>
            <div className="col">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </div>
            {/* <div className="row mt-4 mb-5">
              <div className="col">
                <TextField
                  id="date"
                  label="Select Date"
                  type="date"
                  defaultValue="2017-05-24"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => handleDate(e.target.value)}
                />
              </div>
              <div className="col">
                <TextField
                  id="time"
                  label="Select Time"
                  type="time"
                  defaultValue="07:30"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => handleTime(e.target.value)}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
              </div>
            </div> */}
          </div>
        </div>
        <Modal.Footer>
          <Button
            onClick={() => {
              handleUpdate();
              props.onHide();
            }}
          >
            Update
          </Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default EditModal;
