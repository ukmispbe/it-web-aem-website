export const emilConfig = {
    type: "email",
    name: "email",
    label: "Email Address",
    description: "This will be your username.",
    validation: {
        required: true,
        requiredMsg: "Please enter a valid email address.",
        validateFnName: "email",
        validationMsg: "Please enter a valid email address.",
        alreadyRegisteredMsg: "There is an existing account with that email address.",
        signInMsg: "Sign In",
        signInURL: ""
    }
}
 
export const registrationConfig = {
    submitEndpoint: "https://test-www.waters.com:8443/api/waters/user/v1/registration",
    buttonText: "Create Account",
    icons: {
        checkmarkIcon: "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
        validIcon: "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
        invalidIcon: "/content/dam/waters/en/brand-assets/icons/attention.svg",
        eyeIcon: "/content/dam/waters/en/brand-assets/icons/eye.svg",
        eyeOffIcon: "/content/dam/waters/en/brand-assets/icons/eye-off.svg",
        signInIcon: "/content/dam/waters/en/brand-assets/icons/user.svg"
    },
    existingEmailUrl: "https://test-www.waters.com:8443/api/waters/user/v1/validate/{email}",
    fields: [
        {
            type: "email",
            name: "email",
            label: "Email Address",
            description: "This will be your username.",
            validation: {
                required: true,
                requiredMsg: "Please enter a valid email address.",
                validateFnName: "email",
                validationMsg: "Please enter a valid email address.",
                alreadyRegisteredMsg: "There is an existing account with that email address.",
                signInMsg: "Sign In",
                signInURL: ""
            }
        },
        {
            type: "text",
            name: "firstName",
            label: "First Name",
            validation: {
                required: true,
                validateFnName: "noWhitespaceOnly",
                validationMsg: "Please enter a valid first name.",
                requiredMsg: "Please enter a first name."
            }
        },
        {
            type: "text",
            name: "lastName",
            label: "Last Name",
            validation: {
                required: true,
                validateFnName: "noWhitespaceOnly",
                validationMsg: "Please enter a valid last name.",
                requiredMsg: "Please enter a last name."
            }
        },
        {
            type: "text",
            name: "company",
            label: "Company",
            validation: {
                validateFnName: "noWhitespaceOnly",
                validationMsg: "Please enter a valid company name.",
                required: true,
                requiredMsg: "Please enter a company name."
            }
        },
        {
            type: "dropdown",
            name: "country",
            label: "Country",
            placeholder: "Select...",
            dropdownIndicator: "/content/dam/waters/en/brand-assets/icons/down.svg",
            options: [{countryCode:"gb",displayName:"United Kingdom"},{countryCode:"us",displayName:"United States"}],
            validation: {
                required: true,
                requiredMsg: "Please select your country."
            }
        },
        {
            type: "password",
            name: "password",
            label: "Create Password",
            hasMatch: true,
            matchLabel: "Confirm Password",
            validation: {
                required: true,
                validateFnName: "password",
                validationMsg: "Please enter a valid password.",
                requiredMsg: "Please enter a password.",
                nonMatchingMsg: "Passwords must match. Please try again.",
                requirementsLabel: "Your password must include",
                requirements: [
                    {name: "shortPassword", msg: "at least 8 characters"},
                    {name: "noUppercase", msg: "at least 1 uppercase letter"},
                    {name: "noLowercase", msg: "at least 1 lowercase letter"},
                    {name: "noDigits", msg: "at least 1 number"},
                    {name: "noSpecial", msg: "at least 1 symbol (for example, !, $, #, %)"}
                ]
            }
        },
        {
            type: "checkbox",
            name: "communications",
            label: "I want to receive communications from Waters."
        },
        {
            type: "checkbox",
            name: "privacy",
            label: "I agree and consent to the information I have provided on this website to be used and processed by Waters in accordance with the",
            config: {
                text: "Waters Privacy Notice.",
                link: "",
                blank: "false"
            },
            validation: {
                required: true,
                validateFnName: "checkBoxOrRadio"
            }
        },
        {
            type: "captcha",
            name: "captcha",
            siteKey: "6Ld5WMIUAAAAACZQvEc7I75aEg5AC8YUUO0W7zRG",
            validation: {
                required: true
            }
        }
    ]
}

