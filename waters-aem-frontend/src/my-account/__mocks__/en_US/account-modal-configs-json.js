export default {
    "userDetailsUrl": "https://dev-www.waters.com:8443/api/waters/user/v1/details",
    "soldToDetailsUrl": "https://dev-www.waters.com:8443/api/waters/user/v1/retrievesoldto",
    "siteConfig": "eCommerce",
    "homepageLink": "/nextgen/us/en.html",
    "punchoutSetup": "https://api-sbox.waters.com/dev-waters-punchout-exp-api-v1/api/users/{userId}/punchout/setup/{sid}",
    "punchoutLogin": "https://dev-www.waters.com:8443/api/waters/punchout/v1/login",
    "icon": "/content/dam/waters/en/brand-assets/icons/user.svg",
    "closeIcon": "/content/dam/waters/en/brand-assets/icons/close.svg",
    "title": "My Account",
    "notRegistered": "Not registered yet?",
    "myAccount": {
        "text": "My Account",
        "url": "/nextgen/us/en/account/my-account.html",
        "target": "_self"
    },
    "signIn": {
        "text": "Sign In",
        "url": "/nextgen/us/en/account/sign-in.html",
        "class": "cmp-sign-in-link",
        "linkName": "Sign In"
    },
    "signOut": {
        "text": "Sign Out",
        "url": "/nextgen/us/en.html",
        "signOutEndpoint": "https://dev-www.waters.com:8443/api/waters/user/v1/logout",
        "linkName": "Sign Out"
    },
    "switchAccount": {
        "text": "Switch Account",
        "url": "/nextgen/us/en/account/switch-account.html",
        "linkName": "Switch Account"
    },
    "createAccount": {
        "text": "Create Account",
        "url": "/nextgen/us/en/account/create-account.html",
        "linkName": "Create Account"
    },
    "itemList": [{
            "text": "Profile",
            "url": "/nextgen/us/en/account/my-account.html#profile",
            "target": "_self",
            "class": "dropdown__item-list__my-profile",
            "linkName": "Profile"
        },
        {
            "text": "Order History",
            "url": "/nextgen/us/en/account/my-account.html#orderhistory",
            "target": "_self",
            "class": "dropdown__item-list__my-orders",
            "linkName": "Order History"
        }
    ]
}