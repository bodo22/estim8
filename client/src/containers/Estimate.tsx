import * as React from 'react';

import { Cards, Results, RoomInfo, } from '../components';

const Estimate = () => (
      <React.Fragment>
        <RoomInfo />
        <Cards />
        <Results />
      </React.Fragment>
);

export default Estimate;