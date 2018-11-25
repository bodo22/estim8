import * as React from 'react';

import {
  Paper,
  Typography,
} from '@material-ui/core';
import { createStyles, withStyles, } from '@material-ui/core/styles';

const styles = () => createStyles({
  infoWrapper: {
    alignItems: 'center',
    background: '#fff',
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    '& > p': {
      padding: '16px 0',
    },
  },
});

class RoomInfo extends React.Component<any, any> {

  public render() {

    const {
      classes: cls,
      room,
      name,
    } = this.props;

    return (
      <Paper className={cls.infoWrapper}>
        <Typography>
          Room: {room}
        </Typography>
        <Typography>
          Name: {name}
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles)(RoomInfo);
