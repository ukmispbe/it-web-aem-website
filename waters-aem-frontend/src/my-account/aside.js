import React from "React";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Title from "../typography/title";

const Aside = props => {
    return (
        <div className="cmp-my-account__aside-wrapper">
            <Title text={getTitle(props.tiles, props.location.pathname)} />
            <div className="cmp-my-account__aside-links">
                {props.tiles.map(tile => <Tile key={tile.title} tile={tile} pathname={props.location.pathname} />)}
            </div>
            <div className="cmp-my-account__aside-content">
                {props.children}
            </div>
        </div>
    );
}

const Tile = ({tile, pathname}) => {
    return (
        <div className="tile">
            <div className="tile__title">{tile.title}</div>
            <div className="tile__links">
                {tile.links.map(link => linkIsActive(pathname, link.url) ? <ActiveLink key={link.text} text={link.text} /> : <HyperLink key={link.text} link={link} />)}
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

const HyperLink = ({link}) => link.url.startsWith("#") ? <Link to={`/${link.url.substring(1, link.url.length)}`}>{link.text}</Link> : <a href={link.url}>{link.text}</a>

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