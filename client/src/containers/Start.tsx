import * as React from 'react';

import {
  CircularProgress,
  Modal,
} from '@material-ui/core';

import { StartInput, } from '../components';

import RootContext, { IRootContext, } from '../context';

const Start = () => {
  return (
    <RootContext.Consumer>
      {({ room, socketConnected, }: IRootContext) => (
        <Modal open={!socketConnected || !room} >
          {!socketConnected ?
            <CircularProgress />
            :
            <StartInput />
          }
        </Modal>
      )}
    </RootContext.Consumer>
  );
}

export default Start;
