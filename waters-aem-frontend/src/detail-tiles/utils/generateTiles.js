import React from 'react';
import {
    getAddressesByType,
    getFullCompanyAddress,
    getFullName,
    getCountryName,
    getDefaultSoldToAddresses
} from '../../utils/userFunctions';

const newNotification = (title, description, icon) => ({
    title: title,
    description: description,
    icon: icon
});

const buildAddress = address => {
    const includeCountryName = false;
    let addressArray = getFullCompanyAddress(address, includeCountryName);
    return addressArray.map((x, i) => <div key={i + 1}>{x}</div>);
}


//soldToInfo billToInfo shipToInfo payerInfo carrierInfo
export default (data, type, icon) => {
    if (!data) return [];

    const config = document.getElementById('json-config--cmp-detail-tiles--personal')
    ? JSON.parse(document.getElementById('json-config--cmp-detail-tiles--personal').innerHTML)
    : '';
    console.log("generate Tiles data", data)
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
        case 'shipToInfo':
        case 'billToInfo':
            let defaultAddresses = data.soldToAccounts.length ? getDefaultSoldToAddresses(data.soldToAccounts) : data.addresses;
            console.log("defaultAddress", defaultAddresses);
            return [
                ...getAddressesByType(defaultAddresses, type).map(address => {
                let tile = {
                        name: type,
                        columns: [
                            {
                                title: address.preferred
                                    ? 'Preferred Address'
                                    : '',
                                rows: [
                                    {
                                        text: buildAddress(address),
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

                    if (address.shipOrBillChangeFlag) {
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
