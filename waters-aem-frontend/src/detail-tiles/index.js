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
    noAddressMessage,
    formMessage,
    form,
    icons
}) => {
    const { tiles } = useProfile(fetchEndPoint, type);

    const renderTiles = () => {
        if (!tiles.length) {
            return (<>
                <Tile
                    name={"emptyAddressTile"}
                    columns={[
                        {
                            "title": noAddressMessage,
                            "addTitle": addTitle,
                            "addIcon": icons.add
                        }
                    ]}
                    formMessage={formMessage}
                    form={form}
                    icon={icons.edit}
                    isNoAddress={true}
                />
            </>);
        }

        return tiles.map((tile, key) => (
            <Tile {...tile}
                key={name+key}
                formMessage={formMessage}
                form={form}
                icon={icons.edit}
            />
        ));
    };

    return (
        <div className="cmp-detail-tiles" id={name}>
            <div className="cmp-detail-tiles--title">{title}</div>
            <div className="cmp-detail-tiles-list">
                {renderTiles()}
            </div>
            {canCreate && !!tiles.length &&
            <div className="cmp-detail-tiles--add"><ReactSVG src={icons.add} /> {addTitle}</div>}
        </div>
    );
};

export default DetailTiles;