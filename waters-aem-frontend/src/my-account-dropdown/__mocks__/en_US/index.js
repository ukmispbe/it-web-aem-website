import { MyOrderClass } from '../../my-account-item-list';

const DefaultProps = {
    config: {
        icon: '/content/dam/waters/en/brand-assets/icons/user.svg',
        closeIcon: '/content/dam/waters/en/brand-assets/icons/close.svg',
        title: 'My Account',
        notRegistered: 'Not registered yet?',
        signIn: {
            text: 'Sign In',
            url: '/content/waters/language-masters/en/signIn.html'
        },
        signOut: {
            text: 'Sign Out',
            url: '/content/waters/language-masters/en/signout.html'
        },
        switchAccount: {
            text: 'Switch Account',
            url: '/content/waters/language-masters/en/switch.html'
        },
        createAccount: {
            text: 'CREATE ACCOUNT',
            url: '/content/waters/language-masters/en/test.html'
        },
        itemList: [
            {
                text: 'My Profile',
                url: '/content/waters/language-masters/en/search.html',
                target: '_self',
                class: 'dropdown__item-list__my-profile'
            },
            {
                text: 'My Orders',
                url: '/content/waters/language-masters/en/library.html',
                target: '_self',
                class: MyOrderClass
            }
        ],
        loginState: true,
        userDetails: {
            userName: 'Susan Corman',
            accountName: 'Pfizer Randolf,',
            accountNumber: 'NJ 28264019282'
        }
    }
};

export default DefaultProps;
