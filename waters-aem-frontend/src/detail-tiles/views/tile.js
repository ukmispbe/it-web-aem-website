import React, { Suspense, useState } from 'react';
import ReactSVG from 'react-svg';

// import Form from '../../forms/form';
const Form = React.lazy(() => import(/* webpackChunkName: "forms" */'../../forms/form'));

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
                data-locator="detail-tiles-tile-edit"
            >
                <ReactSVG
                    src={icon}
                    className="cmp-detail-tiles-list--tile-edit--icon"
                    data-locator="edit-icon"
                />
                <div className="cmp-detail-tiles-list--tile-edit--title" data-locator="tile-edit-title">
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
                    data-locator={`detail-tile-list-column-${key}`}
                >
                    {title && (
                        <div className="cmp-detail-tiles-list--tile-column--title" data-locator={`detail-tile-list-column-title-${key}`}>
                            {title}
                        </div>
                    )}
                    {rows &&
                        rows.map((row, idx) => {
                            return (
                                <div
                                    className={`${row.class} cmp-detail-tiles-list--tile-column--text`}
                                    key={idx}
                                    data-locator={`detail-tile-list-column-text-${key}-${idx}`}
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
            <div className="cmp-detail-tiles-list--tile-notification-wrapper" data-locator="detail-tiles-list-notification-wrapper">
                <div className="cmp-detail-tiles-list--tile-notification" data-locator="detail-tiles-list-notification">
                    <ReactSVG
                        src={notification.icon}
                        className="cmp-detail-tiles-list--tile-notification--icon"
                        data-locator="tile-notification--icon"
                    />
                    <div className="cmp-detail-tiles-list--tile-notification--title" data-locator="detail-tiles-list-notification--title">
                        {notification.title}
                    </div>
                    <div className="cmp-detail-tiles-list--tile-notification--description" data-locator="detail-tiles-list-notification-description">
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
                <div className="cmp-detail-tiles-list--tile-noAddress" data-locator="tile-no-address">
                    <div className="cmp-detail-tiles-list--tile-noAddress--title" data-locator="no-address-blank-title">
                        {blank.title}
                    </div>
                    {canCreate && (
                        <div className="cmp-detail-tiles--add" data-locator="add-detail-tiles">
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
            {form && formShown && (
                <div className='cmp-detail-tiles-list--form'>
                    {formMessage && (
                        <div className="cmp-detail-tiles-list--form-message" data-locator="form-message">
                            {formMessage.text}
                            <a href={formMessage.linkURL} data-locator="link-text">
                                {formMessage.linkText}
                            </a>
                        </div>
                    )}
                    <Suspense fallback={<div>Loading...</div>}>
                        <Form
                            config={form}
                            submitFn={form.submitFn}
                            callback={handleToggle}
                            cancelFn={handleToggle}
                            defaultValues={defaultValues}
                            setProfileData={setProfileData}
                        />
                    </Suspense>
                </div>
            )}
        </>
    );
};

export default Tile;
