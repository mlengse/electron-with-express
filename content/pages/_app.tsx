import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/styles";
//import { createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
//import red from "@material-ui/core/colors/red";
import * as io from "socket.io-client";
import theme from "../src/theme";

export type AppState = {
  socket?: SocketIOClient.Socket | null;
};

class MyApp extends App {
  state = {
    socket: null
  };

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode!.removeChild(jssStyles);
    }

    const socket = io(`http://localhost:${process.env.SOCKETIO_PORT || 3001}`);

    socket.emit("foobar");

    this.setState({
      socket
    });
  }

  componentWillUnmount() {
    if (this.state.socket) {
      this.state.socket!.close();
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>My page</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} socket={this.state.socket} />
        </ThemeProvider>
      </Container>
    );
  }
}

export default MyApp;
