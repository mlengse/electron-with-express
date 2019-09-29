import next from "next";
import express from "express";
import io from "socket.io";
import winston from "winston";
const process = require("process");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "socketio-service" },
  transports: [new winston.transports.File({ filename: "socketio.log" })]
});

logger.add(
  new winston.transports.Console({
    format: winston.format.simple()
  })
);

const webserver_port = parseInt(process.env.PORT, 10) || 3000,
  socketio_port = parseInt(process.env.SOCKETIO_PORT, 10) || 3001,
  dev = process.env.NODE_ENV !== "production",
  app = next({ dev }),
  handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const socketio = io.listen(socketio_port);

  socketio.on("connection", (s: SocketIO.Socket) => {
    console.log("socket.io connection established");
    logger.info("socket.io connection established");

    setInterval(() => {
      s.emit("ping", { data: "ping from io server" });
    }, 2000);

    s.on("foobar", () => {
      console.log("received a foobar message...");
      logger.info("received a foobar message...");
    });

    s.on("button-click", () => {
      console.log("received a menu click message...");
      logger.info("received a menu click message...");
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
