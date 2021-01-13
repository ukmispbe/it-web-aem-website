import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import { getQuoteDetails } from '../details.services';
import Shipment from '../components/shipment';
import Spinner from "../../utils/spinner";
import ErrorBoundary from '../../search/ErrorBoundary';
import Modal, { Header, keys } from '../../utils/modal';
import AddToCartBody from '../../sku-details/views/addToCartModal';
import Analytics, { analyticTypes } from '../../analytics';
import { DELIVERY_STATUS, STORE, CHECKOUT } from '../../constants';
import DeliveryStatus from '../../common/delivery-status';
import { getFullCompanyAddress, getCartCheckoutUrl, getUrlPath } from '../../utils/userFunctions';
import SessionStore from '../../stores/sessionStore';

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

    getQuoteDetailsData = () => {
        const { detailsUrl, quoteId } = this.state;       
        const url = getUrlPath(detailsUrl, quoteId);
        getQuoteDetails(url, this.setError)
            .then((data) => {
                const quotes = data && data.quotes || undefined;
                let totalItemsCount = 0;
                if(quotes) {
                    totalItemsCount = quotes.totalItems || 0;
                    this.setState({
                        isLoading: false,
                        quoteDetails: quotes,
                        totalItemsCount,
                        errorOrderNotFound:false
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

    async componentDidMount() {
        this.getQuoteDetailsData();
    }

    componentWillReceiveProps(){
        const {quoteId} = this.state;
        const urlQuoteId = this.getUrlParameter("id");
        if(quoteId !== urlQuoteId){
            this.setState({quoteId:urlQuoteId},()=>{
                this.getQuoteDetailsData();
            })
        }
    }

    componentWillUnmount() {
        this.props.resetErrorBoundaryToFalse();
        this.props.removeNotifications();
    }

    config = document.getElementById('json-config--cmp-detail-tiles--personal')
        ? JSON.parse(document.getElementById('json-config--cmp-detail-tiles--personal').innerHTML) : '';

    renderAddress = (address = {}) => {
        if(address){
            const addressArray = getFullCompanyAddress(address, false);
            return (
                <>
                    {addressArray.map((addressLine) => <div className={`${this.rootStyle}-address1`} data-locator="order-details-address">{addressLine}</div>)}
                </>
            );
        }
        
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

    placeOrderForQuote = (e, quoteId) => {
	   e.preventDefault();
       if(quoteId){		
        (new SessionStore()).setQuoteId(quoteId);        
		const checkoutUrl =  getCartCheckoutUrl(STORE,CHECKOUT);
        window.location.href = checkoutUrl;
       }
    }

    renderReorderButton = className => {
        const {quoteDetails} = this.state;
        const {quoteStatus, quoteId} = quoteDetails
        return quoteStatus === DELIVERY_STATUS.OPEN && (
            <div className={className} data-locator="quote-details-reorder">
                <a className="cmp-button" href="#" onClick={(e) => this.placeOrderForQuote(e,quoteId)} >
                    {this.props.config.reorderTitle}
                </a>
            </div>
        )
    }

    renderQuoteAgainButton = className => {
        const {quoteDetails} = this.state;
        const {quoteStatus} = quoteDetails;
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

    getNewQuoteItem = (quoteStatus,replacedQuoteNumber) => {
      if(quoteStatus === DELIVERY_STATUS.QUOTE_REPLACED){
           this.setState({quoteId:replacedQuoteNumber},()=>{
            this.getQuoteDetailsData();
           });
      }
    }
    
    renderDetailsSection = () => {
        const { quoteDetails } = this.state;
        const { config } = this.props;
        const {created, expires, shipTo, billTo,savings,shipping, tax, totalLabel,shipment,icons, isShowQuoteAgainButton} = config;
        const {quoteId,quoteCreationDate,quoteExpirationDate, subTotal,totalShippingAndHandling,totalDiscounts,totalTax,totalPriceWithTax, shipToInfo, billToInfo,quoteStatus, orderNumber, replacedQuoteNumber} =  quoteDetails;
        const isTotalDiscount = this.getValue(totalDiscounts,'value', '0');
        const notZeroDiscountFlag = parseFloat(isTotalDiscount) !== 0 ? true : false;
        const subTotalValue = this.getValue(subTotal,'formattedValue');
        const ShippingAndHandlingValue = this.getValue(totalShippingAndHandling,'formattedValue');
        const totalDiscountsValue = this.getValue(totalDiscounts,'formattedValue');
        const totalTaxValue = this.getValue(totalTax,'formattedValue');
        const totalPriceValue = this.getValue(totalPriceWithTax,'formattedValue');
        const showExpireDate = !!(quoteStatus === DELIVERY_STATUS.PENDING || quoteStatus === DELIVERY_STATUS.REJECTED || quoteStatus === DELIVERY_STATUS.OPEN);
        const showNewDetailsLinkSection = (quoteStatus === DELIVERY_STATUS.QUOTE_REPLACED || quoteStatus === DELIVERY_STATUS.ORDER_PLACED);
        const newItemUrl = quoteStatus === DELIVERY_STATUS.ORDER_PLACED ? `#orderdetails?id=${orderNumber}` : `#quotedetails?id=${replacedQuoteNumber}`;
        return (<>
            <div className={`${this.rootStyle}__container`}>
                <h2 className={`${this.rootStyle}__title`} data-locator="product-title">
                {config.detailsTitle}
                </h2>
                {showNewDetailsLinkSection && (<div className={`${this.rootStyle}__new-details-link-text`}>
                    <div className="new-details-link-section">
                    <a href={newItemUrl} onClick={() => this.getNewQuoteItem(quoteStatus ,replacedQuoteNumber)}>
                        <div className="new-details-icon">
                            <ReactSVG src={config.icons.newQuoteOrderIcon} />
                        </div>
                        {quoteStatus === DELIVERY_STATUS.QUOTE_REPLACED && (<div className="new-details-text" data-locator="delivery-text">
                            {`${config.newQuote}${replacedQuoteNumber}`}
                        </div>)}
                        {quoteStatus === DELIVERY_STATUS.ORDER_PLACED && (<div className="new-details-text" data-locator="delivery-text">
                            {`${config.orderNumberText}${orderNumber}`}
                        </div>)}
                    </a>    
                    </div>
                    {quoteStatus && quoteStatus === DELIVERY_STATUS.ORDER_PLACED && (<div className="new-details-status-icon"><DeliveryStatus
                        status={quoteStatus}
                        labels={shipment}
                        icons={icons}
                    /> </div>)} 
                </div>)}
                <div className={`${this.rootStyle}__order-info`}>
                <h3 className={`${this.rootStyle}__order-number`} data-locator="product-number">
                        {config.numberLabel + ": " + quoteId}
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
                <div className={`${this.rootStyle}__order-summary`} data-locator="order-summary-cart-details">
                    <h4>{config.summaryTitle}</h4>
                    <div className={`${this.rootStyle}__order-subtotal`} data-locator="order-summary-line-sub-total">
                        <div className={`${this.rootStyle}__order-subtotal_left`} data-locator="order-summary-label-sub-total">{config.subTotal} {this.renderItemCount()}</div>
                        <div className={`${this.rootStyle}__order-subtotal_right`} data-locator="order-summary-price-sub-total">{subTotalValue}</div>
                    </div>
                    {notZeroDiscountFlag && 
                        <div className={`${this.rootStyle}__order-savings`} data-locator="order-summary-line-total-discount">
                            <div className={`${this.rootStyle}__order-savings_left`} data-locator="order-summary-label-total-discount">{savings}</div>
                            <div className={`${this.rootStyle}__order-savings_right`} data-locator="order-summary-price-total-discount">{config.minusSign}{totalDiscountsValue}</div>
                        </div>
                    }
                    <div className={`${this.rootStyle}__order-shipping`} data-locator="order-summary-line-total-shipping-handling">
                        <div className={`${this.rootStyle}__order-shipping_left`} data-locator="order-summary-label-total-shipping-handling">{shipping}</div>
                        <div className={`${this.rootStyle}__order-shipping_right`} data-locator="order-summary-price-total-shipping-handling">{ShippingAndHandlingValue}</div>
                    </div>
                    <div className={`${this.rootStyle}__order-tax`} data-locator="order-summary-line-estimated-tax">
                        <div className={`${this.rootStyle}__order-tax_left`} data-locator="order-summary-label-estimated-tax">{tax}</div>
                        <div className={`${this.rootStyle}__order-tax_right`} data-locator="order-summary-price-estimated-tax">{totalTaxValue}</div>
                    </div>
                    <div className={`${this.rootStyle}__order-total`} data-locator="order-summary-line-total-price">
                        <div className={`${this.rootStyle}__order-total_left`} data-locator="order-summary-label-total-price">{totalLabel}</div>
                        <div className={`${this.rootStyle}__order-total_right`} data-locator="order-summary-price-total-price"><h1>{totalPriceValue}</h1></div>
                    </div>
                    {this.renderReorderButton(`${this.rootStyle}__reorder`)}
                    {isShowQuoteAgainButton && this.renderQuoteAgainButton(`${this.rootStyle}__reorder`)}
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
        const {isShowQuoteAgainButton} = this.props.config;
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
                    {isShowQuoteAgainButton && this.renderQuoteAgainButton("order-shipment__reorder")}
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