import React, { useState, useEffect } from "react";

import DetailTiles from "../detail-tiles";

const ChangePassword = ({ configId, configs }) => {
    const [config, setConfig] = useState();
    let configContent = JSON.parse(document.getElementById(configId).innerHTML); 
    configContent.userDetailsUrl = configs.userDetailsUrl;

    useEffect(() => {
        setConfig(configContent);
    }, []);

    return (
        <>
            {!!config &&
            (<DetailTiles {...config} />)}
        </>
    );
};

export default ChangePassword;