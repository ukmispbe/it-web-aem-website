import React, { useEffect, useState } from 'react';
import Title from "../typography/title";
import LinkTile from '../link-tile';
import loginStatus from "../scripts/loginStatus";
import { notLoggedInRedirect } from '../utils/redirectFunctions';
import Spinner from "../utils/spinner";
import { isCartHidden } from '../utils/eCommerceFunctions';
import { isEprocurementUserRole } from '../utils/userFunctions';

const Tile = ({ tile }) => {
    if ((tile.requiresEcommerce === "true" && isCartHidden()) || (tile.isHiddenForEprocUser === "true" && isEprocurementUserRole())) {
        return <></>;
    }

    return <LinkTile {...tile} datalocator="my-account" />
}

const MyAccount = ({ title, body, tiles }) => {

    const [displayTile, setDisplayTile] = useState(false);
    const [isInEditMode, setIsInEditMode] = useState(document.getElementById("header").hasAttribute("data-is-edit-mode"));

    useEffect(() => {
        if (!loginStatus.state()) {
            if (!isInEditMode) {
                notLoggedInRedirect();
                return null;
            }
        }
        setDisplayTile(true);
    }, []);

    if (isInEditMode || displayTile) {
        return (
            <div className="cmp-my-account-wrapper">
                <Title text={title} />

                <div className="cmp-my-account__body">
                    {body}
                </div>

                <div className="cmp-my-account__tiles">
                    <div className="tile" data-locator="my-account-tiles">
                        {tiles.map((tile, key) => <Tile tile={tile} key={key} />)}
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (<Spinner loading={!displayTile} />);
    }
};

export default MyAccount;
