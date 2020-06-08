// entry point for SKU. Move this up to global entry point if we want babel to polyfill everything we need at build time
import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './views/listItem';
import LoginStatus from '../scripts/loginStatus';
import SignIn from '../scripts/signIn';

class SkuList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            skuConfig: this.props.skuConfig,
            skuAvailability: {},
            addToCartQty: undefined,
            skuInfo: this.props.skuConfig.skuInfo,
            userCountry: this.props.skuConfig.countryCode
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

SkuList.defaultProps = {
    skuConfig: {},
    data: [],
    title: ''
};

export default SkuList;
