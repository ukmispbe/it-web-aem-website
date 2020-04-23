const eventTypes = {
    cart: {
        name: 'cart',
        event: 'cartAdd',
        context: ['main', 'search', 'related']
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
        }
    },
    linkClick: {
        name: 'linkClick',
        event: 'linkClick'
    }
}

export default eventTypes;