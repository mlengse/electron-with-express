import * as express from "express";
import * as next from "next";
import * as io from "socket.io";

const webserver_port = parseInt(process.env.PORT, 10) || 3000;
const socketio_port = parseInt(process.env.SOCKETIO_PORT, 10) || 3001;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const socketio = io().listen(socketio_port);

  socketio.on("connection", (s: io.socket) => {
    console.log("socket.io connection established");

    s.on("foobar", () => {
      console.log("recieved a foobar message");
    });

    s.on("button-click", () => {
      console.log("recieved a menu click message");
    });
  });

  server.get("/", (req: express.Request, res: express.Response) => {
    return app.render(req, res, "/", req.query);
  });

  server.get("*", (req: express.Request, res: express.Response) => {
    return handle(req, res);
  });

  server.listen(webserver_port, (err: Error) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${webserver_port}`);
  });
});
