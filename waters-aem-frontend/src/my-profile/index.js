import React from "react";

import DetailTiles from "../detail-tiles";

const MyProfile = ({ configs }) => {

    const renderDetailTiles = () => {
        return configs.map((id, key) => {
            const config = JSON.parse(document.getElementById(id).innerHTML);
            console.log(config);
            return (<DetailTiles {...config} key={key} />);
        });
    };

    return (
        <>
            {renderDetailTiles()}
        </>
    );
};

export default MyProfile;