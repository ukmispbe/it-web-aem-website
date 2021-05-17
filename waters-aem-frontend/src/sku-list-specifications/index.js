import React from 'react';
import PropTypes from 'prop-types';
import LoginStatus from '../scripts/loginStatus';
import SignIn from '../scripts/signIn';
import SkuTable from './views/sku-table';
import { SearchService } from '../search/services';
import cookieStore from '../stores/cookieStore';
import ReactSVG from 'react-svg';
import '../styles/sku-list-specifications.scss';

class SkuListSpecifications extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            skuList: [],
            showSkuTablePlaceHolder: true,
            hasError: false,
        };
        this.searchService = null;
    }

    componentDidMount() {
        const isoCode = cookieStore.getLocale() || 'en_IN';
        const path = this.props.config.skuSearchBaseUrl;
        this.searchService = new SearchService(isoCode, path);
        this.getSkuListData();
    }

    getSkuListData() {
        const { config } = this.props;
        const skuList = config.skuNumberList && config.skuNumberList.split(',') || [];
        const query = {
            skuList: skuList || [],
            fetchProductsUrl: config.fetchProductsUrl || '',
        };
        this.searchService.getSkuListData(query).then(res => {
            if (res) {
                let skuData = (res.documents || []).slice(0, config.skuCount);
                if(skuList.length) {
                    skuData = skuData.filter((item) => {
                        return item && item.skucode && skuList.indexOf(item.skucode) !== -1;
                    })
                }
                this.setState({ skuList: skuData });
            }
        }).catch((err) => {
            console.log(err);
        })
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
        const { skuList = [] } = this.state;
        const signIn = this.renderSignIn();
        return (
            <section className="cmp-sku-list-specifications">
                {this.props.title && (
                    <div className="cmp-sku-list-specifications__title">
                        {this.props.title}
                    </div>
                )}
                <div className="row">
                    <div className="col-lg">
                        {/* Static Value to be updated */}
                        Showing 1-10 of 1000 Products | Filters
                    </div>
                    <div className="col-lg col-lg-6 end-lg">{signIn}</div>
                </div>

                <div className="cmp-sku-list-specifications_container">
                    <SkuTable config={config} skuList={skuList}></SkuTable>
                </div>
                <div className="cmp-sku-list-specifications_view-list">
                    <a href={config.viewFullProductListUrl}>
                            <ReactSVG
                                aria-hidden="true"
                                src={config.viewFullProductListIcon}
                                wrapper="span"
                                data-locator="add-multiple-item-icon"
                            />
                            {config.viewFullProductListLabel}
                    </a>
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
