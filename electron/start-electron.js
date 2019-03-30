const electron = require("electron"),
  spawn = require("child_process").spawn,
  child = spawn(electron, [`${__dirname}\\..\\`]);
