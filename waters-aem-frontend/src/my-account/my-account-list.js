import React from 'react';
import CheckOutStatus from '../scripts/checkOutStatus';
import Ecommerce from '../scripts/ecommerce';

const MyAccountList = props => { 
    const list = props.listItems;
    const shouldRender = (listItemClass) => {
        if (listItemClass == 'dropdown__list__item__my-orders') {
            if (Ecommerce.isDisabledState() || (Ecommerce.isPartialState() && !CheckOutStatus.state())) {
                return false;
            } 
            return true;
        }
        return true;
    }

    const listItems = Object.keys(list).map(key => {
        let text = list[key].text;
        let url = list[key].url;
        let target = list[key].target || '_self';
        let listItemClass = list[key].class;
        return (
            <>
                {shouldRender(listItemClass) && (
                    <div key={key} className="my-account-dropdown__item">
                        <a className={'my-account-dropdown__item--link ' + listItemClass}
                                href={url}
                                target={target}>
                            <span>{text}</span>
                        </a>
                    </div >
                )}
            </>
        )
    })

    return (
        <>
            {listItems}
            <hr className="my-account-dropdown__hr" />
        </>
    );
}

export default MyAccountList;