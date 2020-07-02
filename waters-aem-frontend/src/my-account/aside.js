import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Title from "../typography/title";
import Ecommerce from "../scripts/ecommerce";
import Breadcrumb from "./components/breadcrumb";
import { setClickAnalytics } from "../analytics";
import loginStatus from "../scripts/loginStatus";
import { notLoggedInRedirect } from '../utils/redirectFunctions';
import Spinner from "../utils/spinner";

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
        <div className="cmp-my-account__aside-wrapper">
            <Title text={getTitle(props.tiles, props.location.pathname)} />
            <div className="cmp-my-account__aside-links">
                {props.tiles.map(tile => <Tile key={tile.title} tile={tile} pathname={props.location.pathname} />)}
            </div>
            <div className="cmp-my-account__aside-content">
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

    if (tile.requiresEcommerce === "true" && Ecommerce.isDisabledState()) {
        return <></>;
    }

    return (
        <div className="tile">
            <div className="tile__title">{tile.title}</div>
            <div className="tile__links">
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

const getTitle = (tiles, pathname) => {
    const tile = tiles.filter(filterValue => filterValue.links.find(link => linkIsActive(pathname, link.url)));
    const links = tile.length !== 0 ? tile[0].links : [];
    const link = links.find(link => linkIsActive(pathname, link.url));
    return link ? link.text : "";
}

const linkIsActive = (pathname, url) => pathname.substring(1, pathname.length) === url.substring(1, url.length);

const ActiveLink = ({text}) => <span className="link--active">{text}</span>;

const HyperLink = ({link}) => link.url.startsWith("#") ?
                <Link to={`/${link.url.substring(1, link.url.length)}`} onClick={()=>setClickAnalytics("Side Navigation", link.linkName ? link.linkName : link.text, link.url)}>{link.text}</Link> :
                <a href={link.url}  onClick={()=>setClickAnalytics("Side Navigation", link.linkName ? link.linkName : link.text, link.url)}>{link.text}</a>

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
