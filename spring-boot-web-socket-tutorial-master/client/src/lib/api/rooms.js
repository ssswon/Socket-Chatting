import client from './client';

export const getRoomList = () => client.get('/api/rooms');

export const createRoom = ({ name }) => client.post('/api/room', { name });

export const joinRoom = ({ roomId }) => client.get(`/api/room/${roomId}`);
