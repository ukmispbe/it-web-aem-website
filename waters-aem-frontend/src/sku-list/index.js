// entry point for SKU. Move this up to global entry point if we want babel to polyfill everything we need at build time
import React from 'react';
import PropTypes from 'prop-types';
import SkuItem from './views/sku-item';
import LitItem from './views/lit-item';
import LoginStatus from '../scripts/loginStatus';
import SignIn from '../scripts/signIn';
import { buildViewCartURL } from '../utils/eCommerceFunctions';

import {isEprocurementUser as isEprocurementApp, isEprocurementUserRole} from '../utils/userFunctions';
import { callCustomerPriceApi } from '../utils/userFunctions';

class SkuList extends React.Component {
    constructor(props) {
        super(props);
        
        // Update the Continue to cart Button on Modal with the correct Country & Locale
        props.config.modalInfo.buttons[0].action = buildViewCartURL(props.config.modalInfo.buttons[0].action);
        
        this.state = {
            config: this.props.config,
            skuAvailability: {},
            addToCartQty: undefined,
            skuInfo: this.props.config.skuInfo,
            userCountry: this.props.config.countryCode,
            isEProcurementUserRestricted: (!isEprocurementApp() && isEprocurementUserRole()),
            userInfo: callCustomerPriceApi(this.props.config.isCustomerPriceApiDisabled)
        };
    }

    renderSignIn() {
        if (!LoginStatus.state()) {
            return (
                <SignIn
                    signInUrl={this.props.config.baseSignInUrl}
                    signInIcon={this.props.config.skuInfo.signinIcon}
                    signInText1={this.props.config.skuInfo.signInText1}
                    signInText2={this.props.config.skuInfo.signInText2}
                    signInText3={this.props.config.skuInfo.signInText3}
                />
            );
        }
        else {
            return (
                <>
                </>
            );
        }
    }

    renderResultByType(record, index) {
        let nextIcon = this.props.config.skuInfo.nextIcon;
        let onItemClick = this.props.onItemClick;

        if(record.code) {
            return <SkuItem
                currentSku={record}
                config={this.props.config}
                baseSignInUrl={this.props.baseSignInUrl}
                onItemClick={this.props.onItemClick}
                userInfo={this.state.userInfo}
                isEProcurementUserRestricted={this.state.isEProcurementUserRestricted}
            />
        } else {
            return <LitItem result={record} nextIcon={nextIcon} key={index} onItemClick={onItemClick} />
        }
    };

    render() {
        const signIn = this.renderSignIn();
        return (
            <>
                {this.props.data.length > 0 && ( //only return template if data exists
                    <>
                        {this.props.title && (
                            <div className="cmp-sku-list__title">
                                {this.props.title}
                            </div>
                        )}
                        {signIn}

                        <div className="cmp-search__results-container">
                            <ul className="cmp-search__results">
                                {this.props.data.map((record, index) => (
                                    this.renderResultByType(record, index)
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </>
        );
    }
}

SkuList.propTypes = {
    config: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    title: PropTypes.string
};

SkuList.defaultProps = {
    config: {},
    data: [],
    title: ''
};

export default SkuList;
