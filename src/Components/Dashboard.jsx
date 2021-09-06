import React from "react";
import clsx from "clsx";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MainListItems from "./ListItems";
import EventNoteIcon from "@material-ui/icons/EventNote";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ListItem from "@material-ui/core/ListItem";
import { Calendar } from "react-modern-calendar-datepicker";
import Main from "./Main";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#fafafa",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: "#000",
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    display: "flex",
    flexGrow: 1,
    color: "#000",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  search: {
    position: "relative",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    border: "1px solid #64bcec",
    color: "#64bcec",
    borderRadius: "25px",
    marginRight: "25px",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  add: {
    color: "#64bcec",
    borderRadius: "50%",
    fontSize: "40px",
    marginRight: "25px",
  },
  list: {
    cursor: "pointer",
  },
  listing: {
    display: "flex",
    alignItems: "center",
    marginLeft: "50px",
    fontSize: "15px",
  },
}));
const Dashboard = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [calender, setCalender] = React.useState(false);
  var today = new Date();

  const defaultValue = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  };
  const [selectedDay, setSelectedDay] = React.useState(defaultValue);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            <div className={classes.listing}>
              <EventNoteIcon />
              <h3>Calender</h3>
            </div>

            <div className={classes.listing}>
              <ListItem className={classes.list}>List</ListItem>
              <ListItem className={classes.list}>Monthly</ListItem>
              <ListItem className={classes.list} style={{ color: "#64bcec" }}>
                Weekly
              </ListItem>
            </div>
          </Typography>

          <IconButton color="inherit">
            <Badge color="secondary">
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </Badge>
            <Badge color="secondary">
              <AddCircleIcon className={classes.add} />
            </Badge>
            <Badge color="secondary">
              <NotificationsIcon className={classes.add} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <h1>Calender</h1>
          <IconButton onClick={handleDrawerClose}>
            <MenuOpenIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div
          style={{
            height: 78,
          }}
        >
          <div style={{ position: "relative" }}>
            <div
              style={{
                height: calender ? "auto" : 78,
                overflow: "hidden",
                position: "absolute",
                marginLeft: 600,
              }}
            >
              <div
                style={{
                  display: calender ? "block" : "none",
                  position: "fixed",
                  height: "100vh",
                  width: "100vw",
                  zIndex: 8,
                }}
                onClick={() => {
                  setCalender(!calender);
                }}
              ></div>
              <div
                style={{
                  height: "100%",
                  width: 332,
                  display: !calender ? "block" : "none",
                  position: "absolute",
                  zIndex: 99,
                }}
                onClick={() => {
                  setCalender(!calender);
                }}
              ></div>
              <Calendar
                value={selectedDay}
                onChange={setSelectedDay}
                colorPrimary="#9c88ff" // added this
                calendarClassName="custom-calendar" // and this
                calendarTodayClassName="custom-today-day" // also this
                shouldHighlightWeekends
              />
            </div>
          </div>
        </div>
        <div>
          <Main selectedDay={selectedDay} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
