import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import EditModal from "./../Modal/EditModal";
import { updateDrag } from "../Redux/Action/userAction";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "0px 100px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "112px",
    backgroundColor: "#F7DC80",
  },
  blanks: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "112px",
    backgroundColor: "#fff",
  },
  mon: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "55px",
    backgroundColor: "#64bcec",
    color: "#fff",
    fontWeight: "bold",
  },
  icon: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "70px",
    height: "auto",
    backgroundColor: "grey",
    color: "#fff",
    fontWeight: "bold",
  },
  time: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "70px",
    height: "112px",
    backgroundColor: "#64bcec",
    color: "#fff",
    fontWeight: "bold",
  },
}));

const handleEdit = (user) => {
  // console.log(user);
};

const onDragStart = (e, user) => {
  e.dataTransfer.setData("day", user.day);
  e.dataTransfer.setData("month", user.month);
  e.dataTransfer.setData("year", user.year);
  e.dataTransfer.setData("time", user.time);
};

const onDrop = (e, time, users, index, dispatch) => {
  let day = e.dataTransfer.getData("day");
  let month = e.dataTransfer.getData("month");
  let year = e.dataTransfer.getData("year");
  let times = e.dataTransfer.getData("time");

  const userData = [
    {
      day: users.day + index,
      month: users.month,
      year: users.year,
      time: time,
    },
    {
      day: day,
      month: month,
      year: year,
      time: times,
    },
  ];
  dispatch(updateDrag(userData));
};

const listData = (
  users,
  data,
  index,
  classes,
  time,
  setModalShow,
  setId,
  dispatch
) => {
  var temCard = false;
  var userListTemData = {};

  users.map((user, i) => {
    if (
      user.day == data.day + index &&
      user.time == time &&
      user.month == data.month &&
      user.year == data.year
    ) {
      temCard = true;
      userListTemData = user;
    }
  });
  return (
    <Grid
      item
      xs={2}
      draggable
      onDragStart={(e) => {
        if (temCard) onDragStart(e, userListTemData);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        onDrop(e, time, data, index, dispatch);
      }}
    >
      <Paper className={temCard ? classes.paper : classes.blanks}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {temCard ? (
            <EditIcon
              onClick={() => {
                setModalShow(true);
                handleEdit(userListTemData);
                setId(userListTemData);
              }}
              style={{ fontSize: "15px", cursor: "pointer" }}
            />
          ) : null}
        </div>
        {temCard ? (
          <>
            <h4>{`${userListTemData.firstName} ${userListTemData.lastName}`}</h4>
            {/* <h6>{`${userListTemData.title}`}</h6> */}
          </>
        ) : (
          <button
            onClick={() => {
              setModalShow(true);
              setId(userListTemData);
            }}
            style={{
              marginTop: "15px",
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              fontSize: "40px",
            }}
          >
            +
          </button>
        )}
      </Paper>
    </Grid>
  );
};

const Main = (props) => {
  const { selectedDay } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userData);
  const [modalShow, setModalShow] = React.useState(false);
  const [id, setId] = React.useState("");

  const timing = new Array(6).fill(1);
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // useEffect(() => {
  //   console.log("timing", weekDays);
  // }, [weekDays]);

  return (
    <div className={classes.root}>
      <Grid container spacing={1} direction="column">
        <Grid item container spacing={1}>
          <Grid item xs={0}>
            <Paper className={classes.icon}>
              <AccessTimeIcon />
            </Paper>
          </Grid>
          {weekDays.map((data, i) => {
            return (
              <Grid item xs={2} key={i}>
                <Paper className={classes.mon}>{`${selectedDay.day + i} ${
                  months[selectedDay.month - 1]
                } ${selectedDay.year}`}</Paper>
              </Grid>
            );
          })}
        </Grid>
        {timing.map((time, index) => {
          return (
            <Grid item container spacing={1} key={index}>
              <Grid item xs={0}>
                <Paper className={classes.time}>{`${9 + index}-${
                  10 + index
                }`}</Paper>
              </Grid>
              {weekDays.map((data, i) => {
                return listData(
                  users,
                  selectedDay,
                  i,
                  classes,
                  9 + index,
                  setModalShow,
                  setId,
                  dispatch
                );
              })}
            </Grid>
          );
        })}
      </Grid>
      <div>
        <EditModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          data={id}
          length={users.length}
        />
      </div>
    </div>
  );
};

export default Main;
