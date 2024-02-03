import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IChatUser } from './models/ChatUser';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { WaitingRoom } from './components/views/WaitingRoom';
import { useState } from 'react';
import { IChatMessage } from './models/ChatMessage';
import { ChatWindow } from './components/views/ChatWindow';

function App() {
  const [connection, setConnection] = useState<HubConnection>();
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const joinRoom = async (chatUser: IChatUser) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl('https://localhost:5001/chat')
        .configureLogging(LogLevel.Information)
        .build();

      connection.on('ReceiveMessage', (user, message) => {
        setMessages(prev => [...prev, { user, message }]);
      });
      connection.on('ReceiveUsers', users => {
        console.log(users);
        setUsers(users);
      });
      connection.onclose(() => {
        setConnection(undefined);
        setMessages([]);
        setUsers([]);
      });
      await connection.start();
      await connection.invoke('JoinRoom', chatUser);
      setConnection(connection);
    } catch (error) {
      console.log('error', error);
    }
  };

  const sendMessage = async (message: string) => {
    try {
      await connection?.invoke('SendMessage', message);
    } catch (error) {
      console.log('error', error);
    }
  };

  const closeConnnection = async () => {
    try {
      await connection?.stop();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="app-root">
      {connection ? (
        <ChatWindow
          messgaes={messages}
          sendMessage={sendMessage}
          closeConnection={closeConnnection}
          users={users}
        />
      ) : (
        <WaitingRoom joinRoom={joinRoom} />
      )}
    </div>
  );
}

export default App;
