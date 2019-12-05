import React from 'react';
import ReactSVG from 'react-svg';

const Tile = ({
    name,
    columns,
    notification,
    form,
    icon
}) => {
    const renderColumns = () => {
        return (
            columns.map(({title, text}, key) => {
                return (
                    <div className="cmp-detail-tiles-list--tile-column" key={key}>
                        {title && <div className="cmp-detail-tiles-list--tile-column--title">{title}</div>}
                        {text && text.map((row, idx) => (
                            <div className="cmp-detail-tiles-list--tile-column--text" key={idx}>{row}</div>
                        ))}
                    </div>
                );
            })
        );
    };

    return (
        <div className="cmp-detail-tiles-list--tile" id={name}>
            <div className="cmp-detail-tiles-list--tile-edit">
                <ReactSVG src={icon}/> Edit
            </div>
            {renderColumns()}
        </div>
    );
};

export default Tile;