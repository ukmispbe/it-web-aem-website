import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';
import { isEmpty } from 'lodash';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import ScreenSizes from '../scripts/screenSizes';
import buildUrl from '../utils/buildUrl';
import getDefaultPathVar from '../utils/getDefaultPathVar';
import LocalStore from '../stores/localStore';

function QuickOrder(props) {
    const {
        buttonLabel,
        addToCartPlaceHolder,
        addToCartUrl,
        multipleItemsLabel,
        multipleItemsLink,
        placeholderQty,
        showLabel,
        minLengthQty,
        maxLengthQty
    } = props;
    const [sku, setSku] = useState('');
    const [qty, setQty] = useState(1);
    const [isMobile, setIsMobile] = useState(ScreenSizes.isMobile());

    const updateViewport = useCallback(() => {
        setIsMobile(ScreenSizes.isMobile());
    }, [setIsMobile]);

    useEffect(() => {
        window.addEventListener('resize', updateViewport, true);
    }, [updateViewport]);

    useLayoutEffect(() => {
        if (document.querySelector('.cmp-notification--error .cmp-notification-title')) {
            document.querySelector('.cmp-notification--error .cmp-notification-title').style.display = 'none';
        }
    }, []);

    function skuErrorMgs(showError) {
        try {
            const element = document.querySelector('.cmp-notification--error');
            if (element) {
                if (showError) {
                    document.querySelector('.cmp-notification--error .cmp-notification-description')
                        .innerText = `${sku} ${document.querySelector('.cmp-notification--error .cmp-notification-title').innerText}`;
                    element.classList.remove('cmp-notification--dynnamic');
                } else {
                    document.querySelector('.cmp-notification--error .cmp-notification-description').innerText = '';
                    element.classList.add('cmp-notification--dynnamic');
                }
            }
        } catch (error) { }
    }

    function getNumber(value) {
        let number = value;
        if (!isEmpty(number)) {
            number = parseInt(value, 10);
        }
        return number;
    }

    function validateQty(value) {
        let status = true;
        const regex = /^[0-9]+$/;
        if (isEmpty(value)) {
            return status;
        }
        if (value < minLengthQty || value > maxLengthQty || !regex.test(value)) {
            status = false;
        }
        return status;
    }

    function onBlurQty(e) {
        e.preventDefault();
        const { value } = e.target;
        const status = validateQty(value);
        const parseValue = getNumber(value);
        if (status && parseValue > 0 && !isEmpty(value)) {
            setQty(value);
        }
    }

    function onKeyUpQty(e) {
        e.preventDefault();
        if (e.keyCode === 13 || e.charCode === 13) {
            const { value } = e.target;
            const status = validateQty(value);
            const parseValue = getNumber(value);
            if (status && parseValue > 0 && !isEmpty(value)) {
                setQty(value);
            }
        }
    }

    function onChangeSku(value) {
        setSku(value);
    }

    function onChangeQty(value) {
        if (validateQty(value)) {
            setQty(value);
        }
    }

    function onSubmit() {
        const localStore = new LocalStore();
        const guid = localStore.getCartId();
        if (guid && sku && qty > 0) {
            const fetchProps = {
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify({ products: [{ code: sku, quantity: qty || 1 }] }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            };
            const options = {
                fetchProps,
                query: { successWithCart: true, fields: 'BASIC', createCart: false },
                pathVars: Object.assign({ guid }, getDefaultPathVar())
            };
            const url = buildUrl({ pathname: addToCartUrl, query: options.query, pathVars: options.pathVars });
            fetch(url, fetchProps)
                .then(response => response.text())
                .then(result => {
                    const response = JSON.parse(result);
                    skuErrorMgs(response.hasOwnProperty('errors') || false);
                    if (response.hasOwnProperty('cartModifications')) {
                        setSku('');
                        setQty(1);
                        // TODO modalbox to ack
                    }
                })
                .catch(() => { });
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
                    className="quick-order-sku"
                    showLabel={showLabel}
                    onChange={onChangeSku}
                    elementLocator="input-quick-order-sku"
                />
                <Input
                    id="quickOrderQty"
                    type="number"
                    name="qty"
                    placeholder={placeholderQty}
                    ariaLabel="quantity"
                    showLabel={showLabel}
                    value={qty}
                    min="1"
                    max="999"
                    minLength={minLengthQty}
                    maxLength={maxLengthQty}
                    onChange={onChangeQty}
                    onBlur={onBlurQty}
                    onKeyUp={onKeyUpQty}
                    elementLocator="input-quick-order-qty"
                />
                <Button
                    className="primary quick-order-submit-button"
                    disabled={!sku.trim()}
                    onClick={onSubmit}
                    elementLocator="button-quick-order-add-to-cart"
                >
                    {buttonLabel}
                </Button>
            </div>
            <a
                href={multipleItemsLink}
                className="quick-order-multiple-item"
                data-locator="link-quick-order-add-multiple-item"
            >
                <ReactSVG
                    src={`/content/dam/waters/en/brand-assets/icons/${isMobile ? 'add' : 'multiple'}.svg`}
                    wrapper='span'
                />
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
    placeholderQty: PropTypes.string,
    showLabel: PropTypes.bool,
    minLengthQty: PropTypes.number,
    maxLengthQty: PropTypes.number,
}

QuickOrder.defaultProps = {
    buttonLabel: '',
    addToCartPlaceHolder: '',
    addToCartUrl: '',
    multipleItemsLabel: '',
    multipleItemsLink: '',
    placeholderQty: '',
    showLabel: false,
    minLengthQty: 1,
    maxLengthQty: 999
}

export default QuickOrder;