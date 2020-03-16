import { useEffect, useState } from 'react';
import generateTiles from '../utils/generateTiles';
import UserDetailsLazy from '../../my-account/services/UserDetailsLazy';
import SoldToDetailsLazy from '../../my-account/services/SoldToDetailsLazy';

export default (userDetailsUrl, soldToDetailsUrl, type, icon) => {
    const [data, setData] = useState();
    const [tiles, setTiles] = useState([]);
    const useDefaultSoldTo = true;

    function getData() {
        let firstAPICall = UserDetailsLazy(userDetailsUrl).then(response => {return response});
        let secondAPICall = SoldToDetailsLazy(soldToDetailsUrl, useDefaultSoldTo).then(response => {return response});

        Promise.all([firstAPICall, secondAPICall])
        // .then(values => Promise.all(values.map(value => value.json())))
        .then(finalVals => {
            let firstAPIResp = finalVals[0];
            let secondAPIResp = finalVals[1];
            console.log("Response: UserDetailsLazy", firstAPIResp, "SoldToDetailsLazy", secondAPIResp);
        });
    }


    useEffect(() => {
        getData();
        // UserDetailsLazy(fetchDetailsEndPoint).then(response => {
        //     setData(response);
        // });

        // SoldToDetailsLazy(fetchSoldToEndPoint, useDefaultSoldTo).then(response => {
        //     setData(response);
        // });

        // switch (type) {
        //     case 'personal':
        //         UserDetailsLazy(fetchDetailsEndPoint).then(response => {
        //             setData(response);
        //         });
        //         break;
        //     case 'password':
        //         UserDetailsLazy(fetchDetailsEndPoint).then(response => {
        //             setData(response);
        //         });
        //         break;
        //     case 'shipping':
        //         SoldToDetailsLazy(fetchSoldToEndPoint, useDefaultSoldTo).then(response => {
        //             setData(response);
        //         });
        //         break;
        //     case 'billing':
        //         SoldToDetailsLazy(fetchSoldToEndPoint, useDefaultSoldTo).then(response => {
        //             setData(response);
        //         });
        //         break;
        //     default:
        // }

    }, []);

    useEffect(() => {
        setTiles(generateTiles(data, type, icon));
    }, [data]);

    return { data, tiles, setData };
};