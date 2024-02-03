import { FC, useEffect, useRef } from 'react';
import { IChatMessage } from '../../models/ChatMessage';

type ChatProp = {
  messgaes: IChatMessage[];
  closeConnection: () => void;
};
export const ChatHistory: FC<ChatProp> = ({ messgaes, closeConnection }) => {
  const messageRef = useRef<HTMLDivElement | undefined>();
  useEffect(() => {
    if (messageRef && messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  }, [messgaes]);
  return (
    <>
      <button
        style={{ width: 'fit-content', marginBottom: '1rem' }}
        className="btn btn-danger"
        onClick={() => closeConnection()}
      >
        Leave Room
      </button>
      <div
        ref={messageRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          height: '90%',
          paddingBottom: '1rem',
          overflowY: 'auto',
        }}
        className="hide-scroll-bar"
      >
        {messgaes.map((message, index) => (
          <div key={index} className="card px-2 pb-2 w-25">
            <p style={{ fontWeight: 'bolder' }} className="p-0 m-0">
              {message.user}
            </p>
            <p className="p-0 m-0">{message.message}</p>
          </div>
        ))}
      </div>
    </>
  );
};
