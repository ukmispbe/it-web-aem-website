import React, { useContext } from 'react';
import ReactSVG from "react-svg";

import { useFieldApi } from '../../form';

const Icons = ({}) => {
    const { icons, type } = useContext(useFieldApi);

    const getType = (elem) => elem.classList.contains("toggled") ? "text" : type;

    const toggleEye = e => {
        const parent = e.currentTarget.parentNode;
        const onIcon = parent.querySelector(".showHide-icon");
        const offIcon = parent.querySelector(".showHideOff-icon");

        if (onIcon && offIcon) {
            onIcon.classList.toggle("toggled");
            offIcon.classList.toggle("toggled");

            parent.parentNode.querySelector("input").type = getType(offIcon);
        }
    };

    const eyeIcons =
        type === "password" ? (
            <>
                <ReactSVG
                    src={icons.eyeIcon}
                    className="showHide-icon toggled"
                    onMouseDown={toggleEye}
                />
                <ReactSVG
                    src={icons.eyeOffIcon}
                    className="showHideOff-icon"
                    onMouseDown={toggleEye}
                />
            </>
        ) : (
            <></>
        );

    return (
        <div className="cmp-form-field--icons">
            {eyeIcons}
            <ReactSVG src={icons.validIcon} className="valid-icon" />
            <ReactSVG src={icons.invalidIcon} className="invalid-icon" />
        </div>
    );
};

export default Icons;