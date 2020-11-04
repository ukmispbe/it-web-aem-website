const myAccountJSON = {
	configId: "cmp-my-account",
	html: {
		title: "My Account",
		body: "Find all the resources and tools you need to manage your Waters account online. ",
		tiles: [{
				title: "Account Information",
				icon: "/content/dam/waters/en/brand-assets/icons/user.svg",
				requiresEcommerce: "false",
				isHiddenForEprocUser: "false",
				links: [{
						text: "Profile",
						url: "#profile",
						linkName: "Profile",
					},
					{
						text: "Password",
						url: "#changepassword",
						linkName: "Password",
					},
				],
			},
			{
				title: "Orders and Quotes",
				icon: "/content/dam/waters/en/brand-assets/icons/package.svg",
				requiresEcommerce: "true",
				isHiddenForEprocUser: "true",
				links: [{
						text: "Order History",
						url: "#orderhistory",
						linkName: "Order History",
					},
					{
						text: "Order History",
						url: "#orderdetails",
						isHidden: "true",
					},
					{
						text: "Quote History",
						url: "#quotehistory",
						linkName: "Quote History",
					},
					{
						text: "Quote History",
						url: "#quotedetails",
						isHidden: "true",
					}
				],
			},
			{
				title: "Additional Links",
				icon: "/content/dam/waters/en/brand-assets/icons/link.svg",
				requiresEcommerce: "false",
				isHiddenForEprocUser: "false",
				links: [{
						text: "My Implementations",
						url: "https://www.waters.com/waters/nav.htm?cid=2243096",
					},
					{
						text: "Support Plans",
						url: "https://www.waters.com/waters/nav.htm?cid=2243124",
					},
					{
						text: "Contact Waters",
						url: "https://www.waters.com/waters/localeRedirect.htm?type=contact_us",
					},
				],
			},
		],
		breadcrumbs: {
			routes: {
				myAccount: {
					title: "My Account",
					backLinkTitle: "Back to My Account",
				},
				profile: {
					title: "Profile",
				},
				changePassword: {
					title: "Change Password",
				},
				orderHistory: {
					title: "Order History",
					backLinkTitle: "Back to Order History",
				},
				quoteHistory: {
					title: "Quote History",
					backLinkTitle: "Back to Quote History",
				}
			},
			backIcon: "/content/dam/waters/en/brand-assets/icons/left.svg",
		},
		myProfile: {
			userDetailsUrl: "https://devservices.waters.com:8443/api/waters/user/v1/details",
			soldToDetailsUrl: "https://api-sbox.waters.com/dev-waters-user-exp-api-v1/api/users",
			submitEndpoint: "https://devservices.waters.com:8443/api/waters/user/v1/update/profile",
			personalConfigId: "json-config--cmp-detail-tiles--personal",
			addressConfig: {
				abstractConfig: "json-config--cmp-detail-tiles--address",
				configs: [
					"json-config--cmp-detail-tiles--shipping",
					"json-config--cmp-detail-tiles--billing",
				],
			},
		},
		changePassword: {
			config: "json-config--cmp-detail-tiles--changePassword",
		},
		orderHistory: {
			fetchEndPoint: "https://devservices.waters.com:8443/api/waters/order/v1/list",
			title: "Order History",
			resultsText: "Showing {startResults}-{endResults} of {count} Orders",
			noResultsFoundTitle: "Sorry, no orders found.",
			noResultsFoundText: "Check back after you shop on Waters.com for order information and shipment tracking.",
			shopAllTitle: "Shop All Products",
			shopAllHref: "/content/waters/us/en/shop/shop-all-products.html",
			orderText: "Order Number: ",
			itemsText: " Items",
			shipment: {
				shipmentText: "Shipment",
				trackShipmentText: "Track Shipment",
				openLabel: "In Progress",
				partialLabel: "Partially Shipped",
				completeLabel: "Shipped",
				completeShippedLabel: "Shipped on ",
			},
			icons: {
				openIcon: "/content/dam/waters/en/brand-assets/icons/refresh.svg",
				partialIcon: "/content/dam/waters/en/brand-assets/icons/success.svg",
				completeIcon: "/content/dam/waters/en/brand-assets/icons/success.svg",
			},
			tabs: [{
				name: "All Orders"
			}, {
				name: "Open Orders"
			}],
			dropdownfilters: {
				all: "All Orders",
				open: "Open Orders",
				downIcon: "/content/dam/waters/en/brand-assets/icons/down.svg",
			},
			timeperiod: {
				last30days: "Last 30 Days",
				last6months: "Last 6 Months",
				last12months: "Last 12 Months",
				showall: "Show All",
				downIcon: "/content/dam/waters/en/brand-assets/icons/down.svg",
			},
		},
		orderDetails: {
			fetchDetailsEndPoint: "https://devservices.waters.com:8443/api/waters/order/v1/details",
			fetchItemsEndPoint: "https://devservices.waters.com:8443/api/waters/search",
			orderHistory: "Order History",
			orderDetails: "Order Details",
			resultsText: "Showing {startResults}-{endResults} of {count} Shipments",
			resultNotFoundErrorTitle: "Sorry, order not found.",
			serviceErrorNotificationTitle: "Sorry, something went wrong.",
			serviceErrorNotificationText: "Please try again.",
			serviceErrorNotificationIcon: "/content/dam/waters/en/brand-assets/icons/attention.svg",
			numberLabel: "Order Number",
			shipTo: "Ship to",
			billTo: "Bill to",
			orderSummary: "Order Summary",
			paymentMethod: "Payment Method",
			shipmentMethod: "Shipment Method",
			subTotal: "Subtotal",
			items: "items",
			item: "item",
			shipping: "Shipping and Handling ",
			savings: "Savings",
			tax: "Tax",
			minusSign: "-",
			orderTotal: "Order Total",
			reorderTitle: "Reorder",
			paymentType: {
				purchaseOrder: {
					label: "PO",
					icon: "/content/dam/waters/en/brand-assets/icons/document.svg",
				},
				creditCard: {
					label: "Credit Card",
					icon: "/content/dam/waters/en/brand-assets/icons/creditcard.svg",
				},
			},
			shipment: {
				shipmentText: "Shipment",
				itemsText: "Items",
				itemText: "Item",
				trackShipmentText: "Track Shipment",
				openLabel: "In Progress",
				partialLabel: "Partially Shipped",
				completeLabel: "Shipped",
				completeShippedLabel: "Shipped on ",
			},
			icons: {
				openIcon: "/content/dam/waters/en/brand-assets/icons/refresh.svg",
				partialIcon: "/content/dam/waters/en/brand-assets/icons/success.svg",
				completeIcon: "/content/dam/waters/en/brand-assets/icons/success.svg",
			},
			modalInfo: {
				icon: "/content/dam/waters/en/brand-assets/icons/cart.svg",
				closeIcon: "/content/dam/waters/en/brand-assets/icons/close.svg",
				title: "Reorder all items?",
				isOrderDetails: true,
				buttons: [{
						text: "Continue to Shopping Cart",
						action: "https://wwwdt1.waters.com/waters/shoppingCart.htm",
					},
					{
						text: "Cancel",
						action: "close",
					},
				],
				text: "This order will be added to your Shopping Cart",
			},
		},
		quoteHistory: {
			fetchEndPoint: "https://devservices.waters.com:8443/api/waters/order/v1/list",
			title: "Quote History",
			resultsText: "Showing {startResults}-{endResults} of {count} Quotes",
			noResultsFoundTitle: "Sorry, no quotes found.",
			noResultsFoundText: "Check back after you shop for quote information.",
			shopAllTitle: "Shop All Products",
			shopAllHref: "/content/waters/us/en/shop/shop-all-products.html",
			orderText: "Quote Number: ",
			itemsText: " Items",
			shipment: {
				shipmentText: "Shipment",
				trackShipmentText: "Track Shipment",
				openLabel: "In Progress",
				partialLabel: "Partially Shipped",
				completeLabel: "Shipped",
				completeShippedLabel: "Shipped on ",
				expiredLabel: "Expired",
				orderPlacedLabel: "Order Placed",
			},
			icons: {
				openIcon: "/content/dam/waters/en/brand-assets/icons/refresh.svg",
				partialIcon: "/content/dam/waters/en/brand-assets/icons/success.svg",
				completeIcon: "/content/dam/waters/en/brand-assets/icons/success.svg",
				expiredIcon: "/content/dam/waters/en/brand-assets/icons/close.svg",
				orderPlacedIcon: "/content/dam/waters/en/brand-assets/icons/success.svg",
			},
			tabs: [{
				name: "All Quotes"
			}, {
				name: "Open Quotes"
			},
			{
				name: "Closed Quotes"
			}],
			blankItemTabs:[{name: "All Quotes"}],
			dropdownfilters: {
				all: "All Quotes",
				open: "Open Quotes",
				closed: "Closed Quotes",
				downIcon: "/content/dam/waters/en/brand-assets/icons/down.svg",
			},
			timeperiod: {
				last30days: "Last 30 Days",
				last6months: "Last 6 Months",
				last12months: "Last 12 Months",
				showall: "Show All",
				downIcon: "/content/dam/waters/en/brand-assets/icons/down.svg",
			},
		},
		quoteDetails: {
			fetchDetailsEndPoint: "https://devservices.waters.com:8443/api/waters/order/v1/details",
			fetchItemsEndPoint: "https://devservices.waters.com:8443/api/waters/search",
			quoteHistory: "Quote History",
			orderDetails: "Quote Details",
			resultsText: "Showing {startResults}-{endResults} of {count} Shipments",
			resultNotFoundErrorTitle: "Sorry, Quotes not found.",
			serviceErrorNotificationTitle: "Sorry, something went wrong.",
			serviceErrorNotificationText: "Please try again.",
			serviceErrorNotificationIcon: "/content/dam/waters/en/brand-assets/icons/attention.svg",
			numberLabel: "Quote Number",
			shipTo: "Ship to",
			billTo: "Bill to",
			orderSummary: "Quotes Summary",
			paymentMethod: "Payment Method",
			shipmentMethod: "Shipment Method",
			subTotal: "Subtotal",
			items: "items",
			item: "item",
			shipping: "Shipping and Handling ",
			savings: "Savings",
			tax: "Tax",
			minusSign: "-",
			orderTotal: "Order Total",
			reorderTitle: "Reorder",
			paymentType: {
				purchaseOrder: {
					label: "PO",
					icon: "/content/dam/waters/en/brand-assets/icons/document.svg",
				},
				creditCard: {
					label: "Credit Card",
					icon: "/content/dam/waters/en/brand-assets/icons/creditcard.svg",
				},
			},
			shipment: {
				shipmentText: "Shipment",
				itemsText: "Items",
				itemText: "Item",
				trackShipmentText: "Track Shipment",
				openLabel: "In Progress",
				partialLabel: "Partially Shipped",
				completeLabel: "Shipped",
				completeShippedLabel: "Shipped on ",
				expiredLabel: "Expired",
				orderPlacedLabel: "Order Placed",
			},
			icons: {
				openIcon: "/content/dam/waters/en/brand-assets/icons/refresh.svg",
				partialIcon: "/content/dam/waters/en/brand-assets/icons/success.svg",
				completeIcon: "/content/dam/waters/en/brand-assets/icons/success.svg",
				expiredIcon: "/content/dam/waters/en/brand-assets/icons/close.svg",
				orderPlacedIcon: "/content/dam/waters/en/brand-assets/icons/success.svg",
			},
			modalInfo: {
				icon: "/content/dam/waters/en/brand-assets/icons/cart.svg",
				closeIcon: "/content/dam/waters/en/brand-assets/icons/close.svg",
				title: "Reorder all items?",
				isOrderDetails: true,
				buttons: [{
						text: "Continue to Shopping Cart",
						action: "https://wwwdt1.waters.com/waters/shoppingCart.htm",
					},
					{
						text: "Cancel",
						action: "close",
					},
				],
				text: "This order will be added to your Shopping Cart",
			},
		},
	},
};

