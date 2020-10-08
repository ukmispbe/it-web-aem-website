import React from 'react';
import ReactSVG from 'react-svg';
import SessionStore from '../stores/sessionStore';
import { isSignInHidden } from '../utils/eCommerceFunctions';

const SignIn = props => { 

    const onSignIn = (e) => {
        e.preventDefault();
        const store = new SessionStore();
        store.setSignInRedirect(window.location.href);
        window.location.href = props.signInUrl;
    }

    if (!isSignInHidden()) {
        return (
            <div className="cmp-sku-signin-wrapper" data-locator="sku-signin-wrapper">
                <div className="cmp-sku-signin" data-locator="sku-signin">
                    <a className="signin-link" data-locator="signin-link" 
                        {...({ onClick: (e)=>onSignIn(e), rel: 'nofollow' })}
                    >    
                        <ReactSVG src={props.signInIcon} className="signin-icon" data-locator="signin-icon" />                        
                        <span className="signin-part1" data-locator="signin-part1">{props.signInText1}</span>
                    </a>
                    <span className="signin-part2" data-locator="signin-part2">{props.signInText2}</span>
                    <span className="signin-part3" data-locator="signin-part3">{props.signInText3}</span>
                </div>
            </div>
        );
    }
    else {
        return (null);
    }
}

export default SignIn;