export const changePasswordConfig = {
    submitEndpoint: "https://test-www.waters.com:8443/api/waters/user/v1/registration",
    buttonText: "Change Password",
    cancelText: "Cancel",
    icons: {
        checkmarkIcon: "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
        validIcon: "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
        invalidIcon: "/content/dam/waters/en/brand-assets/icons/attention.svg",
        eyeIcon: "/content/dam/waters/en/brand-assets/icons/eye.svg",
        eyeOffIcon: "/content/dam/waters/en/brand-assets/icons/eye-off.svg",
        signInIcon: "/content/dam/waters/en/brand-assets/icons/user.svg"
            },
    fields: [
                {
            type: "password",
            name: "currentPassword",
            label: "Enter Current Password",
            hasMatch: false,
            validation: {
                required: true,
                requiredMsg: "Please enter current password."
                    }
                },
                {
            type: "password",
            name: "newPassword",
            label: "Create New Password",
            hasMatch: true,
            matchLabel: "Confirm New Password",
            validation: {
                required: true,
                validateFnName: "password",
                validationMsg: "Please enter a valid password.",
                requiredMsg: "Please enter a password.",
                nonMatchingMsg: "Passwords must match. Please try again.",
                requirementsLabel: "Your password must include",
                requirements: [
                    {name: "shortPassword", msg: "at least 8 characters"},
                    {name: "noUppercase", msg: "at least 1 uppercase letter"},
                    {name: "noLowercase", msg: "at least 1 lowercase letter"},
                    {name: "noDigits", msg: "at least 1 number"},
                    {name: "noSpecial", msg: "at least 1 symbol (for example, !, $, #, %)"}
                ]
            }
        }
    ]
}

export const troubleSigningInConfig = {
	submitEndpoint: "https://test-www.waters.com:8443/api/waters/user/v1/reset/password?email={email}",
	changePasswordEndpoint: "https://test-www.waters.com:8443/api/waters/user/v1/change/password",
	buttonText: "RESET PASSWORD",
	redirectUrl: "/content/waters/language-masters/en/reg-check-email.html",
	icons: {
		checkmarkIcon: "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
		validIcon: "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
		invalidIcon: "/content/dam/waters/en/brand-assets/icons/attention.svg",
		signInIcon: "/content/dam/waters/en/brand-assets/icons/user.svg"
	},
	fields: [
		{
			type: "email",
			name: "email",
			label: "Email Address}",
			validation: {
				required: true,
				requiredMsg: "Please enter a valid email address.",
				validateFnName: "email",
				validationMsg: "Please enter a valid email address."
			}
		},
		{
			type: "captcha",
			name: "captcha",
			siteKey: "6Ld5WMIUAAAAACZQvEc7I75aEg5AC8YUUO0W7zRG",
			validation: {
				required: true
			}
		}
	]
}

export const personalConfig = {
    submitEndpoint: "https://test-www.waters.com:8443/api/waters/user/v1/update/profile",
    buttonText: "Save Changes",
    cancelText: "Cancel",
    icons: {
        checkmarkIcon: "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
        validIcon: "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
        invalidIcon: "/content/dam/waters/en/brand-assets/icons/attention.svg",
        lockIcon: "/content/dam/waters/en/brand-assets/icons/lock.svg"
    },
    fields: [
        {
            type: "text",
            name: "firstName",
            label: "First Name",
            validation: {
                required: true,
                validateFnName: "noWhitespaceOnly",
                validationMsg: "Please enter a valid first name.",
                requiredMsg: "Please enter a first name."
            }
        },
        {
            type: "text",
            name: "lastName",
            label: "Last Name",
            validation: {
                required: true,
                validateFnName: "noWhitespaceOnly",
                validationMsg: "Please enter a valid last name.",
                requiredMsg: "Please enter a last name."
            }
        },
        {
            type: "text",
            name: "company",
            label: "Company",
            validation: {
                validateFnName: "noWhitespaceOnly",
                validationMsg: "Please enter a valid company name.",
                required: true,
                requiredMsg: "Please enter a company name."
            }
        },
        {
            type: "email",
            name: "email",
            disabled: true,
            label: "Email Address",
            validation: {
                required: true,
                requiredMsg: "Please enter a valid email address."
            }
        },
        {
            type: "text",
            name: "phone",
            label: "Phone Number",
            validation: {
               required: false
            }
        },
        {

            type: "dropdown",
            name: "country",
            label: "Country",
            placeholder: "Select...",
            dropdownIndicator: "/content/dam/waters/en/brand-assets/icons/down.svg",
            options: [{countryCode:"gb",displayName:"United Kingdom"},{countryCode:"us",displayName:"United States"}],
            "disabled": true,
            validation: {
                required: true,
                requiredMsg: "Please select your country."
            }
        },
        {
            "type": "checkbox",
            "name": "communications",
            label: "I want to receive communications from Waters.",
            validation: {
               required: true
            }
        }
    ]
}

