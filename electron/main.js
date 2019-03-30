const electron = require("electron"),
  app = electron.app,
  BrowserWindow = electron.BrowserWindow,
  kill = require("tree-kill"),
  spawn = require("child_process").spawn,
  io = require("socket.io"),
  _ = require("lodash"),
  socketio_port = parseInt(process.env.SOCKETIO_ELECTRON_PORT, 10) || 3002;

let nextServerProcess,
  nextServerLog = [];

function startSocketIOServer() {
  const socketio = io().listen(socketio_port);
  socketio.on("connection", s => {
    console.log("connected to socket.io server in Electron's main process");
  });
}

function startNextServer() {
  // "C:\\Users\\frank\\AppData\\Roaming\\npm\\nodemon.cmd
  // "yarn", ["run", "dev"]
  nextServerProcess = spawn("yarn", ["run", "start"], {
    cwd: `${process.cwd()}\\content`,
    shell: true,
    //env: process.env,
    detached: true,
    windowsHide: true
  });

  function strip(s) {
    // regex from: http://stackoverflow.com/a/29497680/170217
    return s.replace(
      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
      ""
    );
  }

  function redirectOutput(x) {
    let lineBuffer = "";

    x.on("data", function(data) {
      lineBuffer += data.toString();
      let lines = lineBuffer.split("\n");

      _.forEach(lines, l => {
        if (l !== "") {
          nextServerLog.push(strip(l));
        }
      });

      lineBuffer = lines[lines.length - 1];
    });
  }

  redirectOutput(nextServerProcess.stdout);
  redirectOutput(nextServerProcess.stderr);
}

function initializeElectron() {
  let mainWindow;

  function createWindow() {
    mainWindow = new BrowserWindow({
      autoHideMenuBar: true,
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.webContents.openDevTools();
    mainWindow.on("close", () => {
      if (nextServerProcess) {
        kill(nextServerProcess.pid);
      }
    });
    mainWindow.on("closed", () => {
      mainWindow = null;
    });
  }

  app.on("ready", createWindow);
  app.on("browser-window-created", function(e, window) {
    window.setMenu(null);
  });
  app.on("window-all-closed", function() {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
  app.on("activate", function() {
    if (mainWindow === null) {
      createWindow();
    }
  });
}

startNextServer();
startSocketIOServer();
initializeElectron();
