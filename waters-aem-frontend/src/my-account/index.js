import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import routes from "./routes";
import Aside from "./aside";
import MyAccount from "./myaccount";
import MyProfile from '../my-profile';
import ChangePassword from "../change-password";
import OrderHistory from "../history/order-history";
import OrderDetails from "../details/order-details";
import QuoteHistory from "../history/quote-history";
import QuoteDetails from "../details/quote-details";

import '../styles/my-account.scss';
import '../styles/detail-tiles.scss';

const MyAccountRouter = (props) => {
    return (
        <HashRouter hashType={"noslash"}>
            <Switch>
                <Route exact path={routes.myAccount.path}>
                    <MyAccount {...props} />
                </Route>
                <Route exact path={routes.profile.path}>
                    <Aside tiles={props.tiles} breadcrumbs={props.breadcrumbs}>
                        <MyProfile configs={props.myProfile} />
                    </Aside>
                </Route>
                <Route exact path={routes.changePassword.path}>
                    <Aside tiles={props.tiles} breadcrumbs={props.breadcrumbs}>
                        <ChangePassword configId={props.changePassword.config} configs={props.myProfile} />
                    </Aside>
                </Route>
                <Route exact path={routes.orderHistory.path}>
                    <Aside tiles={props.tiles} breadcrumbs={props.breadcrumbs}>
                        <OrderHistory configs={props.orderHistory} />
                    </Aside>
                </Route>
                <Route exact path={routes.orderDetails.path}>
                    <Aside tiles={props.tiles} breadcrumbs={props.breadcrumbs}>
                        <OrderDetails config={props.orderDetails} />
                    </Aside>
                </Route>
                <Route exact path={routes.quoteHistory.path}>
                    <Aside tiles={props.tiles} breadcrumbs={props.breadcrumbs}>
                        <QuoteHistory configs={props.quoteHistory} />
                    </Aside>
                </Route>
                <Route exact path={routes.quoteDetails.path}>
                    <Aside tiles={props.tiles} breadcrumbs={props.breadcrumbs}>
                        <QuoteDetails config={props.quoteDetails} />
                    </Aside>
                </Route>
            </Switch>
        </HashRouter>
    )
};

export default MyAccountRouter;
