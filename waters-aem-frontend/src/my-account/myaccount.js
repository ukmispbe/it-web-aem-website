import React from 'react';

import LinkTile from '../link-tile';

const MyAccount = ({ tiles }) => {
    return (
        <div className="cmp-my-account">
            <div className="cmp-my-account-tiles">
                {tiles.map((tile, key) => (<LinkTile {...tile} key={key} />))}
            </div>
        </div>
    )
};

export default MyAccount;
