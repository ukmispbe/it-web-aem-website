import React from 'react';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';

const SubFacetTags = props => {
    const facets = props.facets ? props.facets : {};
    const mapping = props.subFacetMap.filter((item) => facets[item.facetName]).map((item) => ({
                        name: item.facetName,
                        category: item.facetValue,
                        translation: item.facetTranslation,
                        facets: facets[item.facetName],
                    }));

    const tags = props.selectedFacets && Object.keys(props.selectedFacets).length !== 0
        ? Object.keys(props.selectedFacets).map((facet, index) => {
            const facetGroupSelectedValues = props.selectedFacets[facet];
            const category = [];
            facetGroupSelectedValues.forEach((item, index) => {
                mapping.forEach((subFacet) => {
                    subFacet.name === facet &&
                    category.push(
                        <a
                            key={`facetTag-${index}`}
                            href="javascript:void(0);"
                            onClick={() =>
                                props.removeTag({
                                    categoryId: subFacet.name,
                                    facet: item,
                                })
                            }
                        >
                            <ReactSVG src={props.text.closeIcon} />
                            <span>
                                {subFacet.translation}: {item}
                            </span>
                        </a>
                    );
                })
            });

            return category;
        })
        : null;


    return <>
            {props.selectedFacets && tags}
        </>;
};

const ContentTypeTag = props => {
    const showTags = Object.entries(props.selected).length !== 0 ? true : false;

    if (!showTags) return <></>;

    return <a href="javascript:void(0);"
            onClick={props.onRemove}
            data-locator="content-type-tag-hide">
            <ReactSVG src={props.text.closeIcon} />
            <span>{`${props.text['resultType']}: ${props.selected.facetTranslation}`}</span>
        </a>;
}

const ClearAllTag = props => {
    return <a href="javascript:void(0);"
            className="cmp-search-filters__tags__clear"
            data-locator="link-search-filters-tag-clear"
            aria-label={props.text.clearAllFilters}
            onClick={props.onRemove}>
            <ReactSVG src={props.text.closeIcon} />
            <span>{props.text.clearAllFilters}</span>
        </a>;
}

const KeywordTag = props => {
    return <a href="javascript:void(0);"
            aria-label={`${props.text.keyWordLabel}: ${props.keyword}`}
            onClick={props.onRemove}>
            <ReactSVG src={props.text.closeIcon} />
            <span>{`${props.text.keyWordLabel}: ${props.keyword}`}</span>
        </a>;
}

SubFacetTags.propTypes = {
    subFacetMap: PropTypes.array.isRequired,
    defaultFacet: PropTypes.string.isRequired,
    removeTag: PropTypes.func.isRequired,
    selectedFacets: PropTypes.object.isRequired,
    text: PropTypes.object.isRequired,
}

SubFacetTags.defaultProps = {
    subFacetMap: [],
    defaultFacet: '',
    removeTag: () => {},
    selectedFacets: {},
    text: {},
}

ContentTypeTag.proptTypes = {
    categoryKey: PropTypes.string,
    selected: PropTypes.object.isRequired,
    text: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired
}

ContentTypeTag.defaultProps = {
    categoryKey: '',
    selected: {},
    text: {},
    onRemove: () => {}
}

ClearAllTag.proptTypes = {
    text: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired
}

ClearAllTag.defaultProps = {
    text: {},
    onRemove: () => {}
}

KeywordTag.propTypes = {
    keyword: PropTypes.string,
    text: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired
}

KeywordTag.defaultProps = {
    keyword: '',
    text: {},
    onRemove: () => {}
};

export { SubFacetTags, ContentTypeTag, ClearAllTag, KeywordTag }