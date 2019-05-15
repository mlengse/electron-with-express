const electron = require("electron"),
  spawn = require("child_process").spawn,
  child = spawn(electron, [`${__dirname}\\..\\`]);

process.on("exit", function() {
  child.kill();
});
