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
        
        props.skuConfig.modalInfo.buttons[0].action = buildViewCartURL(props.skuConfig.modalInfo.buttons[0].action);
//        props.skuConfig.addToCartUrl = buildViewCartURL(props.skuConfig.addToCartUrl);


        this.state = {
            skuConfig: this.props.skuConfig,
            skuAvailability: {},
            addToCartQty: undefined,
            skuInfo: this.props.skuConfig.skuInfo,
            userCountry: this.props.skuConfig.countryCode,
            isEProcurementUserRestricted: (!isEprocurementApp() && isEprocurementUserRole()),
            userInfo: callCustomerPriceApi(this.props.skuConfig.isCustomerPriceApiDisabled)
        };
    }

    renderSignIn() {
        if (!LoginStatus.state()) {
            return (
                <SignIn
                    signInUrl={this.props.skuConfig.baseSignInUrl}
                    signInIcon={this.props.skuConfig.skuInfo.signinIcon}
                    signInText1={this.props.skuConfig.skuInfo.signInText1}
                    signInText2={this.props.skuConfig.skuInfo.signInText2}
                    signInText3={this.props.skuConfig.skuInfo.signInText3}
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
        let nextIcon = this.props.skuConfig.skuInfo.nextIcon;
        let onItemClick = this.props.onItemClick;

        if(record.code) {
            return <SkuItem
                key={index}
                relatedSku={record}
                skuConfig={this.props.skuConfig}
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
    skuConfig: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    title: PropTypes.string
};

SkuList.defaultProps = {
    skuConfig: {},
    data: [],
    title: ''
};

export default SkuList;
