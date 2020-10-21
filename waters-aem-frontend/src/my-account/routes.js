export default {
    myAccount: {
        name: "myAccount",
        path: "/",
    },
    profile: {
        name: "profile",
        path: "/profile",
        parentTrail: ['/']
    },
    changePassword: {
        name: "changePassword",
        path: "/changepassword",
        parentTrail: ['/']
    },
    orderHistory: {
        name: "orderHistory",
        path: "/orderhistory",
        parentTrail: ['/'],
    },
    orderDetails: {
        name: "orderDetails",
        path: "/orderdetails",
        parentTrail: ['/', '/orderhistory']
    },
    quoteHistory: {
        name: "quoteHistory",
        path: "/quotehistory",
        parentTrail: ['/'],
    },
    quoteDetails: {
        name: "quoteDetails",
        path: "/quotedetails",
        parentTrail: ['/', '/quotehistory']
    }
}
