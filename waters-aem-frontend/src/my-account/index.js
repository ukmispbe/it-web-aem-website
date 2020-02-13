import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import routes from "./routes";
import Aside from "./aside";
import MyAccount from "./myaccount";
import MyProfile from '../my-profile';
import ChangePassword from "../change-password";

const MyAccountRouter = (props) => {
    return (
        <HashRouter hashType={"noslash"}>
            <Switch>
                <Route exact path={routes.myAccount}>
                    <MyAccount {...props} />
                </Route>
                <Route exact path={routes.profile}>
                    <Aside tiles={props.tiles}>
                        <MyProfile configs={props.myProfile} />
                    </Aside>
                </Route>
                <Route exact path={routes.changePassword}>
                    <Aside tiles={props.tiles}>
                        <ChangePassword configId={props.changePassword.config} />
                    </Aside>
                </Route>
            </Switch>
        </HashRouter>
    )
};

export default MyAccountRouter;
