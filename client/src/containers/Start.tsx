import * as React from 'react';

import {
  CircularProgress,
  Modal,
} from '@material-ui/core';

import { StartInput, } from '../components';

class Start extends React.Component<any, any> {

  public render() {

    const {
      room,
      socketConnected,
      joinRoom,
    } = this.props;

    return (
      <Modal
        open={!socketConnected || !room}
      >
        {!socketConnected ?
          <CircularProgress />
          :
          <StartInput joinRoom={joinRoom} />
        }
      </Modal>
    );
  }
}

export default Start;
