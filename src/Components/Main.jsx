import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { useDispatch, useSelector } from "react-redux";
// import { userRole } from "./../Redux/Action/userAction";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "20px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "115px",
  },
}));

const listData = (users, data, index, classes, time) => {
  var temCard = (
    <Grid item xs={2} key={index}>
      <Paper className={classes.paper}></Paper>
    </Grid>
  );
  users.map((user, i) => {
    if (
      user.day == data.day + index &&
      user.time == time &&
      user.month == data.month &&
      user.year == data.year
    ) {
      temCard = (
        <Grid item xs={2} key={i}>
          <Paper className={classes.paper}>{user.name}</Paper>
        </Grid>
      );
    }
  });
  return temCard;
};

const Main = (props) => {
  const { selectedDay } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userData);

  const days = new Array(5).fill(1);
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
  return (
    <div className={classes.root}>
      <Grid container spacing={1} direction="column">
        <Grid item container spacing={1}>
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <AccessTimeIcon />
            </Paper>
          </Grid>
          {weekDays.map((data, i) => {
            return (
              <Grid item xs={2} key={i}>
                <Paper className={classes.paper}>{`${selectedDay.day + i} ${
                  months[selectedDay.month - 1]
                } ${selectedDay.year}`}</Paper>
              </Grid>
            );
          })}
        </Grid>
        {timing.map((time, index) => {
          return (
            <Grid item container spacing={1} key={index}>
              <Grid item xs={2}>
                <Paper className={classes.paper}>{`${9 + index}-${
                  10 + index
                }`}</Paper>
              </Grid>
              {weekDays.map((data, i) => {
                return listData(users, selectedDay, i, classes, 9 + index);
              })}
              {/* {users.map((user, i) => {
                console.log(user.day);
                if (user.day == selectedDay.day + index) {
                  return (
                    <Grid item xs={2}>
                      <Paper className={classes.paper}>{user.name}</Paper>
                    </Grid>
                  );
                }
              })} */}
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Main;
