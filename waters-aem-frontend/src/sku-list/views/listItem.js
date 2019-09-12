import React from 'react';
import ReactSVG from 'react-svg';
import Stock from '../../sku-details/views/stock';
import Price from '../../sku-details/views/price';
import SkuService from '../../sku-details/services';
import AddToCart from '../../sku-details/views/addToCart';
import { Modal } from '../../modal/index';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShown: false,
            modalConfig: this.props.skuConfig.modalInfo,
            commerce: this.props.skuConfig.commerceConfig.currentState,
            userCountry: this.props.skuConfig.countryCode,
            availabilityAPI: this.props.skuConfig.availabilityUrl,
            pricingUrl: this.props.skuConfig.pricingUrl,
            addToCartUrl: this.props.skuConfig.addToCartUrl,
            skuAvailability: {},
            modalInfo: {
                ...this.props.skuConfig.modalInfo,
                textHeading: this.props.relatedSku.code,
                text: this.props.relatedSku.title
            },
            errorObj: {}
        };
        this.request = new SkuService(
            this.state.userCountry,
            {
                availability: this.state.availabilityAPI,
                price: this.state.pricingUrl,
            },{
                addToCart: this.props.skuConfig.addToCartUrl,
                getCart: ''
            },
            err => {
                // Add Error Object to State
                this.setState({ errorObj: err });
            }
        );

        this.checkAvailability = this.checkAvailability.bind(this)
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal = () => {
        this.setState({ modalShown: !this.state.modalShown }, () => {
            if (this.state.modalShown) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
        });
    };

    checkAvailability = (skuNumber) => {
        this.request.getAvailability(skuNumber).then(response => {
            this.setState({ skuAvailability: response });
        })
        .catch(err => {
            // Add Error Object to State
            this.setState({ errorObj: err });
        });
    };
            
    renderBuyInfo = () => {
        if (this.props.relatedSku.discontinued) {
            return (
                <div className="cmp-sku-details__buyinfo">
                    <div className="cmp-sku-details__discontinuedinfo">
                        <ReactSVG
                            alt={this.props.skuConfig.skuInfo.discontinuedLabel}
                            src={this.props.skuConfig.skuInfo.discontinuedIcon}
                        />
                        <span className="cmp-sku-details__discontinuedmessage">
                            <span className="cmp-sku-details__discontinuedtitle">{this.props.skuConfig.skuInfo.discontinuedLabel}</span>{this.props.skuConfig.skuInfo.discontinuedMessage}
                            <a href={this.props.relatedSku.replacementSkuPageHref}>{this.props.relatedSku.replacementSku}</a>
                        </span>
                    </div>
                </div>
            );
        } else {
            if (this.state.commerce == 'DISABLED') {
                return ( null);
            } else { 
                return (
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
                                    />
                                </span>
    
                            }
                        </div>
                        {/* //TODO: this will get swapped out for an add-to-cart component that can be shared between sku-list and sku-details */}
                        <div className="cmp-sku-list__buttons">
                            <AddToCart
                                toggleParentModal={this.toggleModal}
                                skuNumber={this.props.relatedSku.code}
                                addToCartLabel={this.props.skuConfig.addToCartLabel}
                                addToCartUrl={this.props.skuConfig.addToCartUrl}
                            ></AddToCart>
                        </div>
                        <Modal
                            toggleModal={this.toggleModal}
                            open={this.state.modalShown}
                            theme="callToAction"
                            config={this.state.modalInfo}
                        />
                    </div>
    
                );
            }
        }
    };



    renderBreadcrumb = () => {
        if (this.props.skuConfig.showBreadcrumbs) {
            return (
                <div className="cmp-search__results-item-breadcrumb skuitem">
                    <div>{this.props.relatedSku.category_facet}</div>
                    <ReactSVG src={this.props.skuConfig.skuInfo.nextIcon} />
                    <div>{this.props.relatedSku.contenttype_facet}</div>
                </div>
            );
        }

        return (<></>);
    };
    
    renderAvailability(productStatus) {
        if( productStatus || this.state.errorObj.ok === false){
            return <Stock
                    skuConfig={this.props.skuConfig.skuInfo}
                    skuNumber={this.props.relatedSku.code}
                    skuAvailability={this.state.skuAvailability}
                    locale={this.props.skuConfig.locale}
                    skuType="details" 
                    errorObj={this.state.errorObj}/>
        }
        return <span className="cmp-sku-list__checkavailability">
                    <div>{this.props.skuConfig.skuInfo.seeAvailabilityLabel}</div>
                    <ReactSVG
                        src={this.props.skuConfig.skuInfo.refreshIcon}
                    />
                </span>

    }

    render() {
        const buyInfo = this.renderBuyInfo();
        const breadcrumbs = this.renderBreadcrumb();
        const isDisabled = this.state.commerce == "DISABLED" ? "disabled" : "";
            
        return (
            <div className={'cmp-sku-list__container ' + isDisabled}>
                <div className="cmp-sku-list__right">
                    <img src={this.props.relatedSku.primaryImageThumbnail} alt={this.props.relatedSku.primaryImageAlt} />
                </div>
                <div className="cmp-sku-details__left">
                    <div className="cmp-sku-list__code">{this.props.relatedSku.code}</div>
                    <a href={this.props.relatedSku.skuPageHref ? this.props.relatedSku.skuPageHref : null}>
                        <div className="cmp-sku-details__title">{this.props.relatedSku.title}</div>
                    </a>

                    {buyInfo}
                    {breadcrumbs}
                    
                </div>
            </div>
        )
    }
}
export default ListItem;