const detailTilesPersonalJSON = {
	configId: "json-config--cmp-detail-tiles--personal",
	html: {
		name: "personal-details-tile",
		type: "personal",
		title: "Personal Details",
		userDetailsUrl: "https://devservices.waters.com:8443/api/waters/user/v1/details",
		soldToDetailsUrl: "https://api-sbox.waters.com/dev-waters-user-exp-api-v1/api/users",
		canCreate: true,
		editText: "Edit",
		formMessage: {
			text: "Your email is your username and cannot be changed. If you need to change your country, please ",
			linkText: "Contact Waters.",
			linkURL: "https://www.waters.com/waters/localeRedirect.htm?type=contact_us",
		},
		form: {
			formName: "personaldetails",
			submitEndpoint: "https://devservices.waters.com:8443/api/waters/user/v1/update/profile",
			buttonText: "Save Changes",
			cancelText: "Cancel",
			icons: {
				checkmarkIcon: "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
				validIcon: "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
				invalidIcon: "/content/dam/waters/en/brand-assets/icons/attention.svg",
				lockIcon: "/content/dam/waters/en/brand-assets/icons/lock.svg",
			},
			fields: [{
					type: "label",
					name: "requiredLabel",
					label: "*Required field",
				},
				{
					type: "text",
					name: "firstName",
					label: "First Name",
					validation: {
						required: true,
						maxLength: {
							value: 40,
							message: "Maximum 40 characters allowed",
						},
						validateFnName: "noWhitespaceOnly",
						validationMsg: "Please enter a valid first name.",
						requiredMsg: "Please enter a first name.",
					},
				},
				{
					type: "text",
					name: "lastName",
					label: "Last Name",
					validation: {
						required: true,
						maxLength: {
							value: 40,
							message: "Maximum 40 characters allowed",
						},
						validateFnName: "noWhitespaceOnly",
						validationMsg: "Please enter a valid last name.",
						requiredMsg: "Please enter a last name.",
					},
				},
				{
					type: "text",
					name: "company",
					label: "Company",
					disableForEprocUser: true,
					validation: {
						validateFnName: "noWhitespaceOnly",
						maxLength: {
							value: 40,
							message: "Maximum 40 characters allowed",
						},
						validationMsg: "Please enter a valid company.",
						required: true,
						requiredMsg: "Please enter a company.",
					},
				},
				{
					type: "email",
					name: "email",
					disabled: true,
					label: "Email Address",
					validation: {
						required: true,
						requiredMsg: "",
					},
				},
				{
					type: "text",
					name: "phone",
					label: "Phone Number",
					optionalLabel: "(optional)",
					validation: {
						validateFnName: "blankOrNumbersOnly",
						required: false,
						requiredMsg: "Please enter a phone number (Numbers Only).",
					},
				},
				{
					type: "dropdown",
					name: "country",
					label: "Country",
					placeholder: "Select...",
					options: [{
							countryCode: "af",
							displayName: "Afghanistan"
						},
						{
							countryCode: "al",
							displayName: "Albania"
						},
						{
							countryCode: "dz",
							displayName: "Algeria"
						},
						{
							countryCode: "as",
							displayName: "American Samoa"
						},
						{
							countryCode: "ad",
							displayName: "Andorra"
						},
						{
							countryCode: "ao",
							displayName: "Angola"
						},
						{
							countryCode: "ai",
							displayName: "Anguilla"
						},
						{
							countryCode: "aq",
							displayName: "Antarctica"
						},
						{
							countryCode: "ag",
							displayName: "Antigua & Barbuda"
						},
						{
							countryCode: "ar",
							displayName: "Argentina"
						},
						{
							countryCode: "am",
							displayName: "Armenia"
						},
						{
							countryCode: "aw",
							displayName: "Aruba"
						},
						{
							countryCode: "au",
							displayName: "Australia"
						},
						{
							countryCode: "at",
							displayName: "Austria"
						},
						{
							countryCode: "az",
							displayName: "Azerbaijan"
						},
						{
							countryCode: "bs",
							displayName: "Bahamas"
						},
						{
							countryCode: "bh",
							displayName: "Bahrain"
						},
						{
							countryCode: "bd",
							displayName: "Bangladesh"
						},
						{
							countryCode: "bb",
							displayName: "Barbados"
						},
						{
							countryCode: "by",
							displayName: "Belarus"
						},
						{
							countryCode: "be",
							displayName: "Belgium"
						},
						{
							countryCode: "bz",
							displayName: "Belize"
						},
						{
							countryCode: "bj",
							displayName: "Benin"
						},
						{
							countryCode: "bm",
							displayName: "Bermuda"
						},
						{
							countryCode: "bt",
							displayName: "Bhutan"
						},
						{
							countryCode: "bo",
							displayName: "Bolivia"
						},
						{
							countryCode: "ba",
							displayName: "Bosnia & Herzegovina"
						},
						{
							countryCode: "bw",
							displayName: "Botswana"
						},
						{
							countryCode: "bv",
							displayName: "Bouvet Island"
						},
						{
							countryCode: "br",
							displayName: "Brazil"
						},
						{
							countryCode: "io",
							displayName: "British Indian Ocean Territory",
						},
						{
							countryCode: "vg",
							displayName: "British Virgin Islands"
						},
						{
							countryCode: "bn",
							displayName: "Brunei"
						},
						{
							countryCode: "bg",
							displayName: "Bulgaria"
						},
						{
							countryCode: "bf",
							displayName: "Burkina Faso"
						},
						{
							countryCode: "bi",
							displayName: "Burundi"
						},
						{
							countryCode: "kh",
							displayName: "Cambodia"
						},
						{
							countryCode: "cm",
							displayName: "Cameroon"
						},
						{
							countryCode: "ca",
							displayName: "Canada"
						},
						{
							countryCode: "cv",
							displayName: "Cape Verde"
						},
						{
							countryCode: "bq",
							displayName: "Caribbean Netherlands"
						},
						{
							countryCode: "ky",
							displayName: "Cayman Islands"
						},
						{
							countryCode: "cf",
							displayName: "Central African Republic"
						},
						{
							countryCode: "td",
							displayName: "Chad"
						},
						{
							countryCode: "cl",
							displayName: "Chile"
						},
						{
							countryCode: "cn",
							displayName: "China"
						},
						{
							countryCode: "cx",
							displayName: "Christmas Island"
						},
						{
							countryCode: "cc",
							displayName: "Cocos (Keeling) Islands"
						},
						{
							countryCode: "co",
							displayName: "Colombia"
						},
						{
							countryCode: "km",
							displayName: "Comoros"
						},
						{
							countryCode: "cg",
							displayName: "Congo - Brazzaville"
						},
						{
							countryCode: "cd",
							displayName: "Congo - Kinshasa"
						},
						{
							countryCode: "ck",
							displayName: "Cook Islands"
						},
						{
							countryCode: "cr",
							displayName: "Costa Rica"
						},
						{
							countryCode: "hr",
							displayName: "Croatia"
						},
						{
							countryCode: "cu",
							displayName: "Cuba"
						},
						{
							countryCode: "cw",
							displayName: "Curaçao"
						},
						{
							countryCode: "cy",
							displayName: "Cyprus"
						},
						{
							countryCode: "cz",
							displayName: "Czechia"
						},
						{
							countryCode: "ci",
							displayName: "Côte d’Ivoire"
						},
						{
							countryCode: "dk",
							displayName: "Denmark"
						},
						{
							countryCode: "dj",
							displayName: "Djibouti"
						},
						{
							countryCode: "dm",
							displayName: "Dominica"
						},
						{
							countryCode: "do",
							displayName: "Dominican Republic"
						},
						{
							countryCode: "ec",
							displayName: "Ecuador"
						},
						{
							countryCode: "eg",
							displayName: "Egypt"
						},
						{
							countryCode: "sv",
							displayName: "El Salvador"
						},
						{
							countryCode: "gq",
							displayName: "Equatorial Guinea"
						},
						{
							countryCode: "er",
							displayName: "Eritrea"
						},
						{
							countryCode: "ee",
							displayName: "Estonia"
						},
						{
							countryCode: "et",
							displayName: "Ethiopia"
						},
						{
							countryCode: "fk",
							displayName: "Falkland Islands"
						},
						{
							countryCode: "fo",
							displayName: "Faroe Islands"
						},
						{
							countryCode: "fj",
							displayName: "Fiji"
						},
						{
							countryCode: "fi",
							displayName: "Finland"
						},
						{
							countryCode: "fr",
							displayName: "France"
						},
						{
							countryCode: "gf",
							displayName: "French Guiana"
						},
						{
							countryCode: "pf",
							displayName: "French Polynesia"
						},
						{
							countryCode: "tf",
							displayName: "French Southern Territories"
						},
						{
							countryCode: "ga",
							displayName: "Gabon"
						},
						{
							countryCode: "gm",
							displayName: "Gambia"
						},
						{
							countryCode: "ge",
							displayName: "Georgia"
						},
						{
							countryCode: "de",
							displayName: "Germany"
						},
						{
							countryCode: "gh",
							displayName: "Ghana"
						},
						{
							countryCode: "gi",
							displayName: "Gibraltar"
						},
						{
							countryCode: "gr",
							displayName: "Greece"
						},
						{
							countryCode: "gl",
							displayName: "Greenland"
						},
						{
							countryCode: "gd",
							displayName: "Grenada"
						},
						{
							countryCode: "gp",
							displayName: "Guadeloupe"
						},
						{
							countryCode: "gu",
							displayName: "Guam"
						},
						{
							countryCode: "gt",
							displayName: "Guatemala"
						},
						{
							countryCode: "gg",
							displayName: "Guernsey"
						},
						{
							countryCode: "gn",
							displayName: "Guinea"
						},
						{
							countryCode: "gw",
							displayName: "Guinea-Bissau"
						},
						{
							countryCode: "gy",
							displayName: "Guyana"
						},
						{
							countryCode: "ht",
							displayName: "Haiti"
						},
						{
							countryCode: "hm",
							displayName: "Heard & McDonald Islands"
						},
						{
							countryCode: "hn",
							displayName: "Honduras"
						},
						{
							countryCode: "hk",
							displayName: "Hong Kong SAR China"
						},
						{
							countryCode: "hu",
							displayName: "Hungary"
						},
						{
							countryCode: "is",
							displayName: "Iceland"
						},
						{
							countryCode: "in",
							displayName: "India"
						},
						{
							countryCode: "id",
							displayName: "Indonesia"
						},
						{
							countryCode: "ir",
							displayName: "Iran"
						},
						{
							countryCode: "iq",
							displayName: "Iraq"
						},
						{
							countryCode: "ie",
							displayName: "Ireland"
						},
						{
							countryCode: "im",
							displayName: "Isle of Man"
						},
						{
							countryCode: "il",
							displayName: "Israel"
						},
						{
							countryCode: "it",
							displayName: "Italy"
						},
						{
							countryCode: "jm",
							displayName: "Jamaica"
						},
						{
							countryCode: "jp",
							displayName: "Japan"
						},
						{
							countryCode: "je",
							displayName: "Jersey"
						},
						{
							countryCode: "jo",
							displayName: "Jordan"
						},
						{
							countryCode: "kz",
							displayName: "Kazakhstan"
						},
						{
							countryCode: "ke",
							displayName: "Kenya"
						},
						{
							countryCode: "ki",
							displayName: "Kiribati"
						},
						{
							countryCode: "kw",
							displayName: "Kuwait"
						},
						{
							countryCode: "kg",
							displayName: "Kyrgyzstan"
						},
						{
							countryCode: "la",
							displayName: "Laos"
						},
						{
							countryCode: "lv",
							displayName: "Latvia"
						},
						{
							countryCode: "lb",
							displayName: "Lebanon"
						},
						{
							countryCode: "ls",
							displayName: "Lesotho"
						},
						{
							countryCode: "lr",
							displayName: "Liberia"
						},
						{
							countryCode: "ly",
							displayName: "Libya"
						},
						{
							countryCode: "li",
							displayName: "Liechtenstein"
						},
						{
							countryCode: "lt",
							displayName: "Lithuania"
						},
						{
							countryCode: "lu",
							displayName: "Luxembourg"
						},
						{
							countryCode: "mo",
							displayName: "Macau SAR China"
						},
						{
							countryCode: "mk",
							displayName: "Macedonia"
						},
						{
							countryCode: "mg",
							displayName: "Madagascar"
						},
						{
							countryCode: "mw",
							displayName: "Malawi"
						},
						{
							countryCode: "my",
							displayName: "Malaysia"
						},
						{
							countryCode: "mv",
							displayName: "Maldives"
						},
						{
							countryCode: "ml",
							displayName: "Mali"
						},
						{
							countryCode: "mt",
							displayName: "Malta"
						},
						{
							countryCode: "mh",
							displayName: "Marshall Islands"
						},
						{
							countryCode: "mq",
							displayName: "Martinique"
						},
						{
							countryCode: "mr",
							displayName: "Mauritania"
						},
						{
							countryCode: "mu",
							displayName: "Mauritius"
						},
						{
							countryCode: "yt",
							displayName: "Mayotte"
						},
						{
							countryCode: "mx",
							displayName: "Mexico"
						},
						{
							countryCode: "fm",
							displayName: "Micronesia"
						},
						{
							countryCode: "md",
							displayName: "Moldova"
						},
						{
							countryCode: "mc",
							displayName: "Monaco"
						},
						{
							countryCode: "mn",
							displayName: "Mongolia"
						},
						{
							countryCode: "me",
							displayName: "Montenegro"
						},
						{
							countryCode: "ms",
							displayName: "Montserrat"
						},
						{
							countryCode: "ma",
							displayName: "Morocco"
						},
						{
							countryCode: "mz",
							displayName: "Mozambique"
						},
						{
							countryCode: "mm",
							displayName: "Myanmar (Burma)"
						},
						{
							countryCode: "na",
							displayName: "Namibia"
						},
						{
							countryCode: "nr",
							displayName: "Nauru"
						},
						{
							countryCode: "np",
							displayName: "Nepal"
						},
						{
							countryCode: "nl",
							displayName: "Netherlands"
						},
						{
							countryCode: "nc",
							displayName: "New Caledonia"
						},
						{
							countryCode: "nz",
							displayName: "New Zealand"
						},
						{
							countryCode: "ni",
							displayName: "Nicaragua"
						},
						{
							countryCode: "ne",
							displayName: "Niger"
						},
						{
							countryCode: "ng",
							displayName: "Nigeria"
						},
						{
							countryCode: "nu",
							displayName: "Niue"
						},
						{
							countryCode: "nf",
							displayName: "Norfolk Island"
						},
						{
							countryCode: "kp",
							displayName: "North Korea"
						},
						{
							countryCode: "mp",
							displayName: "Northern Mariana Islands"
						},
						{
							countryCode: "no",
							displayName: "Norway"
						},
						{
							countryCode: "om",
							displayName: "Oman"
						},
						{
							countryCode: "pk",
							displayName: "Pakistan"
						},
						{
							countryCode: "pw",
							displayName: "Palau"
						},
						{
							countryCode: "ps",
							displayName: "Palestinian Territories"
						},
						{
							countryCode: "pa",
							displayName: "Panama"
						},
						{
							countryCode: "pg",
							displayName: "Papua New Guinea"
						},
						{
							countryCode: "py",
							displayName: "Paraguay"
						},
						{
							countryCode: "pe",
							displayName: "Peru"
						},
						{
							countryCode: "ph",
							displayName: "Philippines"
						},
						{
							countryCode: "pn",
							displayName: "Pitcairn Islands"
						},
						{
							countryCode: "pl",
							displayName: "Poland"
						},
						{
							countryCode: "pt",
							displayName: "Portugal"
						},
						{
							countryCode: "pr",
							displayName: "Puerto Rico"
						},
						{
							countryCode: "qa",
							displayName: "Qatar"
						},
						{
							countryCode: "ro",
							displayName: "Romania"
						},
						{
							countryCode: "ru",
							displayName: "Russia"
						},
						{
							countryCode: "rw",
							displayName: "Rwanda"
						},
						{
							countryCode: "re",
							displayName: "Réunion"
						},
						{
							countryCode: "ws",
							displayName: "Samoa"
						},
						{
							countryCode: "sm",
							displayName: "San Marino"
						},
						{
							countryCode: "sa",
							displayName: "Saudi Arabia"
						},
						{
							countryCode: "sn",
							displayName: "Senegal"
						},
						{
							countryCode: "rs",
							displayName: "Serbia"
						},
						{
							countryCode: "sc",
							displayName: "Seychelles"
						},
						{
							countryCode: "sl",
							displayName: "Sierra Leone"
						},
						{
							countryCode: "sg",
							displayName: "Singapore"
						},
						{
							countryCode: "sx",
							displayName: "Sint Maarten"
						},
						{
							countryCode: "sk",
							displayName: "Slovakia"
						},
						{
							countryCode: "si",
							displayName: "Slovenia"
						},
						{
							countryCode: "sb",
							displayName: "Solomon Islands"
						},
						{
							countryCode: "so",
							displayName: "Somalia"
						},
						{
							countryCode: "za",
							displayName: "South Africa"
						},
						{
							countryCode: "gs",
							displayName: "South Georgia & South Sandwich Islands",
						},
						{
							countryCode: "kr",
							displayName: "South Korea"
						},
						{
							countryCode: "ss",
							displayName: "South Sudan"
						},
						{
							countryCode: "es",
							displayName: "Spain"
						},
						{
							countryCode: "lk",
							displayName: "Sri Lanka"
						},
						{
							countryCode: "bl",
							displayName: "St. Barthélemy"
						},
						{
							countryCode: "sh",
							displayName: "St. Helena"
						},
						{
							countryCode: "kn",
							displayName: "St. Kitts & Nevis"
						},
						{
							countryCode: "lc",
							displayName: "St. Lucia"
						},
						{
							countryCode: "mf",
							displayName: "St. Martin"
						},
						{
							countryCode: "pm",
							displayName: "St. Pierre & Miquelon"
						},
						{
							countryCode: "vc",
							displayName: "St. Vincent & Grenadines"
						},
						{
							countryCode: "sd",
							displayName: "Sudan"
						},
						{
							countryCode: "sr",
							displayName: "Suriname"
						},
						{
							countryCode: "sj",
							displayName: "Svalbard & Jan Mayen"
						},
						{
							countryCode: "sz",
							displayName: "Swaziland"
						},
						{
							countryCode: "se",
							displayName: "Sweden"
						},
						{
							countryCode: "ch",
							displayName: "Switzerland"
						},
						{
							countryCode: "sy",
							displayName: "Syria"
						},
						{
							countryCode: "st",
							displayName: "São Tomé & Príncipe"
						},
						{
							countryCode: "tw",
							displayName: "Taiwan"
						},
						{
							countryCode: "tj",
							displayName: "Tajikistan"
						},
						{
							countryCode: "tz",
							displayName: "Tanzania"
						},
						{
							countryCode: "th",
							displayName: "Thailand"
						},
						{
							countryCode: "tl",
							displayName: "Timor-Leste"
						},
						{
							countryCode: "tg",
							displayName: "Togo"
						},
						{
							countryCode: "tk",
							displayName: "Tokelau"
						},
						{
							countryCode: "to",
							displayName: "Tonga"
						},
						{
							countryCode: "tt",
							displayName: "Trinidad & Tobago"
						},
						{
							countryCode: "tn",
							displayName: "Tunisia"
						},
						{
							countryCode: "tr",
							displayName: "Turkey"
						},
						{
							countryCode: "tm",
							displayName: "Turkmenistan"
						},
						{
							countryCode: "tc",
							displayName: "Turks & Caicos Islands"
						},
						{
							countryCode: "tv",
							displayName: "Tuvalu"
						},
						{
							countryCode: "um",
							displayName: "U.S. Outlying Islands"
						},
						{
							countryCode: "vi",
							displayName: "U.S. Virgin Islands"
						},
						{
							countryCode: "ug",
							displayName: "Uganda"
						},
						{
							countryCode: "ua",
							displayName: "Ukraine"
						},
						{
							countryCode: "ae",
							displayName: "United Arab Emirates"
						},
						{
							countryCode: "gb",
							displayName: "United Kingdom"
						},
						{
							countryCode: "us",
							displayName: "United States"
						},
						{
							countryCode: "uy",
							displayName: "Uruguay"
						},
						{
							countryCode: "uz",
							displayName: "Uzbekistan"
						},
						{
							countryCode: "vu",
							displayName: "Vanuatu"
						},
						{
							countryCode: "va",
							displayName: "Vatican City"
						},
						{
							countryCode: "ve",
							displayName: "Venezuela"
						},
						{
							countryCode: "vn",
							displayName: "Vietnam"
						},
						{
							countryCode: "wf",
							displayName: "Wallis & Futuna"
						},
						{
							countryCode: "eh",
							displayName: "Western Sahara"
						},
						{
							countryCode: "ye",
							displayName: "Yemen"
						},
						{
							countryCode: "zm",
							displayName: "Zambia"
						},
						{
							countryCode: "zw",
							displayName: "Zimbabwe"
						},
						{
							countryCode: "ax",
							displayName: "Åland Islands"
						},
					],
					disabled: true,
					validation: {
						required: true,
						requiredMsg: "Please select your country.",
					},
				},
				{
					type: "checkbox",
					name: "communications",
					label: "I agree to receive marketing, product, training, support, and related communications via mail, email, or other electronic means.",
					optionalLabel: "(optional)",
				},
			],
		},
		icons: {
			edit: "/content/dam/waters/en/brand-assets/icons/edit.svg",
		},
		tileMessages: {
			noCommunication: "I do not want to receive communications from Waters.",
			yesCommunication: "I want to receive communications from Waters.",
		},
	},
};

