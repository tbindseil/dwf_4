import React from 'react';
import { io } from 'socket.io-client';
const ENDPOINT = 'http://127.0.0.1:8080/';

export const socket = io(ENDPOINT, {
    autoConnect: false
});
export const SocketContext = React.createContext(socket);
