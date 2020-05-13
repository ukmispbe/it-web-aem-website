import React from 'react';
import ReactSVG from 'react-svg';
import Stock from '../../sku-details/views/stock';
import Price from '../../sku-details/views/price';
import SkuDetails from '../../scripts/sku-details';

class OrderDetailsListItem extends React.Component {
    constructor(props) {
        super(props);

        //console.log("this.props", this.props);
        this.state = {
            userCountry: this.props.skuConfig.countryCode
        };
    }

    // soldItem.url = searchAPIResults[i].url;
    // soldItem.title = searchAPIResults[i].title;
    // soldItem.description = searchAPIResults[i].description;
    // soldItem.thumbnail = searchAPIResults[i].thumbnail;

    renderBuyInfoPartial = () => {
        return (
            <div className="cmp-sku-details__buyinfo">
                <div className="cmp-sku-list__priceinfo">
                    <div className="cmp-sku__price">{this.props.relatedSku.unitPrice}</div>
                </div>
                <div
                    className="cmp-sku-details__availability"
                >
                    Avail
                </div>
            </div>
        );
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
                    />
                </div>
                <div className="cmp-sku-list__left">
                    <div className="cmp-sku-list__code">
                        {skuConfig.skuInfo.partNumberLabel + " " + relatedSku.materialNumber}
                    </div>
                    {relatedSku.url && (
                        <a href={relatedSku.url}>
                            <div className="cmp-sku-details__title">
                                {relatedSku.title}
                            </div>
                        </a>
                    )}
                    {!relatedSku.url && (
                        <div className="cmp-sku-details__title">
                            {relatedSku.title}
                        </div>
                    )}
                    <div className="cmp-sku-details__buyinfo">
                        <div className="cmp-sku-list__priceinfo">
                            <div className="cmp-sku__price">{relatedSku.unitPrice || "$100"}</div>
                        </div>
                        <div class="cmp-sku-details__quantitytext">{skuConfig.qtyLabel}: {relatedSku.orderedQuantity}</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default OrderDetailsListItem;