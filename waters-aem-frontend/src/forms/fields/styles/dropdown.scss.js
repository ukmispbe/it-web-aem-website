import variables from "../../../../src/styles/variables.scss";

export default {
    indicatorSeparator: () => ({
        display: "none"
    }),
    option: (provided, state) => ({
        ...provided,
        color: variables.colorGray50,
        backgroundColor: state.isSelected
            ? variables.colorBackgroundLight
            : variables.colorWhite,
        cursor: !state.isSelected ? "pointer" : "default",
        "&:hover": {
            color: !state.isSelected
                ? variables.colorBlue50
                : variables.colorGray50,
            backgroundColor: !state.isSelected
                ? variables.colorWhite
                : variables.colorBackgroundLight
        },
        margin: 0
    }),
    control: (provided, state) => ({
        ...provided,
        "border-radius": variables.borderRadius,
        padding: "0.3em 0.5em",
        color: variables.colorGray50,
        "border-color": state.isFocused
            ? variables.colorBorderDark
            : variables.colorBorderDark,
        outline: "none",
        cursor: "pointer",
        "box-shadow": "none",
        "&:hover": {
            outline: "none",
            color: variables.colorBlue50,
            borderColor: variables.colorBlue50
        }
    }),
    singleValue: (provided, state) => {
        return {};
    },
    menu: provided => ({
        ...provided,
        marginTop: 0,
        borderRadius: 0,
        width: "calc(100% - 2px)",
        marginLeft: "1px",
        marginBottom: 0,
        padding: 0
    }),
    menuList: provided => ({
        ...provided,
        paddingBottom: 0,
        paddingTop: 0
    })
};