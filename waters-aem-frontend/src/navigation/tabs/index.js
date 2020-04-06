import React from "react";
import PropTypes from 'prop-types';
import Fader from '../../scripts/fade-x.js';

const Tabs = ({className, items, activeIndex, onClick, enableFading}) => {
    const tabsRef = React.useRef();

    React.useEffect(() => {
        let tabFader;

        if (enableFading && items.length !== 0) {
            tabFader = Fader('cmp-tabs', 0, 100);

            tabsRef.current.addEventListener('scroll', tabFader);
        }

        return () => {
            tabsRef.current.removeEventListener('scroll', tabFader);
        }
    }, []);

    return (
        <div className="cmp-tabs-wrapper">
            <div ref={tabsRef} className={`cmp-tabs ${className}`}>
                {items.map((item, index) => <Tab key={`CategoryTab-${index}`} name={item.name} index={index} isActive={index === activeIndex} onClick={onClick} />)}
            </div>
        </div>
    );
}

Tabs.propTypes = {
    className: PropTypes.string,
    items: PropTypes.array.isRequired,
    activeIndex: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    enableFading: PropTypes.bool.isRequired
}

Tabs.defaultProps = {
    className: "",
    items: [],
    activeIndex: -1,
    onClick: () => {},
    enableFading: false
}

const Tab = ({index, name, isActive, onClick}) => 
    <div className={`cmp-tabs__tab${isActive ? " active" : ""}`} onClick={() => onClick(index)}>
        <span className="cmp-tabs__tab-label">{name}</span>
    </div>;

Tab.propTypes = {
    name: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

Tab.defaultProps = {
    name: "",
    index: -1,
    isActive: false,
    onClick: () => {}
}

export default Tabs;