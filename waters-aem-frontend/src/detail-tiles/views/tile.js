import React, { useState } from 'react';
import ReactSVG from 'react-svg';

import Form from '../../forms/form';

const Tile = ({
    name,
    columns,
    notification,
    formMessage,
    form,
    icon
}) => {
    const [formShown, setFormShown] = useState(false);

    const handleToggle = () => setFormShown(!formShown);

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

    const renderNotification = () => {
        return (
            <div className="cmp-detail-tiles-list--tile-notification-wrapper">
                <div className="cmp-detail-tiles-list--tile-notification">
                    <ReactSVG src={notification.icon} className="cmp-detail-tiles-list--tile-notification--icon" />
                    <div className="cmp-detail-tiles-list--tile-notification--title">{notification.title}</div>
                    <div className="cmp-detail-tiles-list--tile-notification--description">{notification.description}</div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className={"cmp-detail-tiles-list--tile" + (formShown ? " form-shown" : "")} id={name}>
                <div className="cmp-detail-tiles-list--tile-edit" onClick={handleToggle}>
                    <ReactSVG src={icon}/> Edit
                </div>

                {renderColumns()}
                {notification && renderNotification()}

            </div>
            {form &&
            <div className={"cmp-detail-tiles-list--form" + (formShown ? "" : " hidden")}>
                {formMessage &&
                <div className="cmp-detail-tiles-list--form-message">
                    {formMessage.text}
                    <a href={formMessage.linkURL} >{formMessage.linkText}</a>
                </div>}
                <Form
                    config={form}
                    submitFn={handleToggle}
                    cancelFn={handleToggle}
                />
            </div>}
        </>
    );
};

export default Tile;