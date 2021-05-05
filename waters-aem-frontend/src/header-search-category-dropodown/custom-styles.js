import variables from '../styles/variables.scss';
import ScreenSizes from '../scripts/screenSizes';

const customDropdownStyles = {
    indicatorSeparator: () => ({
        display: 'none',
    }),
    option: (provided, state) => ({
        ...provided,
        color: variables.colorGray50,
        padding: `${ScreenSizes.isMobile() ? variables.spaceXS : variables.spaceXXXS} ${variables.spaceS}`,
        backgroundColor: state.isSelected ? variables.colorBackgroundLight : variables.colorWhite,
        cursor: !state.isSelected ? 'pointer' : 'default',
        '&:hover': {
            color: !state.isSelected ? variables.colorBlue50 : variables.colorGray50,
            backgroundColor: !state.isSelected ? variables.colorWhite : variables.colorBackgroundLight,
        },
        margin: 0,
    }),
    control: provided => ({
        ...provided,
        borderRadius: ScreenSizes.isMobile() ? variables.borderRadius : 0,
        padding: `.3em ${variables.spaceXXS}`,
        color: variables.colorGray50,
        'border-color': variables.colorBorderDark,
        outline: 'none',
        cursor: 'pointer',
        'box-shadow': 'none',
        '&:hover': {
            outline: 'none',
            color: variables.colorBlue50,
            borderColor: variables.colorBlue50,
        },
    }),
    singleValue: (provided, state) => {
        return {};
    },
    menu: provided => ({
        ...provided,
        marginTop: 0,
        borderRadius: 0,
        width: ScreenSizes.isMobile() ? 'calc(100% - 2px)' : '170px',
        marginLeft: '1px',
        marginBottom: 0,
        padding: 0,
    }),
    menuList: provided => ({
        ...provided,
        paddingBottom: 0,
        paddingTop: 0,
    }),
};


export default customDropdownStyles;
