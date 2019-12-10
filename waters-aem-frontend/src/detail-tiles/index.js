import React from 'react';
import ReactSVG from 'react-svg';

import useProfile from './hooks/useProfile';
import Tile from './views/tile';

const DetailTiles = ({
    name,
    type,
    title,
    fetchEndPoint,
    canCreate,
    addTitle,
    formMessage,
    form,
    icons
}) => {
    const { tiles } = useProfile(fetchEndPoint, type);

    const renderTiles = () => tiles.map((tile, key) => (
        <Tile {...tile}
            key={name+key}
            formMessage={formMessage}
            form={form}
            icon={icons.edit}
        />
    ));

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