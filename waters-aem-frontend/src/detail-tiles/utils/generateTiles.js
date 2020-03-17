import {
    getAddressesByType,
    getFullAddress,
    getFullCompanyAddress,
    getFullName,
    getCountryName,
    getDefaultSoldTo
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

    console.log("data 1 -  ", data);
    switch (type) {
        case 'personal':
            let mailingAddress = data.userAddress.filter(function(i) {
                return i.addressType === 'mailingAddress';
            })[0];
            
            const communicationsString = data.communications ? config.tileMessages.yesCommunication : config.tileMessages.noCommunication;

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
                                    text: data.phone,
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
                                        communications: data.communications
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
            let defaultSoldTo = getDefaultSoldTo(data.soldToAccounts)[0];
            console.log("addresses", defaultSoldTo.addresses);
            return [
                ...getAddressesByType(defaultSoldTo.addresses, type).map(address => {
                    //address.country = address.countryCode;
                    console.log("address map", address);
                    let tile = {
                        name: address.id,
                        columns: [
                            {
                                title: address.preferred
                                    ? 'Preferred Address'
                                    : '',
                                rows: [
                                    {
                                        text: getFullCompanyAddress(address),
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
