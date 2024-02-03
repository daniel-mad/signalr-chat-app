import { FC } from 'react';
import { IChatMessage } from '../../models/ChatMessage';
import { Chat } from './Chat';
import { ConnectedUsers } from '../ConnectedUsers';
type ChatWindowProp = {
  messgaes: IChatMessage[];
  sendMessage: (message: string) => Promise<void>;
  closeConnection: () => void;
  users: string[];
};
export const ChatWindow: FC<ChatWindowProp> = ({
  messgaes,
  sendMessage,
  closeConnection,
  users,
}) => {
  return (
    <div style={{ display: 'flex' }}>
      <ConnectedUsers users={users} />
      <Chat
        messgaes={messgaes}
        sendMessage={sendMessage}
        closeConnection={closeConnection}
      />
    </div>
  );
};
