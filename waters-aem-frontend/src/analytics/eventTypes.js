const eventTypes = {
    cart: {
        name: 'cart',
        event: 'scAddAEM',
        context: ['Part Detail Page', 'Search: Global', 'Related Products']
    },
    reOrder: {
        name: 'reOrder',
        event: 'scAddReorder',
        context: 'Order History: Reorder'
    },
    stock: {
        name: 'stock',
        event: 'checkAvailability'
    },
    search: {
        name: 'search',
        event: 'search'
    },
    form: {
        name: 'form',
        registration: {
            name: 'registrationForm',
            load: {
                event: 'registrationFormLoad'
            },
            submit: {
                event: 'registrationFormSubmit'
            },
            error: {
                event: 'registrationFormError'
            }
        },
        checkEmail: {
            name: 'checkEmailForm',
            load: {
                event: 'checkEmailFormLoad'
            },
            submit: {
                event: 'checkEmailFormSubmit'
            },
            error: {
                event: 'checkEmailFormError'
            }
        },
        signin: {
            name: 'signInForm',
            load: {
                event: 'signInFormLoad'
            },
            submit: {
                event: 'signInFormSubmit'
            },
            error: {
                event: 'signInFormError'
            }
        },
        troublesigningin: {
            name: 'troubleSignInForm',
            load: {
                event: 'troubleSignInFormLoad'
            },
            submit: {
                event: 'troubleSignInFormSubmit'
            },
            error: {
                event: 'troubleSignInFormError'
            }
        },
        resetpassword: {
            name: 'resetPasswordForm',
            load: {
                event: 'resetPasswordFormLoad'
            },
            submit: {
                event: 'resetPasswordFormSubmit'
            },
            error: {
                event: 'resetPasswordFormError'
            }
        },
        updatepassword: {
            name: 'updatePasswordForm',
            load: {
                event: 'legacyPasswordFormLoad'
            },
            submit: {
                event: 'legacyPasswordFormSubmit'
            },
            error: {
                event: 'legacyPasswordFormError'
            }
        },
        changepassword: {
            name: 'changePasswordForm',
            load: {
                event: 'changePasswordFormLoad'
            },
            submit: {
                event: 'changePasswordFormSubmit'
            },
            error: {
                event: 'changePasswordFormError'
            }
        },
        personaldetails: {
            name: 'personalDetailsForm',
            load: {
                event: 'personalDetailsFormLoad'
            },
            submit: {
                event: 'personalDetailsFormSubmit'
            },
            error: {
                event: 'personalDetailsFormError'
            }
        },
        contactsupport: {
            name: 'contactSupportForm',
            load: {
                event: 'contactSupportFormLoad'
            },
            submit: {
                event: 'contactSupportFormSubmit'
            },
            error: {
                event: 'contactSupportFormError'
            }
        }
    },
    linkClick: {
        name: 'linkClick',
        event: 'linkClick'
    },
    selectDropDown: {
        name: 'selectDropDown',
        event: 'selectDropDown'
    },
    orderHistory: {
        name: 'orderHistory',
        load: {
            event: 'orderHistoryPageLoad'
        },
        error: {
            event: 'orderHistoryError'
        }
    },
    orderDetails: {
        name: 'orderDetails',
        load: {
            event: 'orderDetailsPageLoad'
        },
        error: {
            event: 'orderDetailsPageError'
        }
    }
}

export default eventTypes;