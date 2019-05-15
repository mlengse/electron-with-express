import React, { useState, useEffect, useCallback } from "react";
//import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Theme } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Paper from "@material-ui/core/Paper";

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

  const onMenuButtonClicked = useCallback(() => {
    if (props.socket) {
      console.log("sending a button-click message");
      props.socket.emit("button-click");

      props.socket.on("ping", (data: any) => {
        console.log(data);
      });
    }
  }, [props.socket]);

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
