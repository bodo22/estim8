import * as React from 'react';

import {
  Paper,
  Typography,
} from '@material-ui/core';
import { createStyles, withStyles, } from '@material-ui/core/styles';

import People from '@material-ui/icons/People';
import Person from '@material-ui/icons/Person';

import RootContext, { IRootContext, } from '../context';

const styles = () => createStyles({
  infoWrapper: {
    alignItems: 'center',
    background: '#fff',
    bottom: 0,
    maxWidth: 500,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    '& > p': {
      padding: 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  infoIcon: {
    marginRight: 8,
  },
});

const RoomInfo = ({ classes: cls }) => {
  return (
    <RootContext.Consumer>
      {({ room, name }: IRootContext) => (
        <Paper className={cls.infoWrapper}>
          <Typography>
            <People className={cls.infoIcon} />
            {room}
          </Typography>
          <Typography>
            <Person className={cls.infoIcon} />
            {name}
          </Typography>

        </Paper>
      )}
    </RootContext.Consumer>
  );
}

export default withStyles(styles)(RoomInfo);
