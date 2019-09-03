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
            userCountry: this.props.skuConfig.countryCode,
            availabilityAPI: this.props.skuConfig.availabilityUrl,
            pricingUrl: this.props.skuConfig.pricingUrl,
            addToCartUrl: this.props.skuConfig.addToCartUrl,
            skuAvailability: {},
            modalInfo: {
                ...this.props.skuConfig.modalInfo, 
                textHeading: this.props.relatedSku.code,
                text: this.props.relatedSku.title
            }
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
            err => console.log(err)
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
        });
    };
    
    renderAvailability(productStatus) {
        if(productStatus){
            return <Stock
                    skuConfig={this.props.skuConfig.skuInfo}
                    skuNumber={this.props.relatedSku.code}
                    skuAvailability={this.state.skuAvailability}
                    locale={this.props.skuConfig.locale}
                    skuType="details" />
        }
        return <span className="cmp-sku-list__checkavailability">
                    <div>{this.props.skuConfig.skuInfo.seeAvailabilityLabel}</div>
                    <ReactSVG
                        src={this.props.skuConfig.skuInfo.refreshIcon}
                    />
                </span>

    }

    render() {
        return ( 
            <div className="cmp-sku-list__container">
                <div className="cmp-sku-list__right">
                    <img src={this.props.relatedSku.primaryImageThumbnail} alt={this.props.relatedSku.primaryImageAlt} />
                </div>
                <div className="cmp-sku-details__left">
                    <div className="cmp-sku-list__code">{this.props.relatedSku.code}</div>
                    <a href={this.props.relatedSku.skuPageHref ? this.props.relatedSku.skuPageHref : null}>
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
                            {this.renderAvailability(this.state.skuAvailability.productStatus)}

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
                </div>
            </div>
        )
    }
}
export default ListItem;