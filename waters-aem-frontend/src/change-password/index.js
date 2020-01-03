import React, { useState, useEffect } from "react";

import DetailTiles from "../detail-tiles";

const ChangePassword = ({ configId }) => {
    const [config, setConfig] = useState();

    useEffect(() => {
        setConfig(JSON.parse(document.getElementById(configId).innerHTML));
    }, []);

    return (
        <>
            {!!config &&
            (<DetailTiles {...config} />)}
        </>
    );
};

export default ChangePassword;