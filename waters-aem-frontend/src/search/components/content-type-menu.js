import React from 'react'
import PropTypes from 'prop-types'

export const ContentTypeMenu = (props) => {
    return (<>
        <div className="content-type-menu-container">
            <h1 className="content-type-menu-container__heading">Content Types</h1>
            {
                props.items.map((item, index) => {
                    return <div key={item.value} className="content-type-menu-container__item" onClick={e => props.click(item)}>{item.value}</div>
                })
            }
        </div>
    </>);
}

ContentTypeMenu.propTypes = {
    items: PropTypes.array.isRequired,
    click: PropTypes.func.isRequired
}