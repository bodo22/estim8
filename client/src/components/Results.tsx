import * as React from 'react';

import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from '@material-ui/core';

import RootContext, { IRootContext, } from '../context';

const Results = () => {
  return (
    <RootContext.Consumer>
      {({ roomData, }: IRootContext) => {
        let resultsInt = 0;
        const resultSum = Object.keys(roomData).reduce((result, key) => {
          const user = roomData[key];
          if (/^-?[0-9]+$/.test(user.currentVote)) {
            result += user.currentVote;
            resultsInt++;
          }
          return result;
        }, 0);
        const averageIntVote = resultsInt ? resultSum / resultsInt : 0;
        return (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell numeric={true}>Estimation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  Object.keys(roomData).map(key => {
                    const { currentVote, name, } = roomData[key];
                    let estimation = currentVote;
                    if (estimation === null || estimation === undefined) {
                      estimation = <CircularProgress size={20}/>
                    }
                    return (
                      <TableRow key={key}>
                        <TableCell>{name}</TableCell>
                        <TableCell numeric={true}>{estimation}</TableCell>
                      </TableRow>
                    );
                  })
                }
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>Result:</TableCell>
                  <TableCell numeric={true}>{averageIntVote}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>
        );
      }
      }
    </RootContext.Consumer>
  );
}

export default Results;
