import { useEffect, useState } from 'react';
import generateTiles from '../utils/generateTiles';
import UserDetailsLazy from '../../my-account/services/UserDetailsLazy';

export default (fetchEndPoint, type, icon) => {
    const [data, setData] = useState();
    const [tiles, setTiles] = useState([]);

    useEffect(async () => {
        setData(await UserDetailsLazy(fetchEndPoint));
    }, []);

    useEffect(() => {
        setTiles(generateTiles(data, type, icon));
    }, [data]);

    return { data, tiles, setData };
};