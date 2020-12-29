import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import { getQuoteDetails } from '../details.services';
import Shipment from '../components/shipment';
import Spinner from "../../utils/spinner";
import ErrorBoundary from '../../search/ErrorBoundary';
import Modal, { Header, keys } from '../../utils/modal';
import AddToCartBody from '../../sku-details/views/addToCartModal';
import Analytics, { analyticTypes } from '../../analytics';
import { DELIVERY_STATUS } from '../../constants';
import DeliveryStatus from '../../common/delivery-status';
import { getSoldToId, getDummySoldToId, getUserId, getCountryCode, getLanguage } from '../../utils/userFunctions';

class QuoteDetails extends Component {
    constructor({setErrorBoundaryToTrue, resetErrorBoundaryToFalse, removeNotifications, ...props}) {
        super({setErrorBoundaryToTrue, resetErrorBoundaryToFalse, removeNotifications, ...props});
        this.state = {
            quoteId: this.getUrlParameter("id"),
            detailsUrl: props.config.fetchDetailsEndPoint,
            itemsUrl: props.config.fetchItemsEndPoint,
            quoteDetails: {},
            errorServiceError: false,
            errorOrderNotFound: false,
            isLoading: true,
            modalShown: false,
            modalConfig: props.config.modalInfo,
            totalItemsCount:0
        }
    }

    rootStyle = "cmp-order-details";
    setAnalytics = (event, detail={}) => {
        const model = {
            detail,
            event
        };
        Analytics.setAnalytics(analyticTypes['quoteDetails'].name, model);
    }

    toggleModal = () => {
        this.setState({ modalShown: !this.state.modalShown });
    };

    getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(window.location.hash);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    setError = (response) => {
        this.setAnalytics('error', {error: {...response}});
        if (response.status === 400 && response.code === 704) {
            this.setState({orderNotFoundError: true});
        } else {
            this.props.setErrorBoundaryToTrue({code: 400});
            this.setState({errorServiceError: true});
        }
    }

    async componentDidMount() {
        const { detailsUrl, quoteId } = this.state;
        const  userId = getUserId();
        const soldToId = getSoldToId() || getDummySoldToId();
        const countryCode = getCountryCode();
        const language = getLanguage();
        const url = `${detailsUrl}/${quoteId}?soldToId=${soldToId}&userId=${userId}&countryCode=${countryCode}&language=${language}&fields=FULL`;
        getQuoteDetails(url, this.setError)
            .then((data) => {
                const quotes = data && data.quotes || {};
                const {entries = []} = quotes;
                let totalItemsCount = 0;
                entries && entries.map(item=>{
                    totalItemsCount = totalItemsCount + parseInt(item.quantity);
                })
                if(quotes) {
                    this.setState({
                        isLoading: false,
                        quoteDetails: quotes,
                        totalItemsCount
                    });
                } else {
                    this.setState({
                        errorOrderNotFound: true,
                        isLoading: false,
                        totalItemsCount
                    });
                }
            })
    }

    componentWillUnmount() {
        this.props.resetErrorBoundaryToFalse();
        this.props.removeNotifications();
    }

    config = document.getElementById('json-config--cmp-detail-tiles--personal')
        ? JSON.parse(document.getElementById('json-config--cmp-detail-tiles--personal').innerHTML) : '';

    renderAddress = (address = {}) => {
        const {name,address1,address2,address3,street,street2,city,stateName,postalCode} = address || {};
        const cityValue = city && `${city},` || ''
        return (
            <>
            {name && <div className={`${this.rootStyle}-address1`} data-locator="order-details-address">{name}</div>}
            {address1 && <div className={`${this.rootStyle}-address1`} data-locator="order-details-address">{address1}</div>}
            {address2 && <div className={`${this.rootStyle}-address1`} data-locator="order-details-address">{address2}</div>}
            {address3 && <div className={`${this.rootStyle}-address1`} data-locator="order-details-address">{address3}</div>}
            {street && <div className={`${this.rootStyle}-address1`} data-locator="order-details-address">{street}</div>}
            {street2 && <div className={`${this.rootStyle}-address1`} data-locator="order-details-address">{street2}</div>}
            <div className={`${this.rootStyle}-address1`} data-locator="order-details-address">{`${cityValue} ${stateName || ''} ${postalCode || ''}`}</div>
            </>
        );
    }

    renderItemCount = () => {
        const {totalItemsCount } = this.state;
        let label = "";
        if (totalItemsCount > 0) {
            if (totalItemsCount > 1) {
                label = this.props.config.items;
            } else if (totalItemsCount === 1) {
                label = this.props.config.item;
            }

            let itemCountLabel =  " (" + totalItemsCount + " " + label + ")";
            return itemCountLabel;

        } else {
            return label;
        }
    }

