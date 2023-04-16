import React from 'react';
import './App.css';

import { SocketContext, socket } from './context/socket';

function App() {
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
                </header>
            </div>
        </SocketContext.Provider>
    );
}

export default App;
