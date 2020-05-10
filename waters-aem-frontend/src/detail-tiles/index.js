import React from 'react';
import ReactSVG from 'react-svg';

import ErrorBoundary from './../search/ErrorBoundary';

import useProfile from './hooks/useProfile';
import Tile from './views/tile';
import { personalSubmit, changePasswordSubmit } from '../forms/services/submit';

const DetailTiles = ({
    name,
    type,
    title,
    userDetailsUrl, 
    soldToDetailsUrl,
    canCreate,
    addTitle,
    addAddressMessage,
    noAddressMessage,
    formMessage,
    form,
    icons,
    submitFn,
    editText
}) => {
    const { tiles, setData } = useProfile(userDetailsUrl, soldToDetailsUrl, type, icons.refresh);

    const swapFirstAndLastNames = () => {
        const indexofFirstName = form.fields.map(e => e.name).indexOf('firstName');
        const indexofLastName = form.fields.map(e => e.name).indexOf('lastName');
        if (indexofFirstName !== -1 && indexofLastName!== -1) {
            const temp = form.fields[indexofFirstName];
            form.fields[indexofFirstName] = form.fields[indexofLastName];
            form.fields[indexofLastName] = temp;
        }
    }

    const renderTiles = () => {
        switch (type) {
            case 'personal':
                submitFn = personalSubmit;
                break;
            case 'password':
                submitFn = changePasswordSubmit;
                break;
            case 'shipping':
                // Assign shipping submit function when done
                break;
            case 'billing':
                // Assign billing submit function when done
                break;
            default:
        }

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
                        editText={editText}
                        canCreate={canCreate}
                    />
                </ErrorBoundary>
            );
        }

        if (!canCreate && !tiles.length) {
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
                        editText={editText}
                        canCreate={canCreate}
                    />
                </ErrorBoundary>
            );
        }

        return tiles.map((tile, key) => {
            const country = tile.defaultValues.localeCountry ? tile.defaultValues.localeCountry.toLowerCase() : '';
            if(tile.name === 'personalDetailsTile' && (country === 'kr' || country === 'jp' || country === 'tw' || country === 'cn')) {
                swapFirstAndLastNames();
            }

            return <ErrorBoundary>
                    <Tile
                        {...tile}
                        key={name + key}
                        formMessage={formMessage}
                        form={form}
                        icon={icons.edit}
                        editText={editText}
                        canCreate={canCreate}
                        setProfileData={setData}
                    />
                </ErrorBoundary>
        });
    };

    return (
        <div className="cmp-detail-tiles" id={name}>
            <div className="cmp-detail-tiles--title">{title}</div>
            <div className="cmp-detail-tiles-list">{renderTiles()}</div>
            {canCreate && !!tiles.length && type !=="personal" && (
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
