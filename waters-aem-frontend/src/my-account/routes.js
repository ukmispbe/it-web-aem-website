export default {
    myAccount: {
        path: "/",
    },
    profile: {
        path: "/profile",
        label: "Profile",
        parentTrail: ['/']
    },
    changePassword: {
        path: "/changepassword",
        label: "Change password",
        parentTrail: ['/']
    },
    orderHistory: {
        path: "/orderhistory",
        label: "Order History",
        parentTrail: ['/']
    },
    orderDetails: {
        path: "/orderdetails",
        label: "Order Details",
        parentTrail: ['/', '/orderhistory']
    }
};