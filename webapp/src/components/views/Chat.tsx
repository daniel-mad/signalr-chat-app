import { FC } from 'react';
import { IChatMessage } from '../../models/ChatMessage';
import { ChatHistory } from '../chat/ChatHistory';
import { ChatInput } from '../chat/ChatInput';

type ChatProp = {
  messgaes: IChatMessage[];
  sendMessage: (message: string) => Promise<void>;
  closeConnection: () => void;
};
export const Chat: FC<ChatProp> = ({
  messgaes,
  sendMessage,
  closeConnection,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: '1rem',
        flex: 1,
        borderLeft: '0.7px solid #fff',
      }}
    >
      <ChatHistory messgaes={messgaes} closeConnection={closeConnection} />
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
};
