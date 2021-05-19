import React from 'react';
import PropTypes from 'prop-types';
import LoginStatus from '../scripts/loginStatus';
import SignIn from '../scripts/signIn';
import SkuTable from './views/sku-table';
import { SearchService } from '../search/services';
import cookieStore from '../stores/cookieStore';
import ReactSVG from 'react-svg';
import GetIsocode from '../utils/get-isocode';
import '../styles/sku-list-specifications.scss';

class SkuListSpecifications extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            skuList: [],
            showSkuTablePlaceHolder: true,
            hasError: false,
            totalSkuCount: 0,
        };
        this.searchService = null;
    }

    componentDidMount() {
        const isoCode = GetIsocode.getIsocode();
        const path = this.props.config.skuSearchBaseUrl;
        this.searchService = new SearchService(isoCode, path);
        this.getSkuList();
    }

    getSearchUrl = (queryParamsString = '') => {
        const { config } = this.props;
        if (!queryParamsString) {
            return config.searchPath;
        }

        if (queryParamsString.indexOf('?') !== -1) {
            return queryParamsString;
        } else {
            return `${config.searchPath}?${queryParamsString}`;
        }
    };

    getSkuList() {
        const { config } = this.props;
        const skuList =
            (config.skuNumberList && config.skuNumberList.split(',')) || [];
        const query = {
            skuList: skuList || [],
            fetchProductsUrl: config.fetchProductsUrl || '',
        };
        const updateTotalCountHandler = (res) => {
            if (res) {
                this.setState({ totalSkuCount: res.num_found });
            }
        };

        const requestHandler = (res) => {
            if (res) {
                let skuData = (res.documents || []).slice(0, config.skuCount);
                if (!skuData.length) {
                    this.setState({ skuList: skuData, hasError: true });
                    return;
                }
                if (skuList.length) {
                    skuData = skuData.filter((item) => {
                        return (
                            item &&
                            item.skucode &&
                            skuList.indexOf(item.skucode) !== -1
                        );
                    });
                    this.fetchSkuData(
                        { fetchProductsUrl: config.fetchProductsUrl || '' },
                        updateTotalCountHandler
                    );
                } else {
                    this.setState({ totalSkuCount: res.num_found });
                }
                this.setState({ skuList: skuData, hasError: false });
            }
        };

        this.fetchSkuData(query, requestHandler);
    }

    fetchSkuData(query, handler) {
        this.searchService
            .getSkuListData(query)
            .then(handler)
            .catch((err) => {
                console.error(err);
                this.state({ hasError: true });
            });
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
        const { config, title } = this.props;
        const { skuList = [], hasError, totalSkuCount } = this.state;
        const signIn = this.renderSignIn();
        return (
            <section className="cmp-sku-list-specifications">
                {title && (
                    <h2 className="cmp-sku-list-specifications__title">
                        {title}
                    </h2>
                )}
                <div className="row">
                    {!hasError &&
                    skuList.length &&
                    skuList.length < totalSkuCount ? (
                        <div className="col-lg cmp-sku-list-specifications__top-content">
                            <span className="cmp-sku-list-specifications__total-products">
                                {`${config.showingLabel} 1-${skuList.length} ${config.ofLabel} ${totalSkuCount} ${config.productsLabel}`}
                            </span>
                            <a
                                href={this.getSearchUrl(
                                    config.viewFullProductListUrl
                                )}
                                className="cmp-sku-list-specifications__filter"
                            >
                                <ReactSVG
                                    aria-hidden="true"
                                    src={config.filterIcon}
                                    wrapper="span"
                                    data-locator="filter-item-icon"
                                />
                                {config.filterAllLabel}
                            </a>
                        </div>
                    ) : null}
                    <div className="col-lg col-lg-6 end-lg">{signIn}</div>
                </div>

                {!hasError && (
                    <div className="cmp-sku-list-specifications_container">
                        <SkuTable config={config} skuList={skuList}></SkuTable>
                    </div>
                )}
                <div className="cmp-sku-list-specifications_view-list">
                    <a href={this.getSearchUrl(config.viewFullProductListUrl)}>
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
