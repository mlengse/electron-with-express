const { spawn } = require("child_process");
var kill = require("tree-kill");

const node = spawn("nodemon", [], {
  cwd: `${process.cwd()}\\content`,
  shell: true
  //detached: true
});

setTimeout(() => {
  // process.kill(-node.pid);
  kill(node.pid);
}, 5000);

console.log("Hello, World!");
