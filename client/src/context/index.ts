import { createContext, } from 'react';
import Socket from '../Socket';

export interface IRootContext {
  id: string,
  name: string,
  roomData: object,
  room: string,
  socketConnected: boolean,
  socket: Socket,
}

export default createContext({});