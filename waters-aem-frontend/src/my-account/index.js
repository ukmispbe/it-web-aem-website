import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import MyAccount from "./myaccount";
import MyProfile from '../my-profile';
import ChangePassword from "../change-password";

const MyAccountRouter = (props) => {
    return (
        <HashRouter hashType={"noslash"}>
            <Switch>
                <Route exact path="/">
                    <MyAccount {...props} />
                </Route>
                <Route exact path="/profile" >
                    <MyProfile configs={props.myProfile} />
                </Route>
                <Route exact path="/changepassword" >
                    <ChangePassword configId={props.changePassword.config} />
                </Route>
            </Switch>
        </HashRouter>
    )
};

export default MyAccountRouter;
