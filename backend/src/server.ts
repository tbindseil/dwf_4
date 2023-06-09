import express, { Express } from 'express';
import http from 'http';
import {Server, Socket} from 'socket.io';

const app: Express = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT || 8080;

const io: Server = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on('connection', (socket: Socket) => {

    console.log('user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('clientToServer', (msg: string) => {
        console.log(`broadcasting ${msg}`);
        socket.broadcast.emit('serverToClient', msg);
    });
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
