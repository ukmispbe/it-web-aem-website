import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Title from "../typography/title";
import Breadcrumb from "./components/breadcrumb";
import { setClickAnalytics } from "../analytics";
import loginStatus from "../scripts/loginStatus";
import { notLoggedInRedirect } from '../utils/redirectFunctions';
import Spinner from "../utils/spinner";
import { isCommerceHidden, elementLocator } from '../utils/eCommerceFunctions';
import { isEprocurementUserRole, getShipOrBillChangeFlag, isSoftwareManager } from '../utils/userFunctions';
import ScreenSizes from '../scripts/screenSizes';

import ReactSVG from 'react-svg';

const Aside = props => {

    const [displayTile, setDisplayTile] = useState(false);
    const [isInEditMode, setIsInEditMode] = useState(document.getElementById("header").hasAttribute("data-is-edit-mode"));

    const breadcrumbList = document.querySelector('.cmp-breadcrumb__list');

    useEffect(() => {
        if (!loginStatus.state()) {
            if (!isInEditMode) {
                notLoggedInRedirect();
                return null;
            }
        }
        setDisplayTile(true);
    }, []);

    if (isInEditMode || displayTile) {
    return (
        <div className="cmp-my-account__aside-wrapper" data-locator="my-account-wrapper">
            <Title text={getTitle(props.tiles, props.location.pathname)} />
            <div className="cmp-my-account__aside-links" data-locator="my-account-links">
                {props.tiles.map(tile => 
                    <Tile 
                        key={tile.title} 
                        tile={tile} 
                        requiresEcommerce={tile.requiresEcommerce} 
                        isHiddenForEprocUser={tile.isHiddenForEprocUser} 
                        pathname={props.location.pathname}
                    />)}
            </div>
            <div className="cmp-my-account__aside-content" data-locator="my-account-aside-content">
                {props.tiles[0].notification && (props.location.pathname === "/profile") && !!getShipOrBillChangeFlag() && renderNotification(props.tiles[0].notification)}
                {props.children}
            </div>
            {breadcrumbList && (<Breadcrumb path={props.location.pathname} config={props.breadcrumbs} />)}
        </div>
    );
        }
    else {
        return (<Spinner loading={!displayTile} />);
    }
}

const Tile = ({tile, pathname}) => {

    if ((tile.requiresEcommerce === "true" && isCommerceHidden()) || (tile.isHiddenForEprocUser === "true" && isEprocurementUserRole())) {
        return <></>;
    }
    if (tile.requiresSoftwareManager && tile.requiresSoftwareManager === "true" && (isSoftwareManager() === 0 || ScreenSizes.isTabletAndUnder())) {
        return <></>;
    }
    return (
        <div className="tile" data-locator="my-account-tile">
            <div className="tile__title" data-locator="my-account-title-tile">{tile.title}</div>
            <div className="tile__links" data-locator="my-account-tile-links">
                {tile.links.map(link => {
                        if( !link.isHidden ) {
                            if(linkIsActive(pathname, link.url)) {
                                    return <ActiveLink key={link.text} text={link.text} />
                            } else {
                                return <HyperLink key={link.text} link={link} linkName={link.linkName} />
                            }
                        }
                    }
                )}
            </div>
        </div>
    );
}

const renderNotification = (notification) => {
    return (
        <div className="cmp-detail-tiles-list--tile-notification-wrapper" data-locator="detail-tiles-list-notification-wrapper">
            <div className="cmp-detail-tiles-list--tile-notification" data-locator="detail-tiles-list-notification">
                <ReactSVG
                    src={notification.icon}
                    className="cmp-detail-tiles-list--tile-notification--icon"
                    data-locator="tile-notification--icon"
                />
                <div className="cmp-detail-tiles-list--tile-notification--description" data-locator="detail-tiles-list-notification--title">
                    <span className="cmp-detail-tiles-list--tile-notification--title">{notification.title}</span>
                    {notification.description}
                </div>
            </div>
        </div>
    );
};
const getTitle = (tiles, pathname) => {
    const tile = tiles.filter(filterValue => filterValue.links.find(link => linkIsActive(pathname, link.url)));
    const links = tile.length !== 0 ? tile[0].links : [];
    const link = links.find(link => linkIsActive(pathname, link.url));
    return link ? link.text : "";
}

const linkIsActive = (pathname, url) => pathname.substring(1, pathname.length) === url.substring(1, url.length);

const ActiveLink = ({text}) => <span className="link--active" data-locator={elementLocator(text)}>{text}</span>;

const HyperLink = ({link}) => link.url.startsWith("#") ?
                <Link to={`/${link.url.substring(1, link.url.length)}`} onClick={()=>setClickAnalytics("Side Navigation", link.linkName ? link.linkName : link.text, link.url)} data-locator={elementLocator(link.text)}>{link.text}</Link> :
                <a href={link.url} target={link.target ? link.target : undefined} onClick={()=>setClickAnalytics("Side Navigation", link.linkName ? link.linkName : link.text, link.url)} data-locator={elementLocator(link.text)}>{link.text}</a>


Aside.propTypes = {
    tiles: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        links: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
            url: PropTypes.string
        }))
    }))
}

Aside.defaultProps = {
    tiles: []
}

export default withRouter(Aside);

