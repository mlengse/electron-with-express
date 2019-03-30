import React, { useState, useEffect, useCallback } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import io from "socket.io-client";

const useStyles = makeStyles(_theme => ({
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
  }
}));

type DefaultProps = {
  socket: io.socket;
};

function About(props: DefaultProps) {
  const classes = useStyles({});

  useEffect(() => {
    if (props.socket) {
      props.socket.emit("foobar");
    }
  }, []);

  const onClickMeClicked = useCallback(() => {
    if (props.socket) {
      props.socket.emit("foobar");
    }
  }, []);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          This is a material-ui card
        </Typography>
        <Typography variant="h5" component="h2">
          Hello, World
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={onClickMeClicked} className={classes.helloWorldButton} size="small">
          Click Me
        </Button>
      </CardActions>
    </Card>
  );
}

function Index(props: DefaultProps) {
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Electron/Next/Express/Socket.IO/TypeScript
          </Typography>
        </Toolbar>
      </AppBar>
      <About {...props} />
    </div>
  );
}

export default Index;
