import React from 'react';
import ReactSVG from 'react-svg';
import Stock from '../../sku-details/views/stock';
import Price from '../../sku-details/views/price';
import SkuService from '../../sku-details/services';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userCountry: this.props.skuConfig.countryCode,
            availabilityAPI: this.props.skuConfig.availabilityUrl,
            pricingUrl: this.props.skuConfig.pricingUrl,
            addToCartUrl: this.props.skuConfig.addToCartUrl,
            skuAvailability: {}
        };

        this.request = new SkuService(
            this.state.userCountry,
            {
                availability: this.state.availabilityAPI,
                price: this.state.pricingUrl,
            },
            this.state.addToCartUrl,
            err => console.log(err)
        );

        this.checkAvailability = this.checkAvailability.bind(this)
    }
    checkAvailability = (skuNumber) => {
        this.request.getAvailability(skuNumber).then(response => {
            this.setState({ skuAvailability: response });
        });
    };
    
    render() {
        return ( 
            <div className="cmp-sku-list__container">
                <div className="cmp-sku-list__right">
                    <img src={this.props.relatedSku.primaryImageThumbnail} alt={this.props.relatedSku.primaryImageAlt} />
                </div>
                <div className="cmp-sku-details__left">
                    <div className="cmp-sku-list__code">{this.props.relatedSku.code}</div>
                    <a href={this.props.relatedSku.skuPageHref}>
                        <div className="cmp-sku-details__title">{this.props.relatedSku.title}</div>
                    </a>
                    <div className="cmp-sku-details__buyinfo">
                        <div className="cmp-sku-list__priceinfo">
                            <Price
                                skuConfig={this.props.skuConfig.skuInfo}
                                price={this.props.relatedSku.formattedPrice}
                            />
                        </div>
                        <div className="cmp-sku-details__availability" onClick={(e) => this.checkAvailability(this.props.relatedSku.code)}>
                            {this.state.skuAvailability.productStatus &&
                            
                                <Stock
                                    skuConfig={this.props.skuConfig.skuInfo}
                                    skuNumber={this.props.relatedSku.code}
                                    skuAvailability={this.state.skuAvailability}
                                    locale={this.props.skuConfig.locale}
                                    skuType="details" />
                            }
                            {!this.state.skuAvailability.productStatus &&
                                <span className="cmp-sku-list__checkavailability">{this.props.skuConfig.skuInfo.seeAvailabilityLabel}
                                    <ReactSVG
                                        alt={this.props.skuConfig.skuInfo.seeAvailabilityLabel}
                                        src={this.props.skuConfig.skuInfo.refreshIcon}
                                        className="inline-svg"
                                    />
                                </span>
                                
                            }
                        </div>
                        {/* //TODO: this will get swapped out for an add-to-cart component that can be shared between sku-list and sku-details */}
                        <div className="cmp-sku-list__buttons">
                            <input className="cmp-sku-list__quantity" type="number" placeholder="Qty" max="999" min="0" value=""/>
                            {/* <a className="cmp-button">${'ADD TO CART' @ i18n}</a> */}
                            <a className="cmp-button">Add To Cart</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ListItem;