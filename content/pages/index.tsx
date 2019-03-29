import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import io from "socket.io-client";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
    paddingTop: theme.spacing(20)
  },
  title: {
    fontSize: 34
  }
}));

type IndexProps = {
  foo: string;
  socket: io.socket;
};

function Index(props: IndexProps) {
  const classes = useStyles({});
  const [open, setState] = useState(false);

  useEffect(() => {
    if (props.socket) {
      props.socket.emit("foobar");
    }
  }, [props.socket]);

  const handleClose = () => {
    setState(false);
  };
  const handleClick = () => {
    if (props.socket) {
      props.socket.emit("button-click");
    }

    setState(true);
  };

  return (
    <div className={classes.root}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Hello, World!</DialogTitle>
        <DialogContent>
          <DialogContentText>This is a Material-UI Dialog</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Typography className={classes.title}>Material-UI</Typography>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Click Me
      </Button>
    </div>
  );
}

export default Index;
