import * as React from 'react';

import { Cards, Results, RoomInfo, } from '../components';

class Estimate extends React.Component<any, any> {

  public render() {

    const {
      roomData,
    } = this.props;

    return (
      <React.Fragment>
        <RoomInfo {...this.props} />
        <Cards {...this.props} />
        <Results roomData={roomData} />
      </React.Fragment>
    )
  }
}

export default Estimate;