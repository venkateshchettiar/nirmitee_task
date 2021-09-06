import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import EventNoteIcon from "@material-ui/icons/EventNote";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MessageIcon from "@material-ui/icons/Message";
import AttachMoneyOutlinedIcon from "@material-ui/icons/AttachMoneyOutlined";
import TuneOutlinedIcon from "@material-ui/icons/TuneOutlined";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "10px 0",
  },
}));

const MainListItems = () => {
  const classes = useStyles();

  return (
    <div>
      <ListItem button className={classes.root}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Overview" />
      </ListItem>
      <ListItem
        button
        style={{ backgroundColor: "#64bcec", color: "#fff" }}
        className={classes.root}
      >
        <ListItemIcon>
          <EventNoteIcon />
        </ListItemIcon>
        <ListItemText
          primary="Calender"
          style={{ color: "#fff", fontWeight: "bold" }}
        />
      </ListItem>
      <ListItem button className={classes.root}>
        <ListItemIcon>
          <PermIdentityIcon />
        </ListItemIcon>
        <ListItemText primary="Patient List" />
      </ListItem>
      <ListItem button className={classes.root}>
        <ListItemIcon>
          <MessageIcon />
        </ListItemIcon>
        <ListItemText primary="Messages" />
      </ListItem>
      <ListItem button className={classes.root}>
        <ListItemIcon>
          <AttachMoneyOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Payment information" />
      </ListItem>
      <ListItem button className={classes.root}>
        <ListItemIcon>
          <TuneOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    </div>
  );
};

export default MainListItems;

// const SecondaryListItems = (
//   <div>
//     <ListSubheader inset>Saved reports</ListSubheader>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItem>
//   </div>
// );

// export default SecondaryListItems;