const detailTilesBillingJSON = {
	configId: "json-config--cmp-detail-tiles--billing",
	html: {
		name: "billingAddresses-details-tile",
		type: "billToInfo",
		title: "Billing Address",
		addAddressMessage: "For a faster checkout experience, add your billing address now.",
		noAddressMessage: "There are no addresses associated with your account.",
		addTitle: "Add New Billing Address",
	},
};

const detailTilesShippingJSON = {
	configId: "json-config--cmp-detail-tiles--shipping",
	html: {
		name: "shippingAddresses-details-tile",
		type: "shipToInfo",
		title: "Shipping Address",
		addAddressMessage: "For a faster checkout experience, add your shipping address now.",
		noAddressMessage: "There are no addresses associated with your account.",
		addTitle: "Add New Shipping Address",
	},
};

const detailTilesAddressJSON = {
	configId: "json-config--cmp-detail-tiles--address",
	html: {
		formMessage: {
			text: "It may take up to 24 hours to verify a new or change of address. Orders may be delayed.",
		},
		editText: "Edit",
		form: {
			buttonText: "Save Changes",
			cancelText: "Cancel",
			icons: {
				validIcon: "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
				invalidIcon: "/content/dam/waters/en/brand-assets/icons/attention.svg",
			},
			fields: [{
					type: "text",
					name: "company",
					label: "Company",
					validation: {
						validateFnName: "noWhitespaceOnly",
						validationMsg: "Please enter a valid company.",
						required: true,
						requiredMsg: "Please enter a company.",
					},
				},
				{
					type: "text",
					name: "street",
					label: "Address",
					validation: {
						validateFnName: "noWhitespaceOnly",
						validationMsg: "Please enter a valid address.",
						required: true,
						requiredMsg: "Please enter an address.",
					},
				},
				{
					type: "text",
					name: "city",
					label: "City",
					validation: {
						validateFnName: "noWhitespaceOnly",
						validationMsg: "Please enter a valid city.",
						required: true,
						requiredMsg: "Please enter a city.",
					},
				},
				{
					type: "dropdown",
					name: "state",
					label: "State/Province/Region",
					placeholder: "Select...",
					dropdownIndicator: "/content/dam/waters/en/brand-assets/icons/down.svg",
					options: [],
					validation: {
						required: true,
						requiredMsg: "Please select your region.",
					},
				},
				{
					type: "text",
					name: "zip",
					label: "Zip/Postal Code",
					validation: {
						validateFnName: "noWhitespaceOnly",
						validationMsg: "Please enter a valid postal code.",
						required: true,
						requiredMsg: "Please enter a postal code.",
					},
				},
				{
					type: "dropdown",
					name: "country",
					label: "Country",
					placeholder: "Select...",
					dropdownIndicator: "/content/dam/waters/en/brand-assets/icons/down.svg",
					options: [],
					validation: {
						required: true,
						requiredMsg: "Please select your country.",
					},
				},
			],
		},
		canCreate: false,
		icons: {
			edit: "/content/dam/waters/en/brand-assets/icons/edit.svg",
			add: "/content/dam/waters/en/brand-assets/icons/add.svg",
			refresh: "/content/dam/waters/en/brand-assets/icons/refresh.svg",
		},
	},
};

