import React from 'react';

const renderList = (list) => { 
    const listItems = Object.keys(list).map(key => {
        let text = list[key].text;
        let url = list[key].url;
        let target = list[key].target || '_self';
        return (
            <li key={key} className="dropdown__list__item">
                <a className="dropdown__list__item--link"
                    href={url}
                    target={target}>
                    <span>{text}</span>
                </a>
            </li>
        )
    })

    return listItems;
}

export default renderList;