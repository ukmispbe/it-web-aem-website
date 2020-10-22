import React, { useRef, useState, useEffect, useCallback, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';

import AddToCart from '../sku-details/views/addToCart';
import AddToCartBody from '../sku-details/views/addToCartModal';
import Modal, { Header, keys } from '../utils/modal';
import Input from '../components/Input/Input';
import ScreenSizes from '../scripts/screenSizes';
import { shopAllCartContext } from "../analytics";

function QuickOrder(props) {
    const {
        buttonLabel,
        addToCartPlaceHolder,
        addToCartUrl,
        multipleItemsLabel,
        multipleItemsLink,
        addItemsIcon,
        multipleItemsIcon,
        isCommerceApiMigrated,
        showLabel,
        titleText,
        price,
        skuConfig,
        qtyLabel
    } = props;
    const childRef = useRef();
    const [sku, setSku] = useState('');
    const [errorObjCart, setErrorObjCart] = useState({});
    const [modalShown, setModalShown] = useState(false);
    const [isMobile, setIsMobile] = useState(ScreenSizes.isMobile());
    const [modalConfig, setModalConfig] = useState({ ...skuConfig.modalInfo, partNumberLabel: skuConfig.skuInfo.partNumberLabel });

    function onChange(value) {
        setSku(value);
        childRef.current.onChangeSku(value);
    }

    // HideShow SKU Error
    function skuErrorMgs(showError, skuNumber = '') {
        try {
            const element = document.querySelector('.cmp-notification--error');
            if (element) {
                if (showError) {
                    document.querySelector('.cmp-notification--error .cmp-notification-description')
                        .innerText = `${skuNumber} ${document.querySelector('.cmp-notification--error .cmp-notification-title').innerText}`;
                    element.classList.remove('cmp-notification--dynamic');
                } else {
                    document.querySelector('.cmp-notification--error .cmp-notification-description').innerText = '';
                    element.classList.add('cmp-notification--dynamic');
                }
            }
        } catch (error) { }
    };

    // Hide SKU title msg on ComponentWillMount
    useLayoutEffect(() => {
        if (document.querySelector('.cmp-notification--error .cmp-notification-title')) {
            document.querySelector('.cmp-notification--error .cmp-notification-title').style.display = 'none';
        }
    }, []);

    // Call During Screen resize
    const updateViewport = useCallback(() => {
        setIsMobile(ScreenSizes.isMobile());
    }, [setIsMobile]);

    // Register updateViewport method on screen resize
    useEffect(() => {
        window.addEventListener('resize', updateViewport, true);
    }, [updateViewport]);

    // Get Added SKU info
    const skuResponse = useCallback(response => {
        if (response.cartModifications && response.cartModifications.length > 0) {
            if (response.cartModifications[0].entry && response.cartModifications[0].entry.product) {
                const { code, name } = response.cartModifications[0].entry.product;
                setModalConfig(currentVal => ({
                    ...currentVal,
                    textHeading: code,
                    text: name
                }));
            }
        }
    }, [setModalConfig, setErrorObjCart, setModalShown]);

    // Reset SKU and Qty
    useEffect(() => {
        if (!modalShown && childRef.current) {
            childRef.current.onChangeSku('');
            childRef.current.skuQuantityInput({ target: { value: 1 } });
            setSku(() => '');
        }
    }, [modalShown]);

    // Used for modal status
    const toggleModal = useCallback(() => {
        setErrorObjCart(() => ({}));
        skuErrorMgs(false);
        setModalShown(status => !status);
    }, [setErrorObjCart, skuErrorMgs, setModalShown]);

    // Error scenarios
    const toggleErrorModal = useCallback(error => {
        if (Object.keys(error).length > 0) {
            if ([400, 401, 404, 500].includes(error.status)) {
                setModalConfig(currentVal => ({
                    ...currentVal,
                    isOrderDetails: true,
                    textHeading: skuConfig.errorInfo.title,
                    text: skuConfig.errorInfo.wereSorry
                }));
                setErrorObjCart(error);
                setModalShown(true);
            } else {
                skuErrorMgs(true, childRef.current.state.skuNumber);
            }
        }
    }, [skuErrorMgs, setErrorObjCart, setModalConfig, setModalShown]);

    return (
        <>
            <div className="quick-order-parent" data-locator="quick-order">
                <Input
                    id="code"
                    type="text"
                    name="quickOrder"
                    placeholder={addToCartPlaceHolder}
                    value={sku}
                    className="cmp-sku-details__quantity quick-order-sku"
                    showLabel={showLabel}
                    onChange={onChange}
                    elementLocator="input-quick-order-sku"
                    ariaLabel={addToCartPlaceHolder}
                />
                <AddToCart
                    skuNumber={sku}
                    addToCartQty={1}
                    qtyLabel={qtyLabel}
                    addToCartLabel={buttonLabel}
                    addToCartUrl={addToCartUrl}
                    isCommerceApiMigrated={isCommerceApiMigrated}
                    toggleParentModal={toggleModal}
                    toggleErrorModal={toggleErrorModal}
                    analyticsConfig={{ sku, price, context: shopAllCartContext, name: titleText }}
                    onRef={ref => { childRef.current = ref; }}
                    skuResponse={skuResponse}
                />
            </div>
            <a
                href={multipleItemsLink}
                className="quick-order-multiple-item"
                data-locator="link-quick-order-add-multiple-item"
            >
                <ReactSVG aria-hidden="true" src={isMobile ? addItemsIcon : multipleItemsIcon} wrapper='span' data-locator="add-multiple-item-icon" />
                {multipleItemsLabel}
            </a>
            <Modal isOpen={modalShown} onClose={toggleModal} className='cmp-add-to-cart-modal'>
                {!(Object.keys(errorObjCart).length !== 0) && (
                    <Header
                        title={modalConfig.title}
                        icon={modalConfig.icon}
                        className={keys.HeaderWithAddedMarginTop}
                        elementLocator="quick-order-modal-header" />
                )}
                {(Object.keys(errorObjCart).length !== 0) && (
                    <Header
                        title={skuConfig.errorInfo.title}
                        icon={skuConfig.errorInfo.icon}
                        className={keys.HeaderWithAddedMarginTopError}
                        elementLocator="quick-order-modal-header"
                    />
                )}
                <AddToCartBody
                    config={modalConfig}
                    errorObjCart={errorObjCart}
                    onClose={() => { }}
                ></AddToCartBody>
            </Modal>
        </>
    )
}

QuickOrder.defaultProps = {
    buttonLabel: PropTypes.string,
    addToCartPlaceHolder: PropTypes.string,
    addToCartUrl: PropTypes.string,
    multipleItemsLabel: PropTypes.string,
    multipleItemsLink: PropTypes.string,
    addItemsIcon: PropTypes.string,
    multipleItemsIcon: PropTypes.string,
    showLabel: PropTypes.bool,
    isCommerceApiMigrated: PropTypes.bool,
    titleText: PropTypes.string,
    price: PropTypes.string,
    skuConfig: PropTypes.object,
    qtyLabel: PropTypes.string
}

QuickOrder.defaultProps = {
    buttonLabel: '',
    isCommerceApiMigrated: true,
    addToCartPlaceHolder: '',
    addToCartUrl: '',
    multipleItemsLabel: '',
    multipleItemsLink: '',
    addItemsIcon: '/content/dam/waters/en/brand-assets/icons/add.svg',
    multipleItemsIcon: '/content/dam/waters/en/brand-assets/icons/multiple.svg',
    showLabel: false,
    titleText: '',
    price: '',
    skuConfig: {},
    qtyLabel:''
}

export default QuickOrder;