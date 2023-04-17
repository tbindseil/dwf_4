import React, {useState} from 'react';
import './App.css';

import { SocketContext, socket } from './context/socket';

function App() {

    const [broadcastText, setBroadcastText] = useState('message to broadcast');
    const [latestReceivedBroadcast, setLatestReceivedBroadcast] = useState('');

    const broadcastButttonOnClickHandler = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(`broadcasting ${broadcastText}`);
        socket.emit('clientToServer', broadcastText);
    };

    socket.on('serverToClient', (msg: string) => {
        setLatestReceivedBroadcast(msg);
    });

    return (
        <SocketContext.Provider value={socket}>
            <div className="App">
                <header className="App-header">
                    <button
                        onClick={(_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                            console.log('connecting');
                            socket.connect();
                        }}>
                            Click to connect
                    </button>
                    <button
                        onClick={(_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                            console.log('disconnecting');
                            socket.disconnect();
                        }}>
                            Click to disconnect
                    </button>
                    <div>
                        <input
                            name='broadcastInput'
                            value={broadcastText}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setBroadcastText(event.target.value);
                            }}
                            type='text'/>
                        <button
                            onClick={broadcastButttonOnClickHandler}>
                                Click to broadcast
                            </button>
                    </div>
                    <div>
                        <p>
                            {latestReceivedBroadcast}
                        </p>
                    </div>
                </header>
            </div>
        </SocketContext.Provider>
    );
}

export default App;
