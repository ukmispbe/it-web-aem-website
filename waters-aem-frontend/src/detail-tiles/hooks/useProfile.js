import { useEffect, useState } from 'react';
import generateTiles from '../utils/generateTiles';
import UserDetailsLazy from '../../my-account/services/UserDetailsLazy';
import SoldToDetailsLazy from '../../my-account/services/SoldToDetailsLazy';

export default (fetchDetailsEndPoint, fetchSoldToEndPoint, type, icon) => {
    const [data, setData] = useState();
    const [tiles, setTiles] = useState([]);
    const useDefaultSoldTo = true;
    useEffect(() => {
        switch (type) {
            case 'personal':
                UserDetailsLazy(fetchDetailsEndPoint).then(response => {
                    setData(response);
                });
                break;
            case 'password':
                UserDetailsLazy(fetchDetailsEndPoint).then(response => {
                    setData(response);
                });
                break;
            case 'shipping':
                SoldToDetailsLazy(fetchSoldToEndPoint, useDefaultSoldTo).then(response => {
                    setData(response);
                });
                break;
            case 'billing':
                SoldToDetailsLazy(fetchSoldToEndPoint, useDefaultSoldTo).then(response => {
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