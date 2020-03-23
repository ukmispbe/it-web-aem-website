import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import ReactSVG from 'react-svg';
import routes from "../routes";
import ScreenSizes from '../../scripts/screenSizes';

const Breadcrumb = (props) => {

    const breadcrumbList = document.querySelector('.cmp-breadcrumb__list');
    const [isMobile, setIsMobile] = useState(ScreenSizes.isMobile());
    const currentPath = Object.values(routes).filter(route=>route.path===props.path)[0];

    useEffect(() => {
        const breadcrumb = document.querySelector('.cmp-breadcrumb-my-account');
        breadcrumb && breadcrumb.classList.add('show');
        const handleResize = () => setIsMobile(ScreenSizes.isMobile());
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            breadcrumb.classList.remove('show');
        };
    }, []);

    const renderBackToLink = () => {
        const parentRoutePath = currentPath.parentTrail[currentPath.parentTrail.length-1];
        const parentRouteName = Object.values(routes).filter(route=>route.path===parentRoutePath)[0].name;
        const parentConfig = props.config.routes[parentRouteName];

        return (
            <li className="cmp-breadcrumb-back">
                <Link class="cmp-breadcrumb-back__link cmp-button--secondary cmp-button--no-border cmp-button--with-icon"
                        to={parentRoutePath}
                        title={parentConfig.title}>
                    <ReactSVG src={props.config.backIcon}/>
                    <span>{parentConfig.backLinkTitle}</span>
                </Link>
            </li>
        )
    }

    const renderBreadcrumbLink = (linkPath) => {
        const linkRoute = Object.values(routes).filter(route=>route.path===linkPath)[0];
        const linkRouteName = linkRoute.name;
        const linkConfig = props.config.routes[linkRouteName];

        return (
            <li className="cmp-breadcrumb__item" itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
                <Link to={linkRoute.path} className='cmp-breadcrumb__item-link' itemprop="item">
                    <span itemprop="name">{linkConfig.title}</span>
                </Link>
            </li>
        )
    }

    const renderBreadcrumb = () => {
        const parentLinks = currentPath.parentTrail.map(renderBreadcrumbLink);
        return parentLinks;
    }

    return ReactDOM.createPortal(
        isMobile ? renderBackToLink() : renderBreadcrumb(),
        breadcrumbList
    )
}

export default Breadcrumb;