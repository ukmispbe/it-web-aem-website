import { useEffect, useState } from 'react';
import generateTiles from '../utils/generateTiles';
import UserDetailsLazy from '../../my-account/services/UserDetailsLazy';
import SoldToDetailsLazy from '../../my-account/services/SoldToDetailsLazy';

export default (fetchEndPoint, type, icon) => {
    const [data, setData] = useState();
    const [tiles, setTiles] = useState([]);
    const useDefaultSoldTo = true;
    useEffect(() => {

        switch (type) {
            case 'personal':
                UserDetailsLazy(fetchEndPoint).then(response => {
                    setData(response);
                });
                break;
            case 'password':
                UserDetailsLazy(fetchEndPoint).then(response => {
                    setData(response);
                });
                break;
            case 'shipping':
                SoldToDetailsLazy(fetchEndPoint, useDefaultSoldTo).then(response => {
                    setData(response);
                });
                break;
            case 'billing':
                SoldToDetailsLazy(fetchEndPoint, useDefaultSoldTo).then(response => {
                    setData(response);
                });
                break;
            default:
        }

    }, []);

    useEffect(() => {
        setTiles(generateTiles(data, type, icon));
    }, [data]);

    return { data, tiles, setData };
};