const detailTilesChangePasswordJSON = {
	configId: "json-config--cmp-detail-tiles--changePassword",
	html: {
		name: "changePassword-details-tile",
		type: "password",
		title: "Change Password",
		editText: "Edit",
		canCreate: true,
		form: {
			formName: "changepassword",
			submitEndpoint: "https://devservices.waters.com:8443/api/waters/user/v1/update/password",
			buttonText: "Change Password",
			cancelText: "Cancel",
			icons: {
				checkmarkIcon: "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
				validIcon: "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
				invalidIcon: "/content/dam/waters/en/brand-assets/icons/attention.svg",
				eyeIcon: "/content/dam/waters/en/brand-assets/icons/eye.svg",
				eyeOffIcon: "/content/dam/waters/en/brand-assets/icons/eye-off.svg",
				signInIcon: "/content/dam/waters/en/brand-assets/icons/user.svg",
			},
			fields: [{
					type: "label",
					name: "requiredLabel",
					label: "*Required field",
				},
				{
					type: "password",
					name: "currentPassword",
					label: "Enter Current Password",
					hasMatch: false,
					validation: {
						required: true,
						requiredMsg: "Please enter current password.",
					},
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
						maxLength: {
							value: 30,
							message: "Maximum 30 characters allowed",
						},
						validationMsg: "Please enter a valid password.",
						requiredMsg: "Please enter a password.",
						requiredMatchMsg: "Please confirm your password.",
						nonMatchingMsg: "Passwords must match. Please try again.",
						requirementsLabel: "Your password must include",
						requirements: [{
								name: "shortPassword",
								msg: "at least 8 characters",
							},
							{
								name: "noUppercase",
								msg: "at least 1 uppercase letter",
							},
							{
								name: "noLowercase",
								msg: "at least 1 lowercase letter",
							},
							{
								name: "noDigits",
								msg: "at least 1 number",
							},
							{
								name: "noSpecial",
								msg: "at least 1 symbol (for example, !, $, #, %)",
							},
						],
					},
				},
			],
		},
		icons: {
			edit: "/content/dam/waters/en/brand-assets/icons/edit.svg",
		},
	},
};

