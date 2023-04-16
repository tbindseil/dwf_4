import express, { Express } from 'express';
import http from 'http';
import {Server, Socket} from 'socket.io';

const app: Express = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;

const broadcastSet = new Set<Socket>();

const io: Server = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on('connection', (socket: Socket) => {
    console.log('user connected');
    broadcastSet.add(socket);
    console.log('Printing sockets in set:');
    broadcastSet.forEach((s: Socket) => console.log(`  socket: ${s.id}`));
    socket.on('disconnect', () => {
        if (!broadcastSet.has(socket)) {
            console.error(`socket disconnecting when not in broadcastSet. Socket: ${socket.id}`);
        }
        broadcastSet.delete(socket);
        console.log('user disconnected');
    });
})

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// ok,
// on connect, add client to broadcast list
// on disconnect, remove client from broadcast list
// on broadcast, send to all clients in broadcast list
// io.on('broadast', ( // ...
