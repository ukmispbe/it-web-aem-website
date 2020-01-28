import React from 'react';
import Title from "../typography/title";
import LinkTile from '../link-tile';
import Ecommerce from "../scripts/ecommerce";

const Tile = ({tile}) => {
    if (tile.requiresEcommerce === "true" && Ecommerce.isDisabledState()) {
        return <></>;
    }

    return  <LinkTile {...tile} />
}

const MyAccount = ({ title, body, tiles }) => {
    return (
        <div className="cmp-my-account-wrapper">
            <Title text={title} />

            <div className="cmp-my-account__body">
                {body}
            </div>

            <div className="cmp-my-account__tiles">
                <div className="tile">
                    {tiles.map((tile, key) => <Tile tile={tile} key={key} />)}
                </div>
            </div>
        </div>
    )
};

export default MyAccount;
