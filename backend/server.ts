import express, { Express, Request, Response } from 'express';
import http from 'http';
import socket_factory, {Server, Socket} from 'socket.io';

const app: Express = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;

const io: Server = new socket_factory.Server(server);

app.get('/', (_req: Request, res: Response) => {
  res.sendFile('index.html', { root: '.' });
});

io.on('connection', (socket: Socket) => {
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
