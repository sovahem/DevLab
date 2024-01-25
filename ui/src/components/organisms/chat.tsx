'use client';
import { socket } from '@/lib/socket-client';
import { FC, useEffect, useState } from 'react';

type ChatProps = {
    roomID: string;
};

type UsersJoinedType = {
    socketID: string;
};
const Chat: FC<ChatProps> = ({ roomID }) => {
    const [usersJoined, setUsersJoined] = useState<UsersJoinedType[]>([]);

    useEffect(() => {
        socket.emit('room:join', roomID);
        socket.on('room:user:joined', ({ socketsID }) => {
            setUsersJoined(socketsID || []);
        });
        return () => {
            socket.off('room:user:joined');
        };
    }, []);

    return (
        <div>
            <ul>
                {usersJoined.map((userJoin) => (
                    <li key={userJoin.socketID}>{userJoin.socketID}</li>
                ))}
            </ul>
        </div>
    );
};

export default Chat;
