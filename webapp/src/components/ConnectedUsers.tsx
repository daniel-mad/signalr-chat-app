import { FC } from 'react';
type ConnectedUsersProps = {
  users: string[];
};
export const ConnectedUsers: FC<ConnectedUsersProps> = ({ users }) => {
  return (
    <>
      {users && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '20%',
            textAlign: 'center',
            color: '#fff',
            padding: '1rem',
          }}
        >
          Users
          {users.map((user, index) => (
            <div key={index} style={{ padding: '1rem' }}>
              {user}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
