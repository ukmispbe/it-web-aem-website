import React from 'react';
import ReactSVG from 'react-svg';

import { Link } from "./components";

const LinkTile = ({
    title,
    icon,
    links
}) => (
    <div className="cmp-linktile">
        <div className="cmp-linktile-column">
            <ReactSVG src={icon} className="cmp-linktile--icon" />
        </div>
        <div className="cmp-linktile-column">
            <div className="cmp-linktile--title">{title}</div>
            {links.map((link, key) => (
                <div key={key} className="cmp-linktile--links">
                    <Link {...link} />
                </div>
            ))}
        </div>
    </div>
);


export default LinkTile;
