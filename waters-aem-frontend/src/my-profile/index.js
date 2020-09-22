import React, { useState } from "react";
import useProfile from  '../detail-tiles/hooks/useProfile';
import DetailTiles from "../detail-tiles";
import generateTiles from '../detail-tiles/utils/generateTiles';

const MyProfile = ({ configs }) => {
    const [userDetailsUrl, setUserDetailsUrl] = useState(configs.userDetailsUrl);
    const [soldToDetailsUrl, setSoldToDetailsUrl] = useState(configs.soldToDetailsUrl);
    const [submitEndpoint, setSubmitEndpoint] = useState(configs.submitEndpoint);

    const setupConfig = (configId, abstractConfig={}) => {
        let config = {...abstractConfig, userDetailsUrl, soldToDetailsUrl, submitEndpoint};

        config = {
            ...config,
            ...JSON.parse(document.getElementById(configId).innerHTML)
        };

        return config;
    };

    const renderDetailTiles = () => {
        const detailTiles = [];
        const personalConfig = setupConfig(configs.personalConfigId);
        const profileReturnData =  useProfile(userDetailsUrl, soldToDetailsUrl, personalConfig.type, personalConfig.icons ? personalConfig.icons.refresh : {});
        if (profileReturnData && profileReturnData.data && profileReturnData.tiles.length !== 0 ) {
            personalConfig.profileTiles = profileReturnData.tiles;
            personalConfig.profileData = profileReturnData.setData;
            personalConfig.data = profileReturnData.data;
            detailTiles.push(personalConfig);
    
            const abstractAddress = JSON.parse(document.getElementById(configs.addressConfig.abstractConfig).innerHTML);
            configs.addressConfig.configs.map(id => {
                const addressConfig = setupConfig(id, abstractAddress);              
                addressConfig.profileTiles = generateTiles(personalConfig.data, addressConfig.type, addressConfig.icons ? addressConfig.icons.refresh : {});;
                addressConfig.profileData = profileReturnData.setData;
                addressConfig.data = profileReturnData.data;
                detailTiles.push(addressConfig);
            }
        );
    
            return detailTiles.map((config, key) => (<DetailTiles {...config} key={key} />));
        }
    };

    return (
        <>
            {renderDetailTiles()}
        </>
    );
};

export default MyProfile;