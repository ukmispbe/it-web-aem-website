import React from 'react';
import ReactSVG from 'react-svg';

import ErrorBoundary from './../search/ErrorBoundary';

import useProfile from './hooks/useProfile';
import Tile from './views/tile';
import { personalSubmit, changePasswordSubmit } from '../forms/services/submit';
import { isEprocurementUserRole } from '../utils/userFunctions';

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
    editText,
    profileData,
    profileTiles,
    data
}) => {


    let tiles = [];
    let setData;

    if (!data)
    {
        const profileReturnData = useProfile(userDetailsUrl, soldToDetailsUrl, type, icons.refresh);
        tiles = profileReturnData.tiles;
        setData = profileReturnData.setData;
    } else {
        tiles = profileTiles;
        setData = profileData;
    }

    const swapFirstAndLastNames = () => {
        const indexofFirstName = form.fields.map(e => e.name).indexOf('firstName');
        const indexofLastName = form.fields.map(e => e.name).indexOf('lastName');
        if (indexofFirstName !== -1 && indexofLastName!== -1) {
            const temp = form.fields[indexofFirstName];
            form.fields[indexofFirstName] = form.fields[indexofLastName];
            form.fields[indexofLastName] = temp;
        }
    }

    const processFormData = () => {
        form.fields = form.fields.map((field) => {
            // Check if disableForEprocUser flag is true and userRole is eproc
            if (field.disableForEprocUser && isEprocurementUserRole()) {
                field.disabled = true;
            }
            delete field.disableForEprocUser;
            return field;
        });
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
           if(tile.name === 'personalDetailsTile'){
            const mailingAddress = tile.defaultValues.userAddress && tile.defaultValues.userAddress.filter(address => address.addressType === 'mailingAddress');
            const userCountry = mailingAddress.length ? mailingAddress[0].countryCode.toLowerCase() : '';
            if(userCountry === 'kr' || userCountry === 'jp' || userCountry === 'tw' || userCountry === 'cn') {
                swapFirstAndLastNames();
            }
            processFormData();
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
        <div className="cmp-detail-tiles" id={name} data-locator="detail-tiles">
            <div className="cmp-detail-tiles--title" data-locator="detail-tiles-title">{title}</div>
            <div className="cmp-detail-tiles-list" data-locator="details-tiles-list">{renderTiles()}</div>
            {canCreate && !!tiles.length && type !=="personal" && (
                <div className="cmp-detail-tiles--add" data-locator="details-tile-add">
                    <ReactSVG
                        src={icons.add}
                        className="cmp-detail-tiles--add-icon"
                        data-locator="details-tile-add-icon"
                    />
                    <div className="cmp-detail-tiles--add-title" data-locator="detail-tiles-add-title">
                        {addTitle}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailTiles;