const globalTranslationsJSON = {
	configId: "global-translations-json",
	html: {
        "dismissButton": "Dismiss",
        "cancelButton": "Cancel",
        "preferredCountryHeading": "Select your Preferred Country",
        "changeCountryText": "Changing the country you shop from may affect factors including account pricing, shipping options and product availability.",
        "changeCountryNewTabText": "Your new country website will open in a new browser tab.",
        "changeCountryNoteText": "Note",
        "changeCountryButton": "Change Country"
    },
};

const countryListJSON = {
	configId: "country-list-json",
	html: [{"href":"/nextgen/us/en.html","title":"United States"},{"href":"/nextgen/au/en.html","title":"Australia"},{"href":"/nextgen/at/de.html","title":"Austria"},{"href":"/nextgen/be/en.html","title":"Belgium"},{"href":"/nextgen/br/pt.html","title":"Brazil"},{"href":"/nextgen/ca/en.html","title":"Canada"},{"href":"/nextgen/cn/zh.html","title":"China"},{"href":"/nextgen/cz/en.html","title":"Czech Republic"},{"href":"/nextgen/dk/en.html","title":"Denmark"},{"href":"/nextgen/ee/en.html","title":"Estonia"},{"href":"/nextgen/fi/en.html","title":"Finland"},{"href":"/nextgen/fr/fr.html","title":"France"},{"href":"/nextgen/de/de.html","title":"Germany"},{"href":"/nextgen/hk/en.html","title":"Hong Kong"},{"href":"/nextgen/hu/en.html","title":"Hungary"},{"href":"/nextgen/is/en.html","title":"Iceland"},{"href":"/nextgen/in/en.html","title":"India"},{"href":"/nextgen/id/en.html","title":"Indonesia"},{"href":"/nextgen/ie/en.html","title":"Ireland"},{"href":"/nextgen/it/it.html","title":"Italy"},{"href":"/nextgen/jp/ja.html","title":"Japan"},{"href":"/nextgen/lv/en.html","title":"Latvia"},{"href":"/nextgen/lt/en.html","title":"Lithuania"},{"href":"/nextgen/my/en.html","title":"Malaysia"},{"href":"/nextgen/mx/es.html","title":"Mexico"},{"href":"/nextgen/nl/en.html","title":"Netherlands"},{"href":"/nextgen/nz/en.html","title":"New Zealand"},{"href":"/nextgen/no/en.html","title":"Norway"},{"href":"/nextgen/ph/en.html","title":"Philippines"},{"href":"/nextgen/pl/en.html","title":"Poland"},{"href":"/nextgen/pt/pt.html","title":"Portugal"},{"href":"/nextgen/pr/en.html","title":"Puerto Rico"},{"href":"/nextgen/sg/en.html","title":"Singapore"},{"href":"/nextgen/kr/ko.html","title":"South Korea"},{"href":"/nextgen/es/es.html","title":"Spain"},{"href":"/nextgen/se/en.html","title":"Sweden"},{"href":"/nextgen/ch/fr.html","title":"Switzerland"},{"href":"/nextgen/tw/zh.html","title":"Taiwan"},{"href":"/nextgen/th/en.html","title":"Thailand"},{"href":"/nextgen/gb/en.html","title":"United Kingdom"},{"href":"/nextgen/vn/en.html","title":"Vietnam"},{"href":"/nextgen/xg/en.html","title":"Other"}],
};

