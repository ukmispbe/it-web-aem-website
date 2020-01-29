const DefaultProps = {
    name: 'detailTile',
    title: 'Detail Tile',
    type: 'personal',
    canCreate: true,
    addTitle: 'Add New Detail Tile',
    noAddressMessage: 'There are no tiles, add one now.',
    fetchEndPoint: 'www.waters.com',
    formMessage: {
        text: 'This is the form message'
    },
    icons: {
        add: '/content/dam/waters/en/brand-assets/icons/add.svg',
        edit: '/content/dam/waters/en/brand-assets/icons/edit-2.svg',
        refresh: '/content/dam/waters/en/brand-assets/icons/refresh.svg'
    },
    form: {
        buttonText: 'Save Changes',
        cancelText: 'Cancel',
        submitEndpoint: 'www.waters.com',
        icons: {
            invalidIcon:
                '/content/dam/waters/en/brand-assets/icons/attention.svg',
            validIcon:
                '/content/dam/waters/en/brand-assets/icons/checkmark.svg',
            lockIcon: '/content/dam/waters/en/brand-assets/icons/lock.svg'
        },
        fields: [
            {
                name: 'field1',
                label: 'Field One (Required)',
                type: 'text',
                validation: {
                    required: true,
                    requiredMsg: 'This field is required.',
                    validateFnName: 'noWhitespaceOnly',
                    validationMsg: 'Please enter some text.'
                }
            },
            {
                name: 'field2',
                label: 'Field Two (Optional)',
                type: 'text',
                validation: {
                    required: false,
                    validateFnName: 'noWhitespaceOnly',
                    validationMsg: 'Please enter some text.'
                }
            },
            {
                name: 'field3',
                label: 'Field Three (Disabled)',
                type: 'text',
                disabled: true,
                validation: {
                    required: true,
                    requiredMsg: 'This field is required.',
                    validateFnName: 'noWhitespaceOnly',
                    validationMsg: 'Please enter some text.'
                }
            }
        ]
    },
    tileName: 'tileDetailsTile',
    columns: [
        {
            title: 'Column 1 title',
            rows: [
                {
                    text: 'one line of text',
                    class: 'one-line'
                }
            ]
        },
        {
            title: '',
            rows: [
                {
                    text: 'There is',
                    class: 'there-is'
                },
                {
                    text: 'multiple lines of',
                    class: 'multiple-lines-of'
                },
                {
                    text: 'text',
                    class: 'text'
                }
            ]
        }
    ],
    defaultValues: {
        field1: 'Required Text',
        field3: 'Disabled Text'
    },
    notification: {
        title: 'Notification Title',
        description: 'Description for notification',
        icon: '/content/dam/waters/en/brand-assets/icons/refresh.svg'
    }
};

export default DefaultProps;
