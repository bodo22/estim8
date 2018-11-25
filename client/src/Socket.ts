import * as actionTypes from './constants.js';

import * as io from 'socket.io-client';

class Socket {

  public socket;

  public init(cb) {
    this.socket = io(`${window.location.hostname}:5000`);
    this.registerCallbacks(cb);
  }

  public joinRoom(room: string, name: string) {
    this.socket.emit(actionTypes.JOIN_ROOM, { room, name });
  }

  public resetEstimates(room: string) {
    this.socket.emit(actionTypes.RESET_ESTIMATES, { room });
  }

  public submitNumber(room: string | null, num: number | string) {
    this.socket.emit(actionTypes.SUBMIT_NUMBER, { room, number: num });
  }

  private registerCallbacks(cb: (actionType: string, data: object) => void) {
    Object.keys(actionTypes).forEach(actionKey => {
      const actionType = actionTypes[actionKey];
      this.socket.on(actionType, data => {
        cb(actionKey, data);
      });
    });
  }
}

export default Socket;
