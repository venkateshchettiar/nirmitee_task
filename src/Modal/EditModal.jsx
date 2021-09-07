import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addData, updateUser } from "../Redux/Action/userAction";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import cogoToast from "cogo-toast";
import { deleteData } from "./../Redux/Action/userAction";

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
  const { data, length } = props;
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
    setFirstName("");
    setLastName("");
  };

  const handleDate = (data) => {
    const newDate = data.split("-");
    setYear(newDate[0]);
    setMonth(newDate[1]);
    setDate(newDate[2]);
  };

  const handleTime = (data) => {
    const newTime = data.split(":");
    setTime(newTime[0]);
  };
  const handleAdd = () => {
    if (firstName && lastName && date && month && year && time !== "") {
      const userData = [
        {
          id: length + 1,
          firstName: firstName,
          lastName: lastName,
          day: date,
          month: month,
          year: year,
          time: time,
        },
      ];
      dispatch(addData(userData));
      props.onHide();
      cogoToast.success("Appointment added");
    } else {
      cogoToast.error("please fill the data");
    }
  };

  const handleDelete = () => {
    const userId = data.id;
    dispatch(deleteData(userId));
    cogoToast.success("Appointment deleted");
  };

  var today = new Date();
  var yyyy = today.getFullYear();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  const current = new Date();
  var currTime = current.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  currTime = currTime.split(":");
  var hh = currTime[0];
  var min = currTime[1];

  if (hh < 10) {
    hh = "0" + hh;
  }
  if (min < 10) {
    min = "0" + min;
  }
  const value = yyyy + "-" + mm + "-" + dd;
  const newTime = hh + ":" + min;

  // useEffect(() => {
  //   console.log("1", firstName);
  //   console.log("2", lastName);
  // }, [firstName, lastName]);
  const len = Object.keys(data).length;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form>
        {len !== 0 ? (
          <>
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
              </div>
            </div>
            <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={() => {
                  handleDelete();
                  props.onHide();
                }}
                style={{
                  backgroundColor: "red",
                  outline: "none",
                  border: "none",
                }}
              >
                Delete
              </Button>
              <Button
                onClick={() => {
                  handleUpdate();
                  props.onHide();
                }}
                style={{
                  backgroundColor: "#64bcec",
                  outline: "none",
                  border: "none",
                }}
              >
                Update
              </Button>
              <Button
                onClick={() => {
                  props.onHide();
                  setFirstName("");
                  setLastName("");
                }}
                style={{
                  backgroundColor: "#afafaf",
                  outline: "none",
                  border: "none",
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <>
            <div className="col m-2">
              <div className="row mt-4 mb-5">
                <div className="col">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required
                  />
                </div>
                <div className="col">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required
                  />
                </div>
                <div className="row mt-4 mb-5">
                  <div className="col">
                    <TextField
                      id="date"
                      label="Select Date"
                      type="date"
                      defaultValue={value}
                      // value={value}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => handleDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col">
                    <TextField
                      id="time"
                      label="Select Time"
                      type="time"
                      defaultValue={newTime}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => handleTime(e.target.value)}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <Modal.Footer>
              <Button
                onClick={() => {
                  handleAdd();
                }}
              >
                Add
              </Button>
              <Button
                onClick={() => {
                  props.onHide();
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </form>
    </Modal>
  );
};

export default EditModal;
