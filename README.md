# electron-with-next-and-express

This is an Electron starter project that serves it's content from Next.js with a custom Express server. In addition to that a Socket.IO server is set up to allow
for communication between the front end and backend.

This rewrite is being tracked in issue #21

Project Layout

- content : This is the Next.js application
- electron : Contains the bootstrap code to get Electron up and running

This project is a conglomeration of other example projects:

- https://github.com/mui-org/material-ui/tree/next/examples/nextjs-next-with-typescript
- https://github.com/zeit/next.js/tree/canary/examples/custom-server-typescript
- https://github.com/zeit/next.js/tree/canary/examples/custom-server-express
- https://github.com/zeit/next.js/tree/canary/examples/with-socket.io

## Status

This is still very much a work in progress and is extremely brittle.

## Author(s)

Frank Hale &lt;frankhale@gmail.com&gt;
29 March 2019

## License

MIT - see [LICENSE](LICENSE)
