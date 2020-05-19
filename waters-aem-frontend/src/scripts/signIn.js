import React from 'react';
import ReactSVG from 'react-svg';
import SessionStore from '../stores/sessionStore';

const SignIn = props => { 

    const onSignIn = (e) => {
        e.preventDefault();
        const store = new SessionStore();
        store.setSignInRedirect(window.location.href);
        window.location.href = props.signInUrl;
    }

    return (
        <div className="cmp-sku-signin-wrapper">
            <div className="cmp-sku-signin">
                <a className="signin-link" 
                    {...({ onClick: (e)=>onSignIn(e), rel: 'nofollow' })}
                >    
                    <ReactSVG src={props.signInIcon} className="signin-icon" />                        
                    <span className="signin-part1">{props.signInText1}</span>
                </a>
                <span className="signin-part2">{props.signInText2}</span>
                <span className="signin-part3">{props.signInText3}</span>
            </div>
        </div>
    );
}

export default SignIn;