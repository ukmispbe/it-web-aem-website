import React from 'react';
import ReactSVG from 'react-svg';

import Tile from './views/tile';

const DetailTiles = ({
    name,
    title,
    tiles,
    canCreate,
    addTitle,
    icons
}) => {
    const renderTiles = () => {
        return tiles.map((tile, key) => (<Tile {...tile} key={key} icon={icons.edit}/>));
    };

    return (
        <div className="cmp-detail-tiles" id={name}>
            <div className="cmp-detail-tiles--title">{title}</div>
            <div className="cmp-detail-tiles-list">
                {renderTiles()}
            </div>
            {canCreate &&
            <div className="cmp-detail-tiles--add"><ReactSVG src={icons.add} /> {addTitle}</div>}
        </div>
    );
};

export default DetailTiles;