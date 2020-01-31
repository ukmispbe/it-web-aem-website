export default {
    "formMessage": {
      "text": "It may take up to 24 hours to verify a new or change of address. Orders may be delayed."
    },
    "editText": "Edit",
    "form": {
      "buttonText": "Save Changes",
      "cancelText": "Cancel",
      "icons": {
        "validIcon": "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
        "invalidIcon": "/content/dam/waters/en/brand-assets/icons/attention.svg"
      },
      "fields": [
        {
          "type": "text",
          "name": "company",
          "label": "Company",
          "validation": {
            "validateFnName": "noWhitespaceOnly",
            "validationMsg": "Please enter a valid company.",
            "required": true,
            "requiredMsg": "Please enter a company."
          }
        },
        {
          "type": "text",
          "name": "street",
          "label": "Address",
          "validation": {
            "validateFnName": "noWhitespaceOnly",
            "validationMsg": "Please enter a valid address.",
            "required": true,
            "requiredMsg": "Please enter an address."
          }
        },
        {
          "type": "text",
          "name": "city",
          "label": "City",
          "validation": {
            "validateFnName": "noWhitespaceOnly",
            "validationMsg": "Please enter a valid city.",
            "required": true,
            "requiredMsg": "Please enter a city."
          }
        },
        {
          "type": "dropdown",
          "name": "state",
          "label": "State/Province/Region",
          "placeholder": "Select...",
          "dropdownIndicator": "/content/dam/waters/en/brand-assets/icons/down.svg",
          "options": [
            
          ],
          "validation": {
            "required": true,
            "requiredMsg": "Please select your region."
          }
        },
        {
          "type": "text",
          "name": "zip",
          "label": "Zip/Postal Code",
          "validation": {
            "validateFnName": "noWhitespaceOnly",
            "validationMsg": "Please enter a valid postal code.",
            "required": true,
            "requiredMsg": "Please enter a postal code."
          }
        },
        {
          "type": "dropdown",
          "name": "country",
          "label": "Country",
          "placeholder": "Select...",
          "dropdownIndicator": "/content/dam/waters/en/brand-assets/icons/down.svg",
          "options": [
            
          ],
          "validation": {
            "required": true,
            "requiredMsg": "Please select your country."
          }
        }
      ]
    },
    "canCreate": true,
    "icons": {
      "edit": "/content/dam/waters/en/brand-assets/icons/edit.svg",
      "add": "/content/dam/waters/en/brand-assets/icons/add.svg",
      "refresh": "/content/dam/waters/en/brand-assets/icons/refresh.svg"
    }
  }