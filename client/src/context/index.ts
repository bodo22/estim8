import { createContext, } from 'react';
import Socket from '../Socket';

export interface IRootContext {
  name: string,
  roomData: object,
  room: string,
  socketConnected: boolean,
  socket: Socket,
}

export default createContext({});