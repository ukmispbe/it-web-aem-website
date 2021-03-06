import React from 'react';

const Hr = ({ addClass }) => {
    return <hr className={addClass} />;
};

export default React.memo(Hr);
