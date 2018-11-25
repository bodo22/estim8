import * as React from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { createStyles, withStyles, } from '@material-ui/core/styles';

const styles = () => createStyles({
  paper: {
    maxWidth: 500,
    margin: '0 auto',
  },
});

class Results extends React.Component<any, any> {

  public render() {

    const {
      classes: cls,
      roomData,
    } = this.props;

    let resultsInt = 0;
    const resultSum = Object.keys(roomData).reduce((result, key) => {
      const user = roomData[key];
      if (this.isInt(user.currentVote)) {
        result += user.currentVote;
        resultsInt++;
      }
      return result;
    }, 0);
    const averageIntVote = resultsInt ? resultSum / resultsInt : 0;

    return (
      <Paper className={cls.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Estimation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              Object.keys(roomData).map(key => {
                const user = roomData[key];
                return (
                  <TableRow key={key}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.currentVote}</TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Result:</TableCell>
              <TableCell>{averageIntVote}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );
  }

  private isInt(value) {
    const er = /^-?[0-9]+$/;
    return er.test(value);
  }
}

export default withStyles(styles)(Results);
