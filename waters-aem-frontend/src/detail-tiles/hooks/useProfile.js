import { useEffect, useState } from 'react';
import generateTiles from '../utils/generateTiles';

import UserDetails from '../../my-account/services/UserDetails';
import SessionStore from '../../stores/sessionStore';

export default (fetchEndPoint, type, icon) => {
    const [data, setData] = useState();
    const [tiles, setTiles] = useState([]);

    useEffect(() => {
        const unsubscribe = () => {
            const fetchData = async () => {
                /*
                    START TEMPORARY CODE --

                    Please use this code below until sign-in complete and user token is stored in session storage
                    & User Details service is updated to use that token
                */
                const sessionStore = new SessionStore();
                sessionStore.setUserToken('testus@waters.com');
                //END TEMPORARY CODE

                const userDetails = new UserDetails(fetchEndPoint);
                userDetails
                    .then(response => {
                        setData(response);
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
            };

            if (!!fetchEndPoint) fetchData();
            else setData({});
        };

        return unsubscribe();
    }, []);

    useEffect(() => {
        setTiles(generateTiles(data, type, icon));
    }, [data]);

    return { data, tiles, setData };
};
