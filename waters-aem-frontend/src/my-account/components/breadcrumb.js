import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import routes from "../routes";

const Breadcrumb = ({pathname}) => {

    const [activePath, setActivePath] = useState({});
    const breadcrumbList = document.querySelector('.cmp-breadcrumb__list');

    useEffect(() => {
        updateCurrentBreadcrumb();
    }, []);

    useEffect(() => {
        const path = Object.values(routes).filter(route=>route.path===pathname)[0];
        if(path){
            setActivePath(path);
        }
    }, [pathname]);

    const updateCurrentBreadcrumb = () => {
        const activeBreadcrumb = document.querySelector('.cmp-breadcrumb__item.cmp-breadcrumb__item--active');
        if(activeBreadcrumb && activeBreadcrumb.children[0].textContent === 'My Account') {
            activeBreadcrumb.remove();
        }
    }

    const renderLink = (pathname) => {
        const link = Object.values(routes).filter(route=>route.path===pathname)[0];

        return (
            <li className="cmp-breadcrumb__item" itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
                <Link to={link.path} className='cmp-breadcrumb__item-link' itemprop="item">
                    <span itemprop="name">{link.label}</span>
                </Link>
            </li>
        )
    }

    const renderActiveLink = () => {
        return (
            <li className="cmp-breadcrumb__item cmp-breadcrumb__item--active" itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
                <span itemprop="name">{activePath.label}</span>
            </li>
        )
    }

    const renderParentLinks = () => {
        const path = Object.values(routes).filter(route=>route.path===pathname)[0];
        const parentLinks = path.parentTrail.map(renderLink);
        return parentLinks;
    }

    const renderBreadcrumb = () => {
        return (
            <>
                {renderParentLinks()}
                {renderActiveLink()}
            </>
            )
    }

    if(breadcrumbList) {
        return ReactDOM.createPortal(
            renderBreadcrumb(),
            breadcrumbList
        )
    } else {
        return;
    }
}

export default Breadcrumb;