    renderReorderButton = className => {
        const {quoteDetails} = this.state;
        const {quoteStatus} = quoteDetails
        return quoteStatus === DELIVERY_STATUS.OPEN || quoteStatus === DELIVERY_STATUS.PENDING && (
            <div className={className} data-locator="quote-details-reorder">
                <a className="cmp-button" href="/#" >
                    {this.props.config.reorderTitle}
                </a>
            </div>
        )
    }

    renderQuoteAgainButton = className => {
        const {quoteDetails} = this.state;
        const {quoteStatus} = quoteDetails
        return quoteStatus === DELIVERY_STATUS.EXPIRED && (
            <div className={className} data-locator="quote-details-quote-again-cta">
                <a className="cmp-button" href="/#" >
                    {this.props.config.quoteAgainTitle}
                </a>
            </div>
        )
    }

    getValue = (data,attribute,defaultValue = undefined) => {
        let value = defaultValue
        if(data){
           value = data[attribute];
        }
       return value
    }
    
    renderDetailsSection = () => {
        const { quoteDetails } = this.state;
        const { config } = this.props;
        const {created, expires, shipTo, billTo,savings,shipping, tax, totalLabel,shipment,icons} = config;
        const {quoteId,quoteCreationDate,quoteExpirationDate, subTotal,totalShippingAndHandling,totalDiscounts,totalTax,totalPrice, shipToInfo, billToInfo,quoteStatus, orderNumber, replacedQuoteNumber} =  quoteDetails;
        const notZeroDiscountFlag = parseFloat(quoteDetails.orderDiscountValue) !== 0 ? true : false;
        const subTotalValue = this.getValue(subTotal,'formattedValue');
        const ShippingAndHandlingValue = this.getValue(totalShippingAndHandling,'formattedValue');
        const totalDiscountsValue = this.getValue(totalDiscounts,'formattedValue');
        const totalTaxValue = this.getValue(totalTax,'formattedValue');
        const totalPriceValue = this.getValue(totalPrice,'formattedValue');
        const showExpireDate = !!(quoteStatus === DELIVERY_STATUS.PENDING || quoteStatus === DELIVERY_STATUS.REJECTED || quoteStatus === DELIVERY_STATUS.OPEN);
        const quoteNumber = quoteStatus === DELIVERY_STATUS.QUOTE_REPLACED ? replacedQuoteNumber : quoteId;
        const showNewDetailsLinkSection = (quoteStatus === DELIVERY_STATUS.QUOTE_REPLACED || quoteStatus === DELIVERY_STATUS.ORDER_PLACED)
        return (<>
            <div className={`${this.rootStyle}__container`}>
                <h2 className={`${this.rootStyle}__title`} data-locator="product-title">
                {config.detailsTitle}
                </h2>
                {showNewDetailsLinkSection && (<div className={`${this.rootStyle}__new-details-link-text`}>
                    <div className="new-details-link-section">
                        <div className="new-details-icon">
                            <ReactSVG src={config.icons.newQuoteOrderIcon} />
                        </div>
                        {quoteStatus === DELIVERY_STATUS.QUOTE_REPLACED && (<div className="new-details-text" data-locator="delivery-text">
                            {`${config.newQuote}${quoteId}`}
                        </div>)}
                        {quoteStatus === DELIVERY_STATUS.ORDER_PLACED && (<div className="new-details-text" data-locator="delivery-text">
                            {`${config.orderNumberText}${orderNumber}`}
                        </div>)}
                    </div>
                    {quoteStatus && quoteStatus === DELIVERY_STATUS.ORDER_PLACED && (<div className="new-details-status-icon"><DeliveryStatus
                        status={quoteStatus}
                        labels={shipment}
                        icons={icons}
                    /> </div>)} 
                </div>)}
                <div className={`${this.rootStyle}__order-info`}>
                <h3 className={`${this.rootStyle}__order-number`} data-locator="product-number">
                        {config.numberLabel + ": " + quoteNumber}
                    </h3>
                </div>
                <div className={`${this.rootStyle}__order-summary`}>
                {quoteStatus && quoteStatus !== DELIVERY_STATUS.ORDER_PLACED && (<DeliveryStatus
                        status={quoteStatus}
                        labels={shipment}
                        icons={icons}
                    />)} 
                </div>
                <div className={`${this.rootStyle}__order-info`}>
                    {quoteCreationDate && (<div className={`${this.rootStyle}__order-date`} data-locator="order-date">
                        {`${created} ${quoteCreationDate}`}
                    </div>)}
                    {showExpireDate && quoteExpirationDate && (<div className={`${this.rootStyle}__order-date`} data-locator="order-date">
                    {`${expires} ${quoteExpirationDate}`}
                    </div>)}
                    <div className={`${this.rootStyle}__address-container`}>
                        {shipToInfo && (<div className={`${this.rootStyle}__ship-to`} data-locator="ship-to">
                            <h4>{shipTo}</h4>
                            {this.renderAddress(shipToInfo)}
                        </div>)}
                        {billToInfo && (<div className={`${this.rootStyle}__bill-to`} data-locator="bill-to">
                            <h4>{billTo}</h4>
                            {this.renderAddress(billToInfo)}
                        </div>)}
                    </div>
                </div>
                <div className={`${this.rootStyle}__order-summary`} data-locator="order-summary">
                    <h4>{config.summaryTitle}</h4>
                    <div className={`${this.rootStyle}__order-subtotal`}>
                        <div className={`${this.rootStyle}__order-subtotal_left`} data-locator="order-subtotal-left">{config.subTotal} {this.renderItemCount()}</div>
                        <div className={`${this.rootStyle}__order-subtotal_right`} data-locator="order-subtotal-right">{subTotalValue}</div>
                    </div>
                    {notZeroDiscountFlag && 
                        <div className={`${this.rootStyle}__order-savings`}>
                            <div className={`${this.rootStyle}__order-savings_left`} data-locator="order-savings-left">{savings}</div>
                            <div className={`${this.rootStyle}__order-savings_right`} data-locator="order-savings-right">{config.minusSign}{totalDiscountsValue}</div>
                        </div>
                    }
                    <div className={`${this.rootStyle}__order-shipping`}>
                        <div className={`${this.rootStyle}__order-shipping_left`} data-locator="order-shipping-left">{shipping}</div>
                        <div className={`${this.rootStyle}__order-shipping_right`} data-locator="order-shipping-right">{ShippingAndHandlingValue}</div>
                    </div>
                    <div className={`${this.rootStyle}__order-tax`}>
                        <div className={`${this.rootStyle}__order-tax_left`} data-locator="order-tax-left">{tax}</div>
                        <div className={`${this.rootStyle}__order-tax_right`} data-locator="order-tax-right">{totalTaxValue}</div>
                    </div>
                    <div className={`${this.rootStyle}__order-total`}>
                        <div className={`${this.rootStyle}__order-total_left`} data-locator="order-total-left">{totalLabel}</div>
                        <div className={`${this.rootStyle}__order-total_right`} data-locator="order-total-right"><h1>{totalPriceValue}</h1></div>
                    </div>
                    {this.renderReorderButton(`${this.rootStyle}__reorder`)}
                    {this.renderQuoteAgainButton(`${this.rootStyle}__reorder`)}
                </div>
            </div>
            </>
        )
    }

