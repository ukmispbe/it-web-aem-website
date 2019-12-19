import React from 'react';
import ReactSVG from 'react-svg';

import ErrorBoundary from './../search/ErrorBoundary';

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
    icons,
    submitFn
}) => {
    const { tiles } = useProfile(fetchEndPoint, type, icons.refresh);

    const renderTiles = () => {
        form.submitFn = submitFn || function() {};

        if (!tiles.length) {
            return (
                <ErrorBoundary>
                    <Tile
                        name={'emptyAddressTile'}
                        columns={[
                            {
                                title: noAddressMessage,
                                addTitle: addTitle,
                                addIcon: icons.add
                            }
                        ]}
                        formMessage={formMessage}
                        form={form}
                        icon={icons.edit}
                        isNoAddress={true}
                    />
                </ErrorBoundary>
            );
        }

        return tiles.map((tile, key) => (
            <ErrorBoundary>
                <Tile
                    {...tile}
                    key={name + key}
                    formMessage={formMessage}
                    form={form}
                    icon={icons.edit}
                />
            </ErrorBoundary>
        ));
    };

    return (
        <div className="cmp-detail-tiles" id={name}>
            <div className="cmp-detail-tiles--title">{title}</div>
            <div className="cmp-detail-tiles-list">{renderTiles()}</div>
            {canCreate && !!tiles.length && (
                <div className="cmp-detail-tiles--add">
                    <ReactSVG
                        src={icons.add}
                        className="cmp-detail-tiles--add-icon"
                    />
                    <div className="cmp-detail-tiles--add-title">
                        {addTitle}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailTiles;
