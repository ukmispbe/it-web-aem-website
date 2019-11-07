import React from 'react';

const MyAccountDropDownList = props => { 
    const list = props.listItems;
    const listItems = Object.keys(list).map(key => {
        let text = list[key].text;
        let url = list[key].url;
        let target = list[key].target || '_self';
        let listItemClass = list[key].class;
        return (
            <li key={key} className="dropdown__list__item">
                    <a className={'dropdown__list__item--link ' + listItemClass}
                        href={url}
                        target={target}>
                    <span>{text}</span>
                </a>
            </li>
        )
    })

    return listItems;
}

export default MyAccountDropDownList;