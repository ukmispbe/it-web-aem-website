import {
    getAddressesByType,
    getFullAddress,
    getFullName,
    getPhoneFormat,
    getCountryName
} from './profileFormatter';

const newNotification = (title, description, icon) => ({
    title: title,
    description: description,
    icon: icon
});

const config = document.getElementById(
    'json-config--cmp-detail-tiles--personal'
)
    ? JSON.parse(
          document.getElementById('json-config--cmp-detail-tiles--personal')
              .innerHTML
      )
    : '';

export default (data, type, icon) => {
    if (!data) return [];

    switch (type) {
        case 'personal':
            let mailingAddress = data.userAddress.filter(function(i) {
                return i.addressType === 'mailingAddress';
            })[0];

            let communicationsString = config.tileMessages.noCommunication;
            if (data.communications === 'true')
                communicationsString = config.tileMessages.yesCommunication;

            data.country = mailingAddress ? mailingAddress.countryCode : '';
            return [
                {
                    name: 'personalDetailsTile',
                    columns: [
                        {
                            title: getFullName(data),
                            rows: [
                                {
                                    text: data.company,
                                    class: 'company'
                                }
                            ]
                        },
                        {
                            title: undefined,
                            rows: [
                                {
                                    text: data.email,
                                    class: 'email'
                                },
                                {
                                    text: getPhoneFormat(data.phone),
                                    class: 'phone'
                                },
                                {
                                    text: getCountryName(data.country, config),
                                    class: 'country'
                                },
                                {
                                    text: communicationsString,
                                    class: 'communications',
                                    state: {
                                        visible: data.communications
                                    }
                                }
                            ]
                        }
                    ],
                    defaultValues: data
                }
            ];

        case 'shipping':
        case 'billing':
            return [
                ...getAddressesByType(data.userAddress, type).map(address => {
                    address.country = address.countryCode;
                    let tile = {
                        name: address.id,
                        columns: [
                            {
                                title: address.preferred
                                    ? 'Preferred Address'
                                    : '',
                                rows: [
                                    {
                                        text: address.company,
                                        class: 'company'
                                    },
                                    {
                                        text: getFullAddress(address),
                                        class: 'address'
                                    },
                                    {
                                        text: getCountryName(
                                            address.country,
                                            config
                                        ),
                                        class: 'country'
                                    }
                                ]
                            }
                        ],
                        defaultValues: address
                    };

                    if (address.pending) {
                        tile.notification = newNotification(
                            'Address Verification Pending',
                            'Orders may be delayed',
                            icon
                        );
                    }

                    return tile;
                })
            ];

        case 'password':
            return [
                {
                    name: '',
                    columns: [
                        {
                            title: '•••••••••••••••••••',
                            rows: [
                                {
                                    text: '',
                                    class: 'blank'
                                }
                            ]
                        }
                    ],
                    defaultValues: {}
                }
            ];

        default:
            return [];
    }
};
