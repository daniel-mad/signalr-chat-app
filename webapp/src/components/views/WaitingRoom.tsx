import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import { IChatUser } from '../../models/ChatUser';

type WaitingRoomProp = {
  joinRoom: (chatUser: IChatUser) => void;
};
export const WaitingRoom: FC<WaitingRoomProp> = ({ joinRoom }) => {
  const [form, setForm] = useState({
    user: '',
    room: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    joinRoom(form);
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          width: '400px',
          height: '450px',
          padding: '8px',
          borderRadius: '3px',
        }}
      >
        <form className="container" onSubmit={handleSubmit}>
          <h3 className="text-white text-center">Chat App</h3>
          <div className="form-group mt-5">
            <input
              type="text"
              name="user"
              className="form-control"
              placeholder="User"
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-2">
            <input
              type="text"
              name="room"
              className="form-control"
              placeholder="Room"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success w-100 mt-5"
            disabled={!form.user || !form.room}
          >
            Join
          </button>
        </form>
      </div>
    </div>
  );
};
