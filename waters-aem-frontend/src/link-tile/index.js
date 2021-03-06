import React from 'react';
import ReactSVG from 'react-svg';

import { Link } from "./components";
import { elementLocator } from '../utils/eCommerceFunctions';

const LinkTile = ({
    title,
    icon,
    links,
	tilesName,
	datalocator
}) => (
    <div className="cmp-linktile" data-locator={`${elementLocator(tilesName || 'my-account-tile')}-linktile`}>
        <div className="cmp-linktile-column">
            <ReactSVG src={icon} className="cmp-linktile--icon" data-locator={elementLocator(`${title} icon`)} />
        </div>
        <div className="cmp-linktile-column">
            <div className="cmp-linktile--title" data-locator={elementLocator(title)}>{title}</div>
            {links.map((link, key) => (
                <div key={key} className="cmp-linktile--links">
                    {!link.isHidden &&
                        <Link {...link} context={datalocator} />
                    }
                </div>
            ))}
        </div>
    </div>
);


export default LinkTile;
