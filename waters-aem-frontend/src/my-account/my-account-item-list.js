import React from 'react';
import CheckOutStatus from '../scripts/checkOutStatus';
import Ecommerce from '../scripts/ecommerce';

const MyOrderClass = 'dropdown__item-list__my-orders';
const ItemList = props => {
    const list = props.itemList;
    const shouldRender = listItemClass => {
        if (
            (listItemClass == MyOrderClass && Ecommerce.isDisabledState()) ||
            (listItemClass == MyOrderClass &&
                Ecommerce.isPartialState() &&
                !CheckOutStatus.state())
        ) {
            return false;
        }

        return true;
    };

    const listItems = Object.keys(list).map(key => {
        let text = list[key].text;
        let url = list[key].url;
        let target = list[key].target || '_self';
        let listItemClass = list[key].class;
        return (
            <div key={key} className="my-account-dropdown__item-list">
                {shouldRender(listItemClass) && (
                    <a
                        className={
                            'my-account-dropdown__item-list--link ' +
                            listItemClass
                        }
                        href={url}
                        target={target}
                    >
                        <span>{text}</span>
                    </a>
                )}
            </div>
        );
    });

    return (
        <>
            {listItems}
            {list.length > 0 && <hr className="my-account-dropdown__hr" />}
        </>
    );
};

export default ItemList;
export { MyOrderClass };
