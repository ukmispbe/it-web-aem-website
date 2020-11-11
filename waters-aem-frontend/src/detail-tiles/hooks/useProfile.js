import { useEffect, useState } from 'react';
import generateTiles from '../utils/generateTiles';
import UserDetailsLazy from '../../my-account/services/UserDetailsLazy';
import SoldToDetailsLazy from '../../my-account/services/SoldToDetailsLazy';
import loginStatus from '../../scripts/loginStatus';
import { notLoggedInRedirect } from '../../utils/redirectFunctions';
import { matchAddresses } from '../../utils/userFunctions';

export default (userDetailsUrl, soldToDetailsUrl, type, icon) => {
    const [data, setData] = useState();
    const [tiles, setTiles] = useState([]);
    
    function getData() {
        const checkSessionStore = false;
        UserDetailsLazy(userDetailsUrl, checkSessionStore)
        .then((userDetails) => {
            if (userDetails.phone) {
                userDetails.phone = userDetails.phone.replace(/\D/g,'');
            }

            if(userDetails && userDetails.userId && userDetails.salesOrg) {
                SoldToDetailsLazy(soldToDetailsUrl, userDetails.userId, userDetails.salesOrg)
                .then((soldToDetails) => {
                    let mergeAPIs = matchAddresses(userDetails, soldToDetails);
                    setData(mergeAPIs);
                });
            }
        });
    }

    useEffect(() => {
        if (!loginStatus.state()) {
            const isInEditMode = document.getElementById("header").hasAttribute("data-is-edit-mode");
            if (!isInEditMode) {
                notLoggedInRedirect();
                return null;
            }
        }
    }, []);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        setTiles(generateTiles(data, type, icon));
    }, [data]);

    return { data, tiles, setData };
};