    renderNotFoundError = () => {
        return (
            <>
                <div className="cmp-order-details__no-results" data-locator="order-details-no-results">
                    <p>{this.props.config.resultNotFoundErrorTitle}</p>
                </div>
            </>
        );
    }

    renderOrderShipmentList = () => {
        const { quoteDetails,totalItemsCount } = this.state;
        const {entries = []} = quoteDetails;
        if(entries && entries.length > 0){
            return (
                <>
                    <div className="cmp-order-details__order-shipment-list" data-locator="order-shipment-list">
                        <hr className="order-shipment-list__hr"/>
                        <Shipment
                            data={entries}
                            shipment={this.props.config.shipment}
                            icons={this.props.config.icons}
                            resultsText={this.props.config.resultsText}
                            noResultsFoundTitle={this.props.noResultsFoundTitle}
                            totalItemsOrdered={totalItemsCount}
                            totalItems={entries.length}
                            isQuoteDetails={true}
                        />
                    </div>
                    {this.renderReorderButton("order-shipment__reorder")}
                    {this.renderQuoteAgainButton("order-shipment__reorder")}
                </>
            )
        }
        else{
            return null;
        }
    }

    render() {
        const { isLoading, errorOrderNotFound, errorServiceError } = this.state;
        return (
            <>
                {isLoading && (<Spinner loading={isLoading} />)}
                {!isLoading && errorOrderNotFound && this.renderNotFoundError()}
                {!errorOrderNotFound && !errorServiceError && !isLoading && this.renderDetailsSection()}
                {!errorOrderNotFound && !errorServiceError && !isLoading && this.renderOrderShipmentList()}
                <Modal isOpen={this.state.modalShown} onClose={this.toggleModal} className='cmp-add-to-cart-modal'>
                    <Header
                        title={this.state.modalConfig.title}
                        icon={this.state.modalConfig.icon}
                        className={keys.HeaderWithAddedMarginTop}
                    />
                    <AddToCartBody
                        config={this.state.modalConfig}
                        errorObjCart={this.state.errorObjCart}
                    />
                </Modal>
            </>
        )
    }
}

const ErrorBoundaryQuoteDetails = props => (
    <ErrorBoundary>
        <QuoteDetails {...props} />
    </ErrorBoundary>
)
export { QuoteDetails };
export default ErrorBoundaryQuoteDetails;