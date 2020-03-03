import React, { useState } from "react";

import DetailTiles from "../detail-tiles";

const MyProfile = ({ configs }) => {
    const [fetchEndPoint, setFetchEndPoint] = useState(configs.fetchEndPoint);
    const [submitEndpoint, setSubmitEndpoint] = useState(configs.submitEndpoint);

    const setupConfig = (configId, abstractConfig={}) => {
        let config = {...abstractConfig, fetchEndPoint, submitEndpoint};
        config = {
            ...config,
            ...JSON.parse(document.getElementById(configId).innerHTML)
        };

        return config;
    };

    const renderDetailTiles = () => {
        const detailTiles = [];
        const personalConfig = setupConfig(configs.personalConfigId);

        detailTiles.push(personalConfig);

        const abstractAddress = JSON.parse(document.getElementById(configs.addressConfig.abstractConfig).innerHTML);
        configs.addressConfig.configs.map(id =>
            detailTiles.push(setupConfig(id, abstractAddress))
        );
        
        return detailTiles.map((config, key) => (<DetailTiles {...config} key={key} />));
    };

    return (
        <>
            {renderDetailTiles()}
        </>
    );
};

export default MyProfile;