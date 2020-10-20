import React, { useEffect, useState } from 'react';
import ReactSVG from 'react-svg';
import ScreenSizes from '../../scripts/screenSizes'
import { getNamedHeaderLink } from '../../utils/redirectFunctions';
import EllipsisText from "react-ellipsis-text";

const SearchBreadcrumb = (props) => {
    
    const [isMobile, setIsMobile] = useState(ScreenSizes.isMobile());

    useEffect(() => {
        const breadcrumb = document.querySelector('#searchBreadcrumb');
        isMobile && breadcrumb && breadcrumb.classList.add('fader-fade--right');
        !isMobile && breadcrumb && breadcrumb.classList.remove('fader-fade--right');
    }, [props.searchParams]);

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
    return (
        <nav class="cmp-breadcrumb">
           <ol id="searchBreadcrumb" class="cmp-breadcrumb__list fader-fade" itemscope="" itemtype="http://schema.org/BreadcrumbList">
               <div class="fader-container fader-container--left" style={{width: 0 + "px"}}></div>
                    {renderBreadcrumb(linkData)}
                <div class="fader-container fader-container--right" style={{width: 65 + "px"}}></div>
            </ol>        
        </nav>    
    )
}

export default SearchBreadcrumb;