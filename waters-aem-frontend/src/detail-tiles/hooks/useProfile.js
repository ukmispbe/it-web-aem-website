import { useEffect, useState } from 'react';
import generateTiles from '../utils/generateTiles';
import UserDetailsLazy from '../../my-account/services/UserDetailsLazy';
import SoldToDetailsLazy from '../../my-account/services/SoldToDetailsLazy';
import loginStatus from '../../scripts/loginStatus';
import { notLoggedInRedirect } from '../../utils/redirectFunctions';
import { matchUserToSoldToAddresses, createUserAddresses } from '../../utils/userFunctions';

export default (userDetailsUrl, soldToDetailsUrl, type, icon) => {
    const [data, setData] = useState();
    const [tiles, setTiles] = useState([]);
    
    // If the address verification flag is true
    // and the customer doesn't have any sold to Mapped
    // pull the address information from the Springboot User Details API

    // If the address verification flag is false
    // and the customer has sold to mapped
    // pull the address information from the Mule User API

    function callSoldToDetails(userDetails) {
        if (userDetails && userDetails.userId && userDetails.salesOrg) {
            if(type !== 'password') {
                SoldToDetailsLazy(soldToDetailsUrl, userDetails.userId, userDetails.salesOrg)
                .then((soldToDetails) => {
                    let mergeAPIs = matchUserToSoldToAddresses(userDetails, soldToDetails);
                    setData(mergeAPIs);
                    console.log("mergeAPIs", mergeAPIs)
                });
            } else {
                setData(createUserAddresses(userDetails));
            }
        }
    }
    function getData() {
        const checkSessionStore = false;
        UserDetailsLazy(userDetailsUrl, checkSessionStore)
        .then((userDetails) => {
            if (userDetails.phone) {
                userDetails.phone = userDetails.phone.replace(/\D/g,'');
            }

            if (userDetails && type !== 'password') {
                if (userDetails.shipOrBillChangeFlag && !userDetails.soldToAccounts.length) {
                    console.log("shipOrBillChangeFlag", userDetails.shipOrBillChangeFlag);
                    setData(createUserAddresses(userDetails));

                } else if (userDetails.shipOrBillChangeFlag && userDetails.soldToAccounts.length) {
                    console.log("shipOrBillChangeFlag", userDetails.shipOrBillChangeFlag);
                    //console.log("udAdd", createUserAddresses(userDetails).addresses);
                    callSoldToDetails(userDetails)
                    //setData(createUserAddresses(userDetails));

                } else if (!userDetails.shipOrBillChangeFlag && userDetails.soldToAccounts.length){
                    callSoldToDetails(userDetails)
                }
            } else {
                setData(createUserAddresses(userDetails));
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
        console.log("data before generate tiles", data);
        setTiles(generateTiles(data, type, icon));
    }, [data]);

    return { data, tiles, setData };
};