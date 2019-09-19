import React from 'react';
import ReactSVG from 'react-svg';
import Stock from '../../sku-details/views/stock';
import Price from '../../sku-details/views/price';
import SkuService from '../../sku-details/services';
import AddToCart from '../../sku-details/views/addToCart';
import { Modal } from '../../modal/index';
import LoginStatus from '../../scripts/loginStatus';
import SkuMessage from '../../sku-shared/views/SkuMessage'

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShown: false,
            modalConfig: this.props.skuConfig.modalInfo,
            commerce: this.props.skuConfig.commerceConfig.currentState,
            registeredUserSap: this.props.skuConfig.commerceConfig.registeredUserSap,
            userCountry: this.props.skuConfig.countryCode,
            availabilityAPI: this.props.skuConfig.availabilityUrl,
            pricingUrl: this.props.skuConfig.pricingUrl,
            addToCartUrl: this.props.skuConfig.addToCartUrl,
            skuAvailability: {},
            modalInfo: {
                ...this.props.skuConfig.modalInfo,
                textHeading: this.props.relatedSku.code,
                text: this.props.relatedSku.title,
            },
            errorObj: {},
        };
        this.request = new SkuService(
            this.state.userCountry,
            {
                availability: this.state.availabilityAPI,
                price: this.state.pricingUrl,
            },
            {
                addToCart: this.props.skuConfig.addToCartUrl,
                getCart: '',
            },
            err => {
                // Add Error Object to State
                this.setState({ errorObj: err });
            }
        );

        this.checkAvailability = this.checkAvailability.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleErrorModal = (err) => {
        // Add Error Object to State
        this.setState({ errorObj: err });
        this.setState({ modalShown: !this.state.modalShown })
    };
    
    toggleModal = () => {
        this.setState({ modalShown: !this.state.modalShown }, () => {
            if (this.state.modalShown) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
        });
    };

    checkAvailability = skuNumber => {
        this.request
            .getAvailability(skuNumber)
            .then(response => {
                this.setState({ skuAvailability: response });
            })
            .catch(err => {
                // Add Error Object to State
                this.setState({ errorObj: err });
            });
    };

    setStorageProperties = () => {
        if (this.props.fromSearch) {
            const scrolled =
                (window.pageYOffset || window.document.scrollTop) -
                (window.document.clientTop || 0);

            window.sessionStorage.setItem(
                'waters.previousPagePosition',
                scrolled
            );
            window.sessionStorage.setItem(
                'waters.fromSearchURL',
                JSON.stringify(window.location.href)
            );
        }
    };
      
    renderBuyInfoPartial = () => { 
        return (
            <div className="cmp-sku-details__buyinfo">
                <div className="cmp-sku-list__priceinfo">
                    <Price
                        skuConfig={this.props.skuConfig.skuInfo}
                        price={this.props.relatedSku.formattedPrice}
                    />
                </div>
                <div
                    className="cmp-sku-details__availability"
                    onClick={e =>
                        this.checkAvailability(
                            this.props.relatedSku.code
                        )
                    }
                >
                    {this.state.skuAvailability.productStatus && (
                        <Stock
                            skuConfig={this.props.skuConfig.skuInfo}
                            skuNumber={this.props.relatedSku.code}
                            skuAvailability={this.state.skuAvailability}
                            locale={this.props.skuConfig.locale}
                            skuType="details"
                        />
                    )}
                    {!this.state.skuAvailability.productStatus && (
                        <span className="cmp-sku-list__checkavailability">
                            {
                                this.props.skuConfig.skuInfo
                                    .seeAvailabilityLabel
                            }
                            <ReactSVG
                                alt={
                                    this.props.skuConfig.skuInfo
                                        .seeAvailabilityLabel
                                }
                                src={
                                    this.props.skuConfig.skuInfo
                                        .refreshIcon
                                }
                            />
                        </span>
                    )}
                </div>
                <div className="cmp-sku-list__buttons">
                    <AddToCart
                        toggleParentModal={this.toggleModal}
                        skuNumber={this.props.relatedSku.code}
                        addToCartLabel={this.props.skuConfig.addToCartLabel}
                        addToCartUrl={this.props.skuConfig.addToCartUrl}
                        toggleErrorModal={this.toggleErrorModal}
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

    renderBuyInfoCommerceView = () => {  
        if (this.state.commerce == 'DISABLED') {
            return (null);
        } else {
                //FUTURE STATE -- SAP USER THAT'S LOGGED IN WILL BE SHOWN BUY INFO IN PARTIAL ENABLED REGIONS
                // RIGHT NOW this.state.stateregisteredUserSAP is always false, comes from footer
                if ((this.state.commerce == 'PARTIAL_ENABLED' && LoginStatus.state()) && this.state.registeredUserSap ||
                (this.state.commerce != 'PARTIAL_ENABLED' && this.state.commerce != 'DISABLED')
                ) {
                    return (
                        <>
                            {this.renderBuyInfoPartial()}
                        </>
                    );
                } else { 
                    return (null);
                }               
        }
    }

    renderBuyInfo = () => {
        const buyInfoCommerceView = this.renderBuyInfoCommerceView();

        if (this.props.relatedSku.discontinued) {
            let discontinuedMessage = this.props.skuConfig.skuInfo.discontinuedWithReplacementWithCode;
            if(!this.props.relatedSku.replacementSku || !this.props.relatedSku.replacementSkuPageHref){
                discontinuedMessage = this.props.skuConfig.skuInfo.discontinuedNoReplacementCode
            }

            return (
                <SkuMessage 
                    icon={this.props.skuConfig.skuInfo.lowStockIcon}
                    replacementSkuCode={this.props.relatedSku.replacementSku} 
                    message={discontinuedMessage}
                    replacementSkuLink={this.props.relatedSku.replacementSkuPageHref}
                />
            );
        } else {
            return buyInfoCommerceView;
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

        return <></>;
    };

    isDisabled = () => {
        const loggedIn = LoginStatus.state();
        if (this.state.commerce == 'PARTIAL_ENABLED') {
            if (loggedIn && this.state.registeredUserSap) {
                return false;
            } else {
                return true;
            }
        } else if (this.state.commerce == 'DISABLED') {
            return true;
        } else { 
            return false;
        }
    };

    render() {
        const buyInfo = this.renderBuyInfo();
        const breadcrumbs = this.renderBreadcrumb();
        const disabledClass = this.isDisabled() ? 'disabled' : '';

        return (
            <div className={'cmp-sku-list__container ' + disabledClass}>
                <div className="cmp-sku-list__right">
                    {this.props.relatedSku.primaryImageThumbnail && (
                        <img
                            src={this.props.relatedSku.primaryImageThumbnail}
                            alt={this.props.relatedSku.primaryImageAlt}
                        />
                    )}
                </div>
                <div className="cmp-sku-details__left">
                    <div className="cmp-sku-list__code">
                        {this.props.relatedSku.code}
                    </div>
                    <a
                        onClick={() => this.setStorageProperties()}
                        href={
                            this.props.relatedSku.skuPageHref
                                ? this.props.relatedSku.skuPageHref
                                : null
                        }
                    >
                        <div className="cmp-sku-details__title">
                            {this.props.relatedSku.title}
                        </div>
                    </a>

                    {buyInfo}
                    {breadcrumbs}
                </div>
            </div>
        );
    }
}
export default ListItem;
