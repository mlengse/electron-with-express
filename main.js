const electron = require("electron"),
  app = electron.app,
  BrowserWindow = electron.BrowserWindow,
  //_ = require("lodash"),
  kill = require("tree-kill"),
  spawn = require("child_process").spawn;

// This is dumb, have to specify the exact path for the process to
// exit cleanly when Electron exits. If you don't do this the process
// sticks around.
//
//C:\\Users\\frank\\AppData\\Roaming\\npm\\
//
// node .next/server
// "C:\\Users\\frank\\AppData\\Roaming\\npm\\nodemon.cmd
const node = spawn("node", [".next/server"], {
  cwd: `${process.cwd()}\\content`,
  shell: true
  //env: process.env,
  // detached: true,
  // windowsHide: true
});

function setupOutRedirection() {
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
          console.log(strip(l));
        }
      });

      lineBuffer = lines[lines.length - 1];
    });
  }

  redirectOutput(node.stdout);
  redirectOutput(node.stderr);
}

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
    kill(node.pid);
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
