export default {
    "title": "My Account",
    "body": "Find all the resources and tools you need to manage your Waters account online.",
      "tiles": [
        {
          "title": "Account Information",
          "icon": "/content/dam/waters/en/brand-assets/icons/user.svg",
          "links": [
            {
              "text": "Profile",
              "url": "#profile"
            },
            {
              "text": "Password",
              "url": "#changepassword"
            }
          ]
        },
        {
          "title": "Orders",
          "icon": "/content/dam/waters/en/brand-assets/icons/package.svg",
          "links": [
            {
              "text": "Order History",
              "url": "#orderhistory"
            }
          ]
        },
        {
          "title": "Additional Links",
          "icon": "/content/dam/waters/en/brand-assets/icons/link.svg",
          "links": [
            {
              "text": "Request Technical Support",
              "url": "https://www.waters.com/waters/nav.htm?cid=10006027"
            },
            {
              "text": "Waters Knowledgebase",
              "url": "https://www.waters.com/waters/nav.htm?cid=134614448"
            },
            {
              "text": "Training Courses",
              "url": "https://www.waters.com/waters/nav.htm?cid=513247"
            },
            {
              "text": "Contact Waters",
              "url": "https://www.waters.com/waters/localeRedirect.htm?type=contact_us"
            }
          ]
        }
      ],
      "myProfile": {
        "fetchEndPoint": "https://test-www.waters.com:8443/api/waters/user/v1/details?email={email}",
        "submitEndpoint": "https://test-www.waters.com:8443/api/waters/user/v1/update/profile",
        "personalConfigId": "json-config--cmp-detail-tiles--personal",
        "addressConfig": {
          "abstractConfig": "json-config--cmp-detail-tiles--address",
          "configs": [
            "json-config--cmp-detail-tiles--shipping",
            "json-config--cmp-detail-tiles--billing"
          ]
        }
      },
      "changePassword": {
        "config": "json-config--cmp-detail-tiles--changePassword"
      }
    };