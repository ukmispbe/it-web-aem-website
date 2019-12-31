import React, { useState } from "react";

import DetailTiles from "../detail-tiles";

const ChangePassword = ({ configId }) => {
    console.log(configId);
    const [config, setConfig] = useState(JSON.parse(document.getElementById(configId).innerHTML));

    return (
        <>
            <DetailTiles {...config} />
        </>
    );
};

export default ChangePassword;