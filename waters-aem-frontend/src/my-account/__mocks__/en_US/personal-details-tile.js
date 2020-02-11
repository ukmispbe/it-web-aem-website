export default {
    "name": "personal-details-tile",
    "type": "personal",
    "title": "Personal Details",
    "fetchEndPoint": "https://test-www.waters.com:8443/api/waters/user/v1/details?email={email}",
    "canCreate": false,
    "editText": "Edit",
    "formMessage": {
      "text": "Your email is your username and cannot be changed. If you need to change your country, please ",
      "linkText": "Contact Waters.",
      "linkURL": "https://www.waters.com/waters/localeRedirect.htm?type=contact_us"
    },
    "form": {
      "submitEndpoint": "https://test-www.waters.com:8443/api/waters/user/v1/update/profile",
      "buttonText": "Save Changes",
      "cancelText": "Cancel",
      "icons": {
        "checkmarkIcon": "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
        "validIcon": "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
        "invalidIcon": "/content/dam/waters/en/brand-assets/icons/attention.svg",
        "lockIcon": "/content/dam/waters/en/brand-assets/icons/lock.svg"
      },
      "fields": [
        {
          "type": "text",
          "name": "firstName",
          "label": "First Name",
          "validation": {
            "required": true,
            "maxLength": {
              "value": 40,
              "message": "Maximum 40 characters allowed"
            },
            "validateFnName": "noWhitespaceOnly",
            "validationMsg": "Please enter a valid first name.",
            "requiredMsg": "Please enter a first name."
          }
        },
        {
          "type": "text",
          "name": "lastName",
          "label": "Last Name",
          "validation": {
            "required": true,
            "maxLength": {
              "value": 40,
              "message": "Maximum 40 characters allowed"
            },
            "validateFnName": "noWhitespaceOnly",
            "validationMsg": "Please enter a valid last name.",
            "requiredMsg": "Please enter a last name."
          }
        },
        {
          "type": "text",
          "name": "company",
          "label": "Company",
          "validation": {
            "validateFnName": "noWhitespaceOnly",
            "maxLength": {
              "value": 40,
              "message": "Maximum 40 characters allowed"
            },
            "validationMsg": "Please enter a valid company.",
            "required": true,
            "requiredMsg": "Please enter a company."
          }
        },
        {
          "type": "email",
          "name": "email",
          "disabled": true,
          "label": "Email Address",
          "validation": {
            "required": true,
            "requiredMsg": "Please enter a valid email address."
          }
        },
        {
          "type": "text",
          "name": "phone",
          "label": "Phone Number",
          "validation": {
            "required": false,
            "requiredMsg": "Please enter a phone number."
          }
        },
        {
          "type": "dropdown",
          "name": "country",
          "label": "Country",
          "placeholder": "Select...",
          "options": [
            {
              "countryCode": "af",
              "displayName": "Afghanistan"
            },
            {
              "countryCode": "al",
              "displayName": "Albania"
            },
            {
              "countryCode": "dz",
              "displayName": "Algeria"
            },
            {
              "countryCode": "as",
              "displayName": "American Samoa"
            },
            {
              "countryCode": "ad",
              "displayName": "Andorra"
            },
            {
              "countryCode": "ao",
              "displayName": "Angola"
            },
            {
              "countryCode": "ai",
              "displayName": "Anguilla"
            },
            {
              "countryCode": "aq",
              "displayName": "Antarctica"
            },
            {
              "countryCode": "ag",
              "displayName": "Antigua and Barbuda"
            },
            {
              "countryCode": "ar",
              "displayName": "Argentina"
            },
            {
              "countryCode": "am",
              "displayName": "Armenia"
            },
            {
              "countryCode": "aw",
              "displayName": "Aruba"
            },
            {
              "countryCode": "au",
              "displayName": "Australia"
            },
            {
              "countryCode": "at",
              "displayName": "Austria"
            },
            {
              "countryCode": "az",
              "displayName": "Azerbaijan"
            },
            {
              "countryCode": "bs",
              "displayName": "Bahamas"
            },
            {
              "countryCode": "bh",
              "displayName": "Bahrain"
            },
            {
              "countryCode": "bd",
              "displayName": "Bangladesh"
            },
            {
              "countryCode": "bb",
              "displayName": "Barbados"
            },
            {
              "countryCode": "by",
              "displayName": "Belarus"
            },
            {
              "countryCode": "be",
              "displayName": "Belgium"
            },
            {
              "countryCode": "bz",
              "displayName": "Belize"
            },
            {
              "countryCode": "bj",
              "displayName": "Benin"
            },
            {
              "countryCode": "bm",
              "displayName": "Bermuda"
            },
            {
              "countryCode": "bt",
              "displayName": "Bhutan"
            },
            {
              "countryCode": "bo",
              "displayName": "Bolivia"
            },
            {
              "countryCode": "bq",
              "displayName": "Bonaire, Sint Eustatius and Saba"
            },
            {
              "countryCode": "ba",
              "displayName": "Bosnia and Herzegovina"
            },
            {
              "countryCode": "bw",
              "displayName": "Botswana"
            },
            {
              "countryCode": "bv",
              "displayName": "Bouvet Island"
            },
            {
              "countryCode": "br",
              "displayName": "Brazil"
            },
            {
              "countryCode": "io",
              "displayName": "British Indian Ocean Territory"
            },
            {
              "countryCode": "vg",
              "displayName": "British Virgin Islands"
            },
            {
              "countryCode": "bn",
              "displayName": "Brunei"
            },
            {
              "countryCode": "bg",
              "displayName": "Bulgaria"
            },
            {
              "countryCode": "bf",
              "displayName": "Burkina Faso"
            },
            {
              "countryCode": "bi",
              "displayName": "Burundi"
            },
            {
              "countryCode": "kh",
              "displayName": "Cambodia"
            },
            {
              "countryCode": "cm",
              "displayName": "Cameroon"
            },
            {
              "countryCode": "ca",
              "displayName": "Canada"
            },
            {
              "countryCode": "cv",
              "displayName": "Cape Verde"
            },
            {
              "countryCode": "ky",
              "displayName": "Cayman Islands"
            },
            {
              "countryCode": "cf",
              "displayName": "Central African Republic"
            },
            {
              "countryCode": "td",
              "displayName": "Chad"
            },
            {
              "countryCode": "cl",
              "displayName": "Chile"
            },
            {
              "countryCode": "cn",
              "displayName": "China"
            },
            {
              "countryCode": "cx",
              "displayName": "Christmas Island"
            },
            {
              "countryCode": "cc",
              "displayName": "Cocos Islands"
            },
            {
              "countryCode": "co",
              "displayName": "Colombia"
            },
            {
              "countryCode": "km",
              "displayName": "Comoros"
            },
            {
              "countryCode": "cg",
              "displayName": "Congo"
            },
            {
              "countryCode": "ck",
              "displayName": "Cook Islands"
            },
            {
              "countryCode": "cr",
              "displayName": "Costa Rica"
            },
            {
              "countryCode": "hr",
              "displayName": "Croatia"
            },
            {
              "countryCode": "cu",
              "displayName": "Cuba"
            },
            {
              "countryCode": "cw",
              "displayName": "Curaçao"
            },
            {
              "countryCode": "cy",
              "displayName": "Cyprus"
            },
            {
              "countryCode": "cz",
              "displayName": "Czech Republic"
            },
            {
              "countryCode": "ci",
              "displayName": "Côte d'Ivoire"
            },
            {
              "countryCode": "dk",
              "displayName": "Denmark"
            },
            {
              "countryCode": "dj",
              "displayName": "Djibouti"
            },
            {
              "countryCode": "dm",
              "displayName": "Dominica"
            },
            {
              "countryCode": "do",
              "displayName": "Dominican Republic"
            },
            {
              "countryCode": "ec",
              "displayName": "Ecuador"
            },
            {
              "countryCode": "eg",
              "displayName": "Egypt"
            },
            {
              "countryCode": "sv",
              "displayName": "El Salvador"
            },
            {
              "countryCode": "gq",
              "displayName": "Equatorial Guinea"
            },
            {
              "countryCode": "er",
              "displayName": "Eritrea"
            },
            {
              "countryCode": "ee",
              "displayName": "Estonia"
            },
            {
              "countryCode": "et",
              "displayName": "Ethiopia"
            },
            {
              "countryCode": "fk",
              "displayName": "Falkland Islands"
            },
            {
              "countryCode": "fo",
              "displayName": "Faroe Islands"
            },
            {
              "countryCode": "fj",
              "displayName": "Fiji"
            },
            {
              "countryCode": "fi",
              "displayName": "Finland"
            },
            {
              "countryCode": "fr",
              "displayName": "France"
            },
            {
              "countryCode": "gf",
              "displayName": "French Guiana"
            },
            {
              "countryCode": "pf",
              "displayName": "French Polynesia"
            },
            {
              "countryCode": "tf",
              "displayName": "French Southern Territories"
            },
            {
              "countryCode": "ga",
              "displayName": "Gabon"
            },
            {
              "countryCode": "gm",
              "displayName": "Gambia"
            },
            {
              "countryCode": "ge",
              "displayName": "Georgia"
            },
            {
              "countryCode": "de",
              "displayName": "Germany"
            },
            {
              "countryCode": "gh",
              "displayName": "Ghana"
            },
            {
              "countryCode": "gi",
              "displayName": "Gibraltar"
            },
            {
              "countryCode": "gr",
              "displayName": "Greece"
            },
            {
              "countryCode": "gl",
              "displayName": "Greenland"
            },
            {
              "countryCode": "gd",
              "displayName": "Grenada"
            },
            {
              "countryCode": "gp",
              "displayName": "Guadeloupe"
            },
            {
              "countryCode": "gu",
              "displayName": "Guam"
            },
            {
              "countryCode": "gt",
              "displayName": "Guatemala"
            },
            {
              "countryCode": "gg",
              "displayName": "Guernsey"
            },
            {
              "countryCode": "gn",
              "displayName": "Guinea"
            },
            {
              "countryCode": "gw",
              "displayName": "Guinea-Bissau"
            },
            {
              "countryCode": "gy",
              "displayName": "Guyana"
            },
            {
              "countryCode": "ht",
              "displayName": "Haiti"
            },
            {
              "countryCode": "hm",
              "displayName": "Heard Island And McDonald Islands"
            },
            {
              "countryCode": "hn",
              "displayName": "Honduras"
            },
            {
              "countryCode": "hk",
              "displayName": "Hong Kong"
            },
            {
              "countryCode": "hu",
              "displayName": "Hungary"
            },
            {
              "countryCode": "is",
              "displayName": "Iceland"
            },
            {
              "countryCode": "in",
              "displayName": "India"
            },
            {
              "countryCode": "id",
              "displayName": "Indonesia"
            },
            {
              "countryCode": "ir",
              "displayName": "Iran"
            },
            {
              "countryCode": "iq",
              "displayName": "Iraq"
            },
            {
              "countryCode": "ie",
              "displayName": "Ireland"
            },
            {
              "countryCode": "im",
              "displayName": "Isle Of Man"
            },
            {
              "countryCode": "il",
              "displayName": "Israel"
            },
            {
              "countryCode": "it",
              "displayName": "Italy"
            },
            {
              "countryCode": "jm",
              "displayName": "Jamaica"
            },
            {
              "countryCode": "jp",
              "displayName": "Japan"
            },
            {
              "countryCode": "je",
              "displayName": "Jersey"
            },
            {
              "countryCode": "jo",
              "displayName": "Jordan"
            },
            {
              "countryCode": "kz",
              "displayName": "Kazakhstan"
            },
            {
              "countryCode": "ke",
              "displayName": "Kenya"
            },
            {
              "countryCode": "ki",
              "displayName": "Kiribati"
            },
            {
              "countryCode": "kw",
              "displayName": "Kuwait"
            },
            {
              "countryCode": "kg",
              "displayName": "Kyrgyzstan"
            },
            {
              "countryCode": "la",
              "displayName": "Laos"
            },
            {
              "countryCode": "lv",
              "displayName": "Latvia"
            },
            {
              "countryCode": "lb",
              "displayName": "Lebanon"
            },
            {
              "countryCode": "ls",
              "displayName": "Lesotho"
            },
            {
              "countryCode": "lr",
              "displayName": "Liberia"
            },
            {
              "countryCode": "ly",
              "displayName": "Libya"
            },
            {
              "countryCode": "li",
              "displayName": "Liechtenstein"
            },
            {
              "countryCode": "lt",
              "displayName": "Lithuania"
            },
            {
              "countryCode": "lu",
              "displayName": "Luxembourg"
            },
            {
              "countryCode": "mo",
              "displayName": "Macao"
            },
            {
              "countryCode": "mk",
              "displayName": "Macedonia"
            },
            {
              "countryCode": "mg",
              "displayName": "Madagascar"
            },
            {
              "countryCode": "mw",
              "displayName": "Malawi"
            },
            {
              "countryCode": "my",
              "displayName": "Malaysia"
            },
            {
              "countryCode": "mv",
              "displayName": "Maldives"
            },
            {
              "countryCode": "ml",
              "displayName": "Mali"
            },
            {
              "countryCode": "mt",
              "displayName": "Malta"
            },
            {
              "countryCode": "mh",
              "displayName": "Marshall Islands"
            },
            {
              "countryCode": "mq",
              "displayName": "Martinique"
            },
            {
              "countryCode": "mr",
              "displayName": "Mauritania"
            },
            {
              "countryCode": "mu",
              "displayName": "Mauritius"
            },
            {
              "countryCode": "yt",
              "displayName": "Mayotte"
            },
            {
              "countryCode": "mx",
              "displayName": "Mexico"
            },
            {
              "countryCode": "fm",
              "displayName": "Micronesia"
            },
            {
              "countryCode": "md",
              "displayName": "Moldova"
            },
            {
              "countryCode": "mc",
              "displayName": "Monaco"
            },
            {
              "countryCode": "mn",
              "displayName": "Mongolia"
            },
            {
              "countryCode": "me",
              "displayName": "Montenegro"
            },
            {
              "countryCode": "ms",
              "displayName": "Montserrat"
            },
            {
              "countryCode": "ma",
              "displayName": "Morocco"
            },
            {
              "countryCode": "mz",
              "displayName": "Mozambique"
            },
            {
              "countryCode": "mm",
              "displayName": "Myanmar"
            },
            {
              "countryCode": "na",
              "displayName": "Namibia"
            },
            {
              "countryCode": "nr",
              "displayName": "Nauru"
            },
            {
              "countryCode": "np",
              "displayName": "Nepal"
            },
            {
              "countryCode": "nl",
              "displayName": "Netherlands"
            },
            {
              "countryCode": "an",
              "displayName": "Netherlands Antilles"
            },
            {
              "countryCode": "nc",
              "displayName": "New Caledonia"
            },
            {
              "countryCode": "nz",
              "displayName": "New Zealand"
            },
            {
              "countryCode": "ni",
              "displayName": "Nicaragua"
            },
            {
              "countryCode": "ne",
              "displayName": "Niger"
            },
            {
              "countryCode": "ng",
              "displayName": "Nigeria"
            },
            {
              "countryCode": "nu",
              "displayName": "Niue"
            },
            {
              "countryCode": "nf",
              "displayName": "Norfolk Island"
            },
            {
              "countryCode": "kp",
              "displayName": "North Korea"
            },
            {
              "countryCode": "mp",
              "displayName": "Northern Mariana Islands"
            },
            {
              "countryCode": "no",
              "displayName": "Norway"
            },
            {
              "countryCode": "om",
              "displayName": "Oman"
            },
            {
              "countryCode": "pk",
              "displayName": "Pakistan"
            },
            {
              "countryCode": "pw",
              "displayName": "Palau"
            },
            {
              "countryCode": "ps",
              "displayName": "Palestine"
            },
            {
              "countryCode": "pa",
              "displayName": "Panama"
            },
            {
              "countryCode": "pg",
              "displayName": "Papua New Guinea"
            },
            {
              "countryCode": "py",
              "displayName": "Paraguay"
            },
            {
              "countryCode": "pe",
              "displayName": "Peru"
            },
            {
              "countryCode": "ph",
              "displayName": "Philippines"
            },
            {
              "countryCode": "pn",
              "displayName": "Pitcairn"
            },
            {
              "countryCode": "pl",
              "displayName": "Poland"
            },
            {
              "countryCode": "pt",
              "displayName": "Portugal"
            },
            {
              "countryCode": "pr",
              "displayName": "Puerto Rico"
            },
            {
              "countryCode": "qa",
              "displayName": "Qatar"
            },
            {
              "countryCode": "re",
              "displayName": "Reunion"
            },
            {
              "countryCode": "ro",
              "displayName": "Romania"
            },
            {
              "countryCode": "ru",
              "displayName": "Russia"
            },
            {
              "countryCode": "rw",
              "displayName": "Rwanda"
            },
            {
              "countryCode": "bl",
              "displayName": "Saint Barthélemy"
            },
            {
              "countryCode": "sh",
              "displayName": "Saint Helena"
            },
            {
              "countryCode": "kn",
              "displayName": "Saint Kitts And Nevis"
            },
            {
              "countryCode": "lc",
              "displayName": "Saint Lucia"
            },
            {
              "countryCode": "mf",
              "displayName": "Saint Martin"
            },
            {
              "countryCode": "pm",
              "displayName": "Saint Pierre And Miquelon"
            },
            {
              "countryCode": "vc",
              "displayName": "Saint Vincent And The Grenadines"
            },
            {
              "countryCode": "ws",
              "displayName": "Samoa"
            },
            {
              "countryCode": "sm",
              "displayName": "San Marino"
            },
            {
              "countryCode": "st",
              "displayName": "Sao Tome And Principe"
            },
            {
              "countryCode": "sa",
              "displayName": "Saudi Arabia"
            },
            {
              "countryCode": "sn",
              "displayName": "Senegal"
            },
            {
              "countryCode": "rs",
              "displayName": "Serbia"
            },
            {
              "countryCode": "sc",
              "displayName": "Seychelles"
            },
            {
              "countryCode": "sl",
              "displayName": "Sierra Leone"
            },
            {
              "countryCode": "sg",
              "displayName": "Singapore"
            },
            {
              "countryCode": "sx",
              "displayName": "Sint Maarten (Dutch part)"
            },
            {
              "countryCode": "sk",
              "displayName": "Slovakia"
            },
            {
              "countryCode": "si",
              "displayName": "Slovenia"
            },
            {
              "countryCode": "sb",
              "displayName": "Solomon Islands"
            },
            {
              "countryCode": "so",
              "displayName": "Somalia"
            },
            {
              "countryCode": "za",
              "displayName": "South Africa"
            },
            {
              "countryCode": "gs",
              "displayName": "South Georgia And The South Sandwich Islands"
            },
            {
              "countryCode": "kr",
              "displayName": "South Korea"
            },
            {
              "countryCode": "ss",
              "displayName": "South Sudan"
            },
            {
              "countryCode": "es",
              "displayName": "Spain"
            },
            {
              "countryCode": "lk",
              "displayName": "Sri Lanka"
            },
            {
              "countryCode": "sd",
              "displayName": "Sudan"
            },
            {
              "countryCode": "sr",
              "displayName": "Suriname"
            },
            {
              "countryCode": "sj",
              "displayName": "Svalbard And Jan Mayen"
            },
            {
              "countryCode": "sz",
              "displayName": "Swaziland"
            },
            {
              "countryCode": "se",
              "displayName": "Sweden"
            },
            {
              "countryCode": "ch",
              "displayName": "Switzerland"
            },
            {
              "countryCode": "sy",
              "displayName": "Syria"
            },
            {
              "countryCode": "tw",
              "displayName": "Taiwan"
            },
            {
              "countryCode": "tj",
              "displayName": "Tajikistan"
            },
            {
              "countryCode": "tz",
              "displayName": "Tanzania"
            },
            {
              "countryCode": "th",
              "displayName": "Thailand"
            },
            {
              "countryCode": "cd",
              "displayName": "The Democratic Republic Of Congo"
            },
            {
              "countryCode": "tl",
              "displayName": "Timor-Leste"
            },
            {
              "countryCode": "tg",
              "displayName": "Togo"
            },
            {
              "countryCode": "tk",
              "displayName": "Tokelau"
            },
            {
              "countryCode": "to",
              "displayName": "Tonga"
            },
            {
              "countryCode": "tt",
              "displayName": "Trinidad and Tobago"
            },
            {
              "countryCode": "tn",
              "displayName": "Tunisia"
            },
            {
              "countryCode": "tr",
              "displayName": "Turkey"
            },
            {
              "countryCode": "tm",
              "displayName": "Turkmenistan"
            },
            {
              "countryCode": "tc",
              "displayName": "Turks And Caicos Islands"
            },
            {
              "countryCode": "tv",
              "displayName": "Tuvalu"
            },
            {
              "countryCode": "vi",
              "displayName": "U.S. Virgin Islands"
            },
            {
              "countryCode": "ug",
              "displayName": "Uganda"
            },
            {
              "countryCode": "ua",
              "displayName": "Ukraine"
            },
            {
              "countryCode": "ae",
              "displayName": "United Arab Emirates"
            },
            {
              "countryCode": "gb",
              "displayName": "United Kingdom"
            },
            {
              "countryCode": "us",
              "displayName": "United States"
            },
            {
              "countryCode": "um",
              "displayName": "United States Minor Outlying Islands"
            },
            {
              "countryCode": "uy",
              "displayName": "Uruguay"
            },
            {
              "countryCode": "uz",
              "displayName": "Uzbekistan"
            },
            {
              "countryCode": "vu",
              "displayName": "Vanuatu"
            },
            {
              "countryCode": "va",
              "displayName": "Vatican"
            },
            {
              "countryCode": "ve",
              "displayName": "Venezuela"
            },
            {
              "countryCode": "vn",
              "displayName": "Vietnam"
            },
            {
              "countryCode": "wf",
              "displayName": "Wallis And Futuna"
            },
            {
              "countryCode": "eh",
              "displayName": "Western Sahara"
            },
            {
              "countryCode": "ye",
              "displayName": "Yemen"
            },
            {
              "countryCode": "zm",
              "displayName": "Zambia"
            },
            {
              "countryCode": "zw",
              "displayName": "Zimbabwe"
            },
            {
              "countryCode": "ax",
              "displayName": "Åland Islands"
            }
          ],
          "disabled": true,
          "validation": {
            "required": true,
            "requiredMsg": "Please select your country."
          }
        },
        {
          "type": "checkbox",
          "name": "communications",
          "label": "I want to receive communications from Waters."
        }
      ]
    },
    "icons": {
      "edit": "/content/dam/waters/en/brand-assets/icons/edit.svg"
    }
  };