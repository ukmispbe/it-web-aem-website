import React from 'react';
import * as rrd from "react-router-dom";

// We need to mock it because it will conflict with the MemoryRouter and the initialEntries will not work
rrd.HashRouter = jest.fn(({children}) => <div>{children}</div>);
module.exports = rrd;