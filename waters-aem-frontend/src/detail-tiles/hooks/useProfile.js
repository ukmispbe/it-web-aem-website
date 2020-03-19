import { useEffect, useState } from 'react';
import generateTiles from '../utils/generateTiles';
import UserDetailsLazy from '../../my-account/services/UserDetailsLazy';
import loginStatus from "../../scripts/loginStatus";
import { signInRedirect } from '../../utils/redirectFunctions';

export default (fetchEndPoint, type, icon) => {
    const [data, setData] = useState();
    const [tiles, setTiles] = useState([]);

    useEffect(() => {
        // if (!loginStatus.state()) {
        //     const isInEditMode = document.getElementById("header").hasAttribute("data-is-edit-mode");
        //     if (!isInEditMode) {
        //         signInRedirect();
        //     }
        // }
        UserDetailsLazy(fetchEndPoint).then(response => {
            setData(response);
        });
    }, []);

    useEffect(() => {
        setTiles(generateTiles(data, type, icon));
    }, [data]);

    return { data, tiles, setData };
};