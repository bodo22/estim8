import * as React from 'react';

import {
  Button,
  Grid,
} from '@material-ui/core';
import { createStyles, withStyles, } from '@material-ui/core/styles';

const styles = () => createStyles({
  gridWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    maxWidth: 504,
  },
  btnReset: {
    alignItems: 'center',
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'center',
    width: '100%',
  },
  '@media (max-width: 600px)': {
    gridWrapper: {
      maxWidth: '100vw',
    },
  },
});

class Cards extends React.Component<any, any> {

  public render() {

    const {
      classes: cls,
      resetEstimates,
    } = this.props;

    return (
      <Grid container={true} className={cls.gridWrapper} spacing={16}>
        {[0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, '☕', '❓'].map(num => {
          return (
            <Grid item={true} key={num}>
              <Button variant="fab" color="primary" onClick={this.submitNumber(num)}>
                {num}
              </Button>
            </Grid>
          );
        })
        }
        <Grid item={true} key="reset" className={cls.btnReset}>
          <Button variant="contained" color="primary" onClick={resetEstimates}>
            Reset
          </Button>
        </Grid>
      </Grid>
    );
  }

  private submitNumber(num: number | string) {
    return () => this.props.submitNumber(num);
  }
}

export default withStyles(styles)(Cards);
