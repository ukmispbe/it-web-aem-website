export default {
    "name": "changePassword-details-tile",
    "type": "password",
    "title": "Change Password",
    "editText": "Edit",
    "canCreate": false,
    "form": {
        "submitEndpoint": "https://test-www.waters.com:8443/api/waters/user/v1/update/password",
        "buttonText": "Change Password",
        "cancelText": "Cancel",
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
                "type": "password",
                "name": "currentPassword",
                "label": "Enter Current Password",
                "hasMatch": false,
                "validation": {
                    "required": true,
                    "requiredMsg": "Please enter current password."
                }
            },
            {
                "type": "password",
                "name": "newPassword",
                "label": "Create New Password",
                "hasMatch": true,
                "matchLabel": "Confirm New Password",
                "validation": {
                    "required": true,
                    "validateFnName": "password",
                    "validationMsg": "Please enter a valid password.",
                    "requiredMsg": "Please enter a password.",
                    "requiredMatchMsg": "Please confirm your password.",
                    "nonMatchingMsg": "Passwords must match. Please try again.",
                    "requirementsLabel": "Your password must include",
                    "requirements": [
                        {
                            "name": "shortPassword",
                            "msg": "at least 8 characters"
                        },
                        {
                            "name": "noUppercase",
                            "msg": "at least 1 uppercase letter"
                        },
                        {
                            "name": "noLowercase",
                            "msg": "at least 1 lowercase letter"
                        },
                        {
                            "name": "noDigits",
                            "msg": "at least 1 number"
                        },
                        {
                            "name": "noSpecial",
                            "msg": "at least 1 symbol (for example, !, $, #, %)"
                        }
                    ]
                }
            }
        ]
    },
    "icons": {
        "edit": "/content/dam/waters/en/brand-assets/icons/edit.svg"
    }
}