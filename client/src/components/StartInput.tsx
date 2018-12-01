import * as React from 'react';

import {
  Button,
  Paper,
  TextField,
} from '@material-ui/core';
import { createStyles, withStyles, } from '@material-ui/core/styles';

import RootContext from '../context';

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
          {...this.getTextFieldProps('room')}
        />
        <TextField
          {...this.getTextFieldProps('name')}
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

  private getTextFieldProps(fieldName: string): object {
    return {
      variant: 'outlined',
      placeholder: fieldName,
      autoFocus: fieldName === 'room',
      margin: 'normal',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => this.updateInputState(fieldName, event),
      onKeyPress: (ev: React.KeyboardEvent) => {
        if (ev.key === 'Enter') {
          ev.preventDefault();
          this.handleSubmit();
        }
      },
    };
  }

  private handleSubmit = () => {
    const { room, name, } = this.state;
    if (room && name) {
      this.context.socket.joinRoom(room, name);
    }
  }

  private updateInputState = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [key]: event.target.value,
    });
  }
}

StartInput.contextType = RootContext;

export default withStyles(styles)(StartInput);
