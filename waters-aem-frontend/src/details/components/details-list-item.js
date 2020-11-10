import React from 'react';
import PropTypes from 'prop-types';

class DetailsListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { relatedSku, skuConfig } = this.props;
        if (!relatedSku.title || relatedSku.title === "") {
            relatedSku.title = relatedSku.materialDecription
        }

        if (!relatedSku.thumbnail || relatedSku.thumbnail === "") {
            relatedSku.thumbnail = skuConfig.skuInfo.noThumbnailImage
        }
        return (
            <div className="cmp-sku-list__container">
                <div className="cmp-sku-list__right">
                    <img
                        src={relatedSku.thumbnail}
                        alt={relatedSku.title}
                        data-locator="product-image"
                    />
                </div>
                <div className="cmp-sku-list__left">
                    <div className="cmp-sku-list__code" data-locator="product-number">
                        {skuConfig.skuInfo.partNumberLabel + " " + relatedSku.materialNumber}
                    </div>
                    {relatedSku.url && (
                        <a href={relatedSku.url}>
                            <div className="cmp-sku-details__title" data-locator="product-title">
                                {relatedSku.title}
                            </div>
                        </a>
                    )}
                    {!relatedSku.url && (
                        <div className="cmp-sku-details__title" data-locator="product-title">
                            {relatedSku.title}
                        </div>
                    )}
                    <div className="cmp-sku-details__buyinfo">
                        <div className="cmp-sku-list__priceinfo">
                            <div className="cmp-sku__price" data-locator="sku-price">{relatedSku.unitPrice}</div>
                        </div>
                        <div class="cmp-sku-details__quantitytext" data-locator="sku-qty">{skuConfig.qtyLabel}: {relatedSku.orderedQuantity}</div>
                    </div>
                </div>
            </div>
        );
    }
}


DetailsListItem.propTypes = {
    key: PropTypes.string.isRequired,
    relatedSku: PropTypes.object.isRequired,
    skuConfig: PropTypes.object.isRequired
};

DetailsListItem.defaultProps = {
    key: 1,
    relatedSku: {},
    skuConfig: {}
};



export default DetailsListItem;