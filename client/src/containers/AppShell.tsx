import * as React from 'react';

import {
  connect,
  JOIN_ROOM,
  SET_ROOM_DATA,
} from '../constants.js';
import Socket from '../Socket';

import { Estimate, Start, } from '.';

class AppShell extends React.Component<any, any> {

  private socket = new Socket();

  constructor(props) {
    super(props);
    this.joinRoom = this.joinRoom.bind(this);
    this.state = {
      name: null,
      roomData: {},
      room: null,
      socketConnected: false,
    }
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
    this.socket.init(this.handleSocketEvents)
  }

  public joinRoom(room: string, name: string) {
    this.socket.joinRoom(room, name);
  }

  public render() {

    const {
      name,
      room,
      socketConnected,
    } = this.state;

    return (
      <React.Fragment>
        <Start
          socketConnected={socketConnected}
          room={room}
          joinRoom={this.joinRoom}
        />
        {room && name &&
          <Estimate
            {...this.state}
            submitNumber={num => this.socket.submitNumber(room, num)}
            resetEstimates={() => this.socket.resetEstimates(room)}
          />
        }
      </React.Fragment>
    );
  }
}

export default AppShell;
