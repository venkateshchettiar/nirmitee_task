import React, { useEffect } from "react";
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
    margin: "20px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "115px",
  },
  mon: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "55px",
  },
  icon: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "70px",
    height: "auto",
  },
  time: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "70px",
    height: "115px",
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
  // let task = users.filter((user) => {
  //   if (user.name == name) {
  //     user.name = name;
  //   }
  //   return task;
  // });
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
  // (
  //   <Grid
  //     item
  //     xs={2}
  //     key={index}
  //     onDragOver={(e) => {
  //       e.preventDefault();
  //     }}
  // onDrop={(e) => {
  //   onDrop(e, time, data, index, dispatch);
  // }}
  //   >
  //     <Paper className={classes.paper}>
  //       <div style={{ display: "flex", justifyContent: "flex-end" }}>
  //         <EditIcon
  //           onClick={() => {
  //             setModalShow(true);
  //           }}
  //         />
  //         <h1>{index}</h1>
  //       </div>
  //     </Paper>
  //   </Grid>
  // );
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
      <Paper className={classes.paper}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <EditIcon
            onClick={() => {
              handleEdit(userListTemData);
              setId(userListTemData);
              setModalShow(true);
            }}
          />
        </div>
        {temCard
          ? `${userListTemData.firstName} ${userListTemData.lastName}`
          : null}
        <h1>{index}</h1>
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

  useEffect(() => {
    console.log("timing", weekDays);
  }, [weekDays]);

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
      <div>
        <EditModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          data={id}
        />
      </div>
    </div>
  );
};

export default Main;
