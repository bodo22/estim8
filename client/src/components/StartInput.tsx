import * as React from 'react';

import {
  Button,
  Paper,
  TextField,
} from '@material-ui/core';
import { createStyles, withStyles, } from '@material-ui/core/styles';


const styles = () => createStyles({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '40px 40px 0',
  },
  btnJoin: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: '40px 0px',
  },
});

class StartInput extends React.Component<any, any> {

  public state = {
    room: null,
    name: null,
  }

  public render() {

    const {
      classes: cls,
    } = this.props;

    return (
      <Paper className={cls.paper}>
        <TextField
          placeholder="Room"
          margin="normal"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.updateInputState('room', event)}
        />
        <TextField
          placeholder="Name"
          margin="normal"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.updateInputState('name', event)}
        />
        <div className={cls.btnJoin}>
          <Button
            onClick={this.handleSubmit}
            variant="contained"
            color="primary"
          >
            Join
        </Button>
        </div>
      </Paper>
    );
  }

  private handleSubmit = () => {
    const { room, name, } = this.state;
    if (room && name) {
      this.props.joinRoom(room, name);
    }
  }

  private updateInputState = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [key]: event.target.value,
    });
  }
}

export default withStyles(styles)(StartInput);
