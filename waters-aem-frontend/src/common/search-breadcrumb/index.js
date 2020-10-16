import React, { useEffect, useState } from 'react';
import ReactSVG from 'react-svg';
import ReactDOM from 'react-dom';
import ScreenSizes from '../../scripts/screenSizes'
import { getNamedHeaderLink } from '../../utils/redirectFunctions';
import EllipsisText from "react-ellipsis-text";

const SearchBreadcrumb = (props) => {

    const breadcrumbList = document.querySelector('.cmp-breadcrumb__list');
    const [isMobile, setIsMobile] = useState(ScreenSizes.isMobile());

    useEffect(() => {
        // const breadcrumb = document.querySelector('.cmp-breadcrumb-my-account');
        // breadcrumb && breadcrumb.classList.add('show');

        const handleResize = () => setIsMobile(ScreenSizes.isMobile());
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            //breadcrumb.classList.remove('show');
        };
    }, []);

    const renderBackToLink = (linkInfo => {
        return (
            <li className="cmp-breadcrumb-back">
                <a className="cmp-breadcrumb-back__link cmp-button--secondary cmp-button--no-border cmp-button--with-icon"
                        href={linkInfo.path}
                        title={linkInfo.title}>
                    <ReactSVG src={props.text.previousIcon}/>
                    <span>{linkInfo.title}</span>
                </a>
            </li>
        )
    });

    const renderBreadcrumbLink = (linkInfo => {
        return (
            <li className="cmp-breadcrumb__item" itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
                <a href={linkInfo.path} className='cmp-breadcrumb__item-link'>
                    <span itemprop="name"><EllipsisText text={linkInfo.title} length={"20"} /></span>
                </a>
            </li>
        )
    });

    const renderBreadcrumb = (links) => {
        const parentLinks = links.map(link => renderBreadcrumbLink(link));
        return parentLinks;
    }

    const buildQueryString = (baseUrl, options) => {
        let queryString = baseUrl + "?";
        if (options.keywordParam && options.keywordParam !== "*:*") {
            queryString += `keyword=${options.keywordParam}&`
        }
        if (options.categoryParam) {
            queryString += `category=${options.categoryParam}&`
        }
        if (options.contentTypeParam) {
            queryString += `content_type=${options.contentTypeParam}&`
        }
        if (queryString.indexOf("&") !== -1) {
            queryString = queryString.substr(0, queryString.length -1);
        }
        return queryString;
    }

    const createLinkData = () => {
        let links = []; 
        const homeURL = getNamedHeaderLink("data-homepage-url");
        const baseSearchUrl = getNamedHeaderLink("data-search-path");
        let correctKeyword = props.searchParams.keyword;
        if (props.searchParams.spell_suggestion) {
            correctKeyword = props.searchParams.spell_suggestion;
        }

        const homeLink = {"title": props.text.homeLinkText, "path": homeURL} ;
        links.push(homeLink);

        const searchLink = {"title": props.text.searchLinkText, "path": baseSearchUrl} ;
        links.push(searchLink);

        if (correctKeyword && correctKeyword !== "*:*" ) {
            const urlOptions = {
                keywordParam : props.searchParams.keyword, 
                categoryParam: "", 
                contentTypeParam: ""
            }
            const queryString = buildQueryString(baseSearchUrl, urlOptions);
            const queryLink = {"title": correctKeyword, "path": queryString} ;
            links.push(queryLink);
        }

        if (props.searchParams.category) {
            const urlOptions = {
                keywordParam : correctKeyword, 
                categoryParam: props.searchParams.category, 
                contentTypeParam: ""
            }
            const queryString = buildQueryString(baseSearchUrl, urlOptions);
            const categoryLink = {"title": props.searchParams.category, "path": queryString} ;
            links.push(categoryLink);
        }
        
        if (props.searchParams.contentTypeSelected.facetTranslation) {
            const urlOptions = {
                keywordParam : correctKeyword, 
                categoryParam: props.searchParams.category, 
                contentTypeParam: props.searchParams.content_type
            }
            const queryString = buildQueryString(baseSearchUrl, urlOptions);
            const categoryLink = {"title": props.searchParams.contentTypeSelected.facetTranslation, "path": queryString} ;
            links.push(categoryLink);
        }
        return links;
    }

    const linkData = createLinkData();

    // return ReactDOM.createPortal(
    //     isMobile ? renderBackToLink(linkData) : renderBreadcrumb(linkData),
    //     breadcrumbList
    // )
    // return (
    //     <ol class="cmp-breadcrumb__list" itemscope="" itemtype="http://schema.org/BreadcrumbList">
    //         {isMobile ? renderBackToLink(linkData) : renderBreadcrumb(linkData)}
    //     </ol>         
    // ) 
    return (
        <ol class="cmp-breadcrumb__list" itemscope="" itemtype="http://schema.org/BreadcrumbList">
            {renderBreadcrumb(linkData)}
        </ol>         
    )
}

export default SearchBreadcrumb;