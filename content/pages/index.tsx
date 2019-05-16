import React, { useState, /*useEffect,*/ useCallback } from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Theme,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  Paper,
  Icon,
  IconButton,
  Toolbar,
  AppBar
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

// import "@fortawesome/fontawesome-free/css/all.min.css";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1
  },
  card: {
    marginLeft: 10,
    marginTop: 10,
    width: 225
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  helloWorldButton: {
    marginTop: 10,
    marginLeft: 10
  },
  title: {
    fontSize: 14
  },
  message: {
    margin: theme.spacing(3, 2),
    padding: theme.spacing(3, 2)
  }
}));

type DefaultProps = {
  socket: SocketIOClient.Socket;
};

export default function App(props: DefaultProps) {
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const onMenuButtonClicked = useCallback(() => {
    if (props.socket) {
      console.log("sending a button-click message");
      props.socket.emit("button-click");

      props.socket.on("ping", (data: any) => {
        console.log(data);
      });

      toggleDrawer();
    }
  }, [props.socket]);

  const toggleDrawer = useCallback(() => {
    setDrawerOpen(!drawerOpen);
  }, [drawerOpen]);

  // const onClickMeClicked = useCallback(() => {
  //   if (props.socket) {
  //     console.log("sending a foobar message");
  //     props.socket.emit("foobar");
  //   }
  // }, [props.socket]);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={onMenuButtonClicked}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Hello, World!
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button key="Something">
            <ListItemIcon>
              <Icon className="fas fa-list" />
            </ListItemIcon>
            <ListItemText primary="Something" />
          </ListItem>
        </List>
      </Drawer>
      <Paper className={classes.message}>
        <Typography variant="h5" component="h3">
          Welcome!
        </Typography>
        <br />
        <Typography component="p">
          This is an Electron app with Next, Express, Socket.IO and TypeScript
        </Typography>
      </Paper>
    </div>
  );
}
