import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import routes from "../routes";

const Breadcrumb = ({pathname}) => {

    useEffect(() => {
        updateCurrentBreadcrumb();
    }, []);

    const updateCurrentBreadcrumb = () => {
        const breadcrumbList = document.querySelector('.cmp-breadcrumb__list');
        const activeBreadcrumb = document.querySelector('.cmp-breadcrumb__item.cmp-breadcrumb__item--active');
        if(activeBreadcrumb && activeBreadcrumb.children[0].textContent === 'My Account') {
            activeBreadcrumb.remove();
        }
    }

    const renderAccountLink = () => {
        return (
            <li className="cmp-breadcrumb__item" itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
                <Link to='/' className='cmp-breadcrumb__item-link' itemprop="item">
                    <span itemprop="name">My Account</span>
                </Link>
                <meta itemprop="position" content="3" />
            </li>
        )
    }

    const renderActiveLink = (path) => {
        return (
            <li className="cmp-breadcrumb__item cmp-breadcrumb__item--active" itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
                <span itemprop="name">{path.label}</span>
                <meta itemprop="position" content="4" />
            </li>
        )
    }

    const renderBreadcrumb = () => {
        const currentPath = Object.values(routes).filter(route=>route.path===pathname);
        console.log(currentPath);
        return (
            <>
                {renderAccountLink()}
                {renderActiveLink(currentPath[0])}
            </>
            )
    }

    return ReactDOM.createPortal(
        renderBreadcrumb(),
        document.querySelector('.cmp-breadcrumb__list')
    )
}

export default Breadcrumb;