/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */

import React from 'react';
import { connect } from 'react-redux';

import { setFilter, clearCompleted } from '../redux/actions';
import VISIBILITY_FILTERS from '../constants';
import './Footer.css';

const Footer = (props) => {
    // eslint-disable-next-line react/prop-types
    const { visibilityFilter: activeFilter } = props;
    const filterClass = 'filter';
    return (
        <div>
            { props.ids.length !== 0
                ? (
                    <div className="footer">
                        {Object.keys(VISIBILITY_FILTERS).map((filterKey) => {
                            const currentFilter = VISIBILITY_FILTERS[filterKey];
                            const cls = activeFilter === currentFilter ? `${filterClass} active` : filterClass;
                            return (
                                <span
                                    key={currentFilter}
                                    className={cls}
                                    onClick={() => props.setFilter(currentFilter)}
                                >
                                    {currentFilter === 'incomplete' ? 'active' : currentFilter}
                                </span> // Displaying Active instead of Incomplete for brevity
                            );
                        })}
                        <span className="task-clear tooltip" onClick={() => props.clearCompleted()}>
                            {'X'}
                            <span className="tooltiptext">Clear Completed</span>
                        </span>
                    </div>
                )
                : null }
        </div>
    );
};

export default connect(state => ({
    visibilityFilter: state.visibilityFilter,
    ids: state.todos.allIds,
}),
{ setFilter, clearCompleted })(Footer);
