import React from 'react';
import PropTypes from 'prop-types';
import LoginStatus from '../scripts/loginStatus';
import SignIn from '../scripts/signIn';
import SkuTable from './views/sku-table';
import '../styles/sku-list-specifications.scss';

class SkuListSpecifications extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
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
        } else {
            return <></>;
        }
    }

    render() {
        const { config } = this.props;
        const signIn = this.renderSignIn();
        return (
            <section className="cmp-sku-list-specifications">
                {this.props.title && (
                    <div className="cmp-sku-list-specifications__title">
                        {this.props.title}
                    </div>
                )}
                {signIn}

                <div className="cmp-sku-list-specifications_container">
                    <SkuTable config={config}></SkuTable>
                </div>
            </section>
        );
    }
}

SkuListSpecifications.propTypes = {
    config: PropTypes.object.isRequired,
    title: PropTypes.string,
};

SkuListSpecifications.defaultProps = {
    config: {},
    title: '',
};

export default SkuListSpecifications;
