export default {
    myAccount: {
        path: "/",
    },
    profile: {
        path: "/profile",
        link: "Profile",
        breadcrumbs: ['/']
    },
    changePassword: {
        path: "/changepassword",
        label: "Change password",
        breadcrumbs: ['/']
    },
    orderHistory: {
        path: "/orderhistory",
        label: "Order History",
        breadcrumbs: ['/']
    },
    orderDetails: {
        path: "/orderdetails",
        label: "Order Details",
        breadcrumbs: ['/', '/orderhistory']
    }
};