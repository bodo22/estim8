import * as React from 'react';

import {
  connect,
  JOIN_ROOM,
  SET_ROOM_DATA,
} from '../constants.js';
import RootContext, { IRootContext, } from '../context';
import Socket from '../Socket';

import { Estimate, Start, } from '.';

class AppShell extends React.Component<any, any> {

  public state: IRootContext = {
    name: '',
    roomData: {},
    room: '',
    socketConnected: false,
    socket: new Socket(),
  }

  public handleSocketEvents = (type: string, data: any) => {
    switch (type) {
      case connect:
        this.setState({ socketConnected: true });
        break;
      case JOIN_ROOM:
        this.setState({ room: data.room, name: data.name });
        break;
      case SET_ROOM_DATA:
        this.setState({ roomData: data.data });
        break;
      default:
        console.log('unknown socket event type:', type);
    }
  }

  public componentDidMount() {
    this.state.socket.init(this.handleSocketEvents);
  }

  public render() {
    return (
      <RootContext.Provider value={this.state}>
        <Start />
        {this.state.room && this.state.name && <Estimate />}
      </RootContext.Provider>
    );
  }
}

export default AppShell;
