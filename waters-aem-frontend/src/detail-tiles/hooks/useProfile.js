import { useEffect, useState } from 'react';
import generateTiles from '../utils/generateTiles';
import UserDetailsLazy from '../../my-account/services/UserDetailsLazy';
import SoldToDetailsLazy from '../../my-account/services/SoldToDetailsLazy';

export default (userDetailsUrl, soldToDetailsUrl, type, icon) => {
    const [data, setData] = useState();
    const [tiles, setTiles] = useState([]);

    const matchAddresses = (userDetailsAPIDetails, soldToAPIDetails) => {
        userDetailsAPIDetails.soldToAccounts.forEach(account => {
            for (let i = 0; i < soldToAPIDetails.length; i++) {
                if(account.soldTo === soldToAPIDetails[i].soldTo) {
                    account.company = soldToAPIDetails[i].company;
                    account.addresses = soldToAPIDetails[i].partnerAddress;
                } 
            }
        });
        
        return userDetailsAPIDetails;
    }
    function getData() {
        let userDetailsAPICall = UserDetailsLazy(userDetailsUrl).then(response => {return response});
        let soldToAPICall = SoldToDetailsLazy(soldToDetailsUrl).then(response => {return response});

        Promise.all([userDetailsAPICall, soldToAPICall])
        .then(finalVals => {
            let userDetailsAPIResp = finalVals[0];
            let soldToAPIResp = finalVals[1];
            let mergeAPIs = matchAddresses(userDetailsAPIResp, soldToAPIResp);

            setData(mergeAPIs);
        });
    }


    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        setTiles(generateTiles(data, type, icon));
    }, [data]);

    return { data, tiles, setData };
};