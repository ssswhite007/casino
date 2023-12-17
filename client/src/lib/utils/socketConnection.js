const UI_SOCKET_SERVER = import.meta.env.VITE_UI_SOCKET_SERVER;
import { io, Socket } from 'socket.io-client';
export const socket = io(UI_SOCKET_SERVER);
