import React, { useState } from 'react';
import ReactSVG from 'react-svg';

import Form from '../../forms/form';

const Tile = ({
    name,
    columns,
    notification,
    formMessage,
    form,
    icon,
    defaultValues,
    isNoAddress = false,
    editText,
    canCreate = true,
    setProfileData
}) => {
    const [formShown, setFormShown] = useState(false);

    const handleToggle = () => {
        setFormShown(!formShown);
    };

    const renderEdit = () => {
        return (
            <div
                className="cmp-detail-tiles-list--tile-edit"
                onClick={handleToggle}
            >
                <ReactSVG
                    src={icon}
                    className="cmp-detail-tiles-list--tile-edit--icon"
                />
                <div className="cmp-detail-tiles-list--tile-edit--title">
                    {editText}
                </div>
            </div>
        );
    };

    const renderColumns = () => {
        return columns.map(({ title, rows }, key) => {
            return (
                <div
                    className={`cmp-detail-tiles-list--tile-column column-${key}`}
                    key={key}
                >
                    {title && (
                        <div className="cmp-detail-tiles-list--tile-column--title">
                            {title}
                        </div>
                    )}
                    {rows &&
                        rows.map((row, idx) => {
                            return (
                                <div
                                    className={`${row.class} cmp-detail-tiles-list--tile-column--text`}
                                    key={idx}
                                >
                                    {row.text}
                                </div>
                            );
                        })}
                </div>
            );
        });
    };

    const renderNotification = () => {
        return (
            <div className="cmp-detail-tiles-list--tile-notification-wrapper">
                <div className="cmp-detail-tiles-list--tile-notification">
                    <ReactSVG
                        src={notification.icon}
                        className="cmp-detail-tiles-list--tile-notification--icon"
                    />
                    <div className="cmp-detail-tiles-list--tile-notification--title">
                        {notification.title}
                    </div>
                    <div className="cmp-detail-tiles-list--tile-notification--description">
                        {notification.description}
                    </div>
                </div>
            </div>
        );
    };

    const renderTile = () => {
        return (
            <>
                {canCreate && renderEdit()}
                {renderColumns()}
                {notification && renderNotification()}
            </>
        );
    };

    const renderBlank = () => {
        let blank = columns[0];
        return (
            <>
                <div className="cmp-detail-tiles-list--tile-noAddress">
                    <div className="cmp-detail-tiles-list--tile-noAddress--title">
                        {blank.title}
                    </div>
                    {canCreate && (
                        <div className="cmp-detail-tiles--add">
                            <ReactSVG
                                    src={blank.addIcon}
                                    className="cmp-detail-tiles--add-icon"
                                />
                            <div className="cmp-detail-tiles--add-title">
                                {blank.addTitle}
                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    };

    return (
        <>
            <div
                className={
                    'cmp-detail-tiles-list--tile' +
                    (formShown ? ' form-shown' : '') +
                    (isNoAddress ? ' no-address' : '')
                }
                id={name}
            >
                {isNoAddress ? renderBlank() : renderTile()}
            </div>
            {form && (
                <div
                    className={
                        'cmp-detail-tiles-list--form' +
                        (formShown ? '' : ' hidden')
                    }
                >
                    {formMessage && (
                        <div className="cmp-detail-tiles-list--form-message">
                            {formMessage.text}
                            <a href={formMessage.linkURL}>
                                {formMessage.linkText}
                            </a>
                        </div>
                    )}
                    <Form
                        config={form}
                        submitFn={form.submitFn}
                        callback={handleToggle}
                        cancelFn={handleToggle}
                        defaultValues={defaultValues}
                        setProfileData={setProfileData}
                    />
                </div>
            )}
        </>
    );
};

export default Tile;
