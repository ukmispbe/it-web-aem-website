// entry point for SKU. Move this up to global entry point if we want babel to polyfill everything we need at build time
import React from 'react';
import PropTypes from 'prop-types';
import { getPricing } from '../sku-details/services';
import ListItem from './views/listItem';
import LoginStatus from '../scripts/loginStatus';
import SignIn from '../scripts/signIn';
import GetIsocode from '../utils/get-isocode';

class SkuList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            skuConfig: this.props.skuConfig,
            skuAvailability: {},
            addToCartQty: undefined,

            listPrice: this.props.data.formattedPrice,
            custPrice: '',
            skuInfo: this.props.skuConfig.skuInfo,
            customerNumber: '154488',
            userCountry: this.props.skuConfig.countryCode,
            userIsocode: GetIsocode.getIsocode(),
            pricingUrl: this.props.skuConfig.pricingUrl,
        };
    }

    checkPricing = skuNumber => {
        getPricing(this.state.pricingUrl, skuNumber, this.state.customerNumber, this.state.userIsocode)
        .then(response => {
            
        console.log("custPrice response", response);
        console.log("custPrice response.netPrice", response.netPrice);
            this.setState({
                custPrice: response.netPrice,
                analyticsConfig: {
                    ...this.state.analyticsConfig,
                    custPrice: response.netPrice
                }
            }, () => {
                    //this.checkAvailabilityAnalytics();
            });
        })
        .catch(err => {
            // Add Error Object to State
            this.setState({ errorObjPrice: err });
        });
    };

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
            this.checkPricing(this.props.data);
            return (
                <>
                </>
            );
        }
    }

    render() {
        const signIn = this.renderSignIn();
        console.log("data", this.props.data);
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
                        {this.props.data.map((record, index) => (
                            <ListItem
                                key={index}
                                relatedSku={record}
                                skuConfig={this.props.skuConfig}
                                baseSignInUrl={this.props.baseSignInUrl}
                                onItemClick={this.props.onItemClick}
                            />
                        ))}
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

export default SkuList;