export const currentPasswordConfig =  {
    type: "password",
    name: "currentPassword",
    label: "Enter Current Password",
    hasMatch: false,
    validation: {
        required: true,
        requiredMsg: "Please enter current password."
    }
}

export const signInConfig =
{
    "submitEndpoint": "https://test-www.waters.com:8443/api/waters/user/v1/login",
    "siteKey": "6Ld5WMIUAAAAACZQvEc7I75aEg5AC8YUUO0W7zRG",
    "formName": "signin",
    "buttonText": "SIGN IN",
    "icons": {
        "checkmarkIcon": "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
        "validIcon": "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
        "invalidIcon": "/content/dam/waters/en/brand-assets/icons/attention.svg",
        "eyeIcon": "/content/dam/waters/en/brand-assets/icons/eye.svg",
        "eyeOffIcon": "/content/dam/waters/en/brand-assets/icons/eye-off.svg",
        "signInIcon": "/content/dam/waters/en/brand-assets/icons/user.svg"
    },
    "fields": [
        {
            "type": "email",
            "name": "email",
            "label": "Email Address",
            "validation": {
                "required": true,
                "validateFnName": "email",
                "requiredMsg": "Please enter a valid email address.",
                "validationMsg": "Please enter a valid email address."
            }
        },
        {
            "type": "password",
            "name": "password",
            "label": "Password",
            "validation": {
                "required": true,
                "validateFnName": "noValidation",
                "requiredMsg": ""
            }
        },
        {
            "type": "link",
            "name": "forgotPassword",
            "text": "Having trouble signing in?",
            "link": "/nextgen/be.html"
        }
    ]
};


export const resetPasswordConfig = {
    submitEndpoint: "${resetPassword.changePasswordUrl @ context='unsafe'}",
    buttonText: "Reset Password",
    redirectUrl: "${resetPassword.redirectLink.href @ context='unsafe'}",
    icons: {
        checkmarkIcon: "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
        validIcon: "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
        invalidIcon: "/content/dam/waters/en/brand-assets/icons/attention.svg",
        eyeIcon: "/content/dam/waters/en/brand-assets/icons/eye.svg",
        eyeOffIcon: "/content/dam/waters/en/brand-assets/icons/eye-off.svg",
        signInIcon: "/content/dam/waters/en/brand-assets/icons/user.svg"
    },
    fields: [
        {
            type: "body",
            name: "details",
            text: "You are resetting the password for the account associated with the email address",
            additionalText: {
                query: "email"
            }
        },
        {
            type: "password",
            name: "password",
            label: "Create Password",
            hasMatch: true,
            matchLabel: "Confirm Password",
            validation: {
                required: true,
                validateFnName: "password",
                validationMsg: "Please enter a valid password.",
                requiredMsg: "Please enter a password.",
                nonMatchingMsg: "Passwords must match. Please try again.",
                requirementsLabel: "Your password must include",
                requirements: [
                    {name: "shortPassword", msg: "at least 8 characters"},
                    {name: "noUppercase", msg: "at least 1 uppercase letter"},
                    {name: "noLowercase", msg: "at least 1 lowercase letter"},
                    {name: "noDigits", msg: "at least 1 number"},
                    {name: "noSpecial", msg: "at least 1 symbol (for example, !, $, #, %)"}
                ]
            }
        }
    ]
};