const commerceConfigsJSON = {
	configId: "commerce-configs-json",
	html: {
        "locale": "en",
        "commerceConfig": {
            "disabledIcon": "/content/dam/waters/en/brand-assets/icons/attention.svg",
            "disabledLabel": "Disabled",
            "disabledText": "Online ordering is not available in your country.",
            "partialDisabledText": "Online ordering is limited to specific Distributors. Please sign in or ",
            "partialDisabledLinkText": "contact your sales representative.",
            "partialDisabledHref": "https://www.waters.com/waters/localeRedirect.htm?type=contact_us",
            "eProcurementRestrictedText": "Online ordering is not available for your account. Please order through your procurement system.",
            "contactSupportLinkLabel": "Contact Waters",
            "contactSupportHref": "https://www.waters.com/waters/localeRedirect.htm?type=contact_us"
        },
        "availabilityUrl": "https://prodservices.waters.com/api/waters/product/v1/availability/{partnumber}/{countryCode}",
        "pricingUrl": "https://api.waters.com/waters-product-exp-api-v1/api/products/prices",
        "addToCartUrl": "https://api.waters.com/waters-cart-proxy-api-v1/{localeCountry}/{localeLanguage}/users/{userType}/carts/{guid}/entries",
        "viewCartUrl": "https://www.waters.com/store/us/en/cart",
        "isCommerceApiMigrated": "true",
        "isCustomerPriceApiDisabled": "false",
        "isCheckoutDisabled": "false",
        "isQuoteDisabled": "false",
        "countryCode": "US",
        "isoCode": "en",
        "addToCartLabel": "Add to Cart",
        "qtyLabel": "Qty",
        "qtyAriaLabel": "Quantity",
        "defaultSkuQty": 1,
        "showBreadcrumbs": false,
        "skuInfo": {
            "listPriceLabel": "List Price",
            "custPriceLabel": "Your Price",
            "inStockLabel": "In Stock",
            "outOfStockLabel": "Out of Stock",
            "orderNowLabel": "Order Now",
            "orderSoonLabel": "Order Soon",
            "seeAvailabilityLabel": "See Availability",
            "shipsByLabel": "Ships by {shipByDate}",
            "onlyXInStockLabel": "Only {quantity} in stock",
            "discontinuedLabel": "Discontinued",
            "discontinuedNoReplacementCode": "The part number you selected is no longer available.",
            "discontinuedWithReplacementWithCode": "The part number you selected is no longer available, but there is a replacement. The replacement part number is ",
            "partNumberLabel": "SKU:",
            "contactWatersLabel": "Contact Waters",
            "contactWatersInfoLabel": "For Availability",
            "inStockIcon": "/content/dam/waters/en/brand-assets/icons/success.svg",
            "lowStockIcon": "/content/dam/waters/en/brand-assets/icons/attention.svg",
            "outOfStockIcon": "/content/dam/waters/en/brand-assets/icons/x.svg",
            "refreshIcon": "/content/dam/waters/en/brand-assets/icons/refresh.svg",
            "discontinuedIcon": "/content/dam/waters/en/brand-assets/icons/attention.svg",
            "nextIcon": "/content/dam/waters/en/brand-assets/icons/right.svg",
            "noThumbnailImage": "/content/dam/waters/en/brand-assets/thumbnails/product-thumbnail.png",
            "maxAmount": 999,
            "signInText1": "Sign in",
            "signInText2": "to view ",
            "signInText3": "Your Price",
            "signinIcon": "/content/dam/waters/en/brand-assets/icons/user.svg",
            "unavailablePriceLabel": "Unavailable",
            "skuErrorMessage": [
                {
                    "type": "text",
                    "text": "This item is not available for sale.",
                    "rightSpace": "true"
                },
                {
                    "type": "link",
                    "label": "Contact Waters",
                    "title": "Contact Waters",
                    "url": "https://www.waters.com/waters/localeRedirect.htm?type=contact_us",
                    "blank": true,
                    "rightSpace": "true"
                },
                {
                    "type": "text",
                    "text": "for more information.",
                    "rightSpace": "false"
                }
            ]
        },
        "modalInfo": {
            "icon": "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
            "closeIcon": "/content/dam/waters/en/brand-assets/icons/close.svg",
            "title": "Item Added to Shopping Cart",
            "buttons": [
                {
                    "text": "View Shopping Cart",
                    "action": "https://www.waters.com/store/us/en/cart"
                },
                {
                    "text": "Continue Shopping",
                    "action": "close"
                }
            ]
        },
        "errorInfo": {
            "icon": "/content/dam/waters/en/brand-assets/icons/attention.svg",
            "closeIcon": "/content/dam/waters/en/brand-assets/icons/close.svg",
            "title": "Sorry, something went wrong.",
            "serviceUnavailable": "Service Unavailable",
            "tryAgainLater": "Try again later",
            "anErrorHasOccurred": "An error has occurred",
            "wereSorry": "An error has occurred and your item was not added to the Shopping Cart. Please try again."
        },
        "setupFailure":{
            "icon": "/content/dam/waters/en/brand-assets/icons/attention.svg",
            "requestFailureTitle": "Sorry, something went wrong.",
            "requestFailureMessage": "Please return to your procurement system and try again.",
            "sessionTimeoutTitle": "Your session has expired.",
            "sessionTimeoutMessage": "Please return to your procurement system and start a new session.",
            "buttons": [
                {
                    "text": "Return to procurement system",
                    "action": ""
                }
            ]
        }
    },
};

