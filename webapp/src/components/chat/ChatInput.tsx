import { FC, SyntheticEvent, useState } from 'react';

type ChatInput = {
  sendMessage: (message: string) => Promise<void>;
};

export const ChatInput: FC<ChatInput> = ({ sendMessage }) => {
  const [value, setValue] = useState<string>('');
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    sendMessage(value);
    setValue('');
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', width: '100%', gap: '10px' }}
    >
      <div className="form-group" style={{ width: '80%' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Send Message"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary mb-2"
        style={{ width: '150px' }}
      >
        Send
      </button>
    </form>
  );
};
