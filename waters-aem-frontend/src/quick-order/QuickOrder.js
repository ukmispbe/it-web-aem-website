import React, { useRef, useState, useEffect, useCallback, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';

import AddToCart from '../sku-details/views/addToCart';
import Input from '../components/Input/Input';
import ScreenSizes from '../scripts/screenSizes';
import { mainCartContext } from "../analytics";

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
        price
    } = props;
    const childRef = useRef();
    const [sku, setSku] = useState('');
    const [errorObjCart, setErrorObjCart] = useState({});
    const [modalShown, setModalShown] = useState(false);
    const [isMobile, setIsMobile] = useState(ScreenSizes.isMobile());

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
    }

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

    useEffect(() => {
        if (Object.keys(errorObjCart).length > 0) {
            skuErrorMgs(true, sku);
        }
    }, [errorObjCart]);

    // Call during cart success response
    function toggleModal() {
        // Will use for the modealbox
        setSku('');
        childRef.current.onChangeSku('');
        childRef.current.skuQuantityInput({ target: { value: 1 } });
        setErrorObjCart({});
        setModalShown(!modalShown);
        skuErrorMgs(false);
    }

    // Handle Error boundry
    function toggleErrorModal(err) {
        // Add Error Object to State
        if (Object.keys(err).length > 0) {
            setErrorObjCart(err);
            setModalShown(!modalShown);
        }
    }

    return (
        <>
            <div className="quick-order-parent">
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
                />
                <AddToCart
                    skuNumber={sku}
                    addToCartQty={1}
                    addToCartLabel={buttonLabel}
                    addToCartUrl={addToCartUrl}
                    isCommerceApiMigrated={isCommerceApiMigrated}
                    toggleParentModal={toggleModal}
                    toggleErrorModal={toggleErrorModal}
                    analyticsConfig={{ sku, price, context: mainCartContext, name: titleText }}
                    onRef={ref => { childRef.current = ref; }}
                />
            </div>
            <a
                href={multipleItemsLink}
                className="quick-order-multiple-item"
                data-locator="link-quick-order-add-multiple-item"
            >
                <ReactSVG src={isMobile ? addItemsIcon : multipleItemsIcon} wrapper='span' />
                {multipleItemsLabel}
            </a>
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
}

export default QuickOrder;