const accountModalConfigsJSON = {
	configId: "account-modal-configs-json",
	html:  {
		"userDetailsUrl": "https://prodservices.waters.com/api/waters/user/v1/details",
		"soldToDetailsUrl": "https://prodservices.waters.com/api/waters/user/v1/retrievesoldto",
		"siteConfig": "eCommerce",
		"homepageLink": "/nextgen/us/en.html",
		"punchoutSetup": "https://prodservices.waters.com/api/waters/punchout/v1/setup",
		"punchoutLogin": "https://prodservices.waters.com/api/waters/punchout/v1/login",
		"icon": "/content/dam/waters/en/brand-assets/icons/user.svg",
		"closeIcon": "/content/dam/waters/en/brand-assets/icons/close.svg",
		"title": "My Account",
		"notRegistered": "Not registered yet?",
		"myAccount": {
			"text": "My Account",
			"url": "/nextgen/us/en/account/my-account.html",
			"target": "_self"
		},
		"signIn": {
			"text": "Sign In",
			"url": "/nextgen/us/en/account/sign-in.html",
			"class": "cmp-sign-in-link",
			"linkName": "Sign In"
		},
		"signOut": {
			"text": "Sign Out",
			"url": "/nextgen/us/en.html",
			"signOutEndpoint": "https://prodservices.waters.com/api/waters/user/v1/logout",
			"linkName": "Sign Out"
		},
		"switchAccount": {
			"text": "Switch Account",
			"url": "/nextgen/us/en/account/switch-account.html",
			"linkName": "Switch Account"
		},
		"createAccount": {
			"text": "Create Account",
			"url": "/nextgen/us/en/account/create-account.html",
			"linkName": "Create Account"
		},
		"itemList": [
			{
				"text": "Profile",
				"url": "/nextgen/us/en/account/my-account.html#profile",
				"target": "_self",
				"class": "dropdown__item-list__my-profile",
				"linkName": "Profile",
				"isHiddenForEprocUser": "false"
			},
			{
				"text": "Order History",
				"url": "/nextgen/us/en/account/my-account.html#orderhistory",
				"target": "_self",
				"class": "dropdown__item-list__my-orders",
				"linkName": "Order History",
				"isHiddenForEprocUser": "true"
			}
		]
	},
};

export {
	myAccountJSON,
	detailTilesPersonalJSON,
	detailTilesBillingJSON,
	detailTilesShippingJSON,
	detailTilesAddressJSON,
	detailTilesChangePasswordJSON,
	globalTranslationsJSON,
	countryListJSON,
	commerceConfigsJSON,
	accountModalConfigsJSON,
};