import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleTask } from '../actions/tasks';
import { getDaysFromNow, toDateString } from '../util/DateUtil';

const isAlmostDue = dueDate => {
  const daysBetween = getDaysFromNow(dueDate);
  return daysBetween <= 3 && daysBetween >= 0;
};

const isOverDue = dueDate => getDaysFromNow(dueDate) < 0;

export const TaskItem = ({
  id,
  name,
  category,
  description,
  createdDate,
  reminderDate,
  dueDate,
  resolved,
  dispatch
}) => {
  return (
    <div className="col-12 col-md-4">
      <div
        className={classNames('card', {
          'border-warning': !resolved && isAlmostDue(dueDate),
          'border-danger': !resolved && isOverDue(dueDate),
          'border-success': resolved
        })}
      >
        <div className="card-header">{category}</div>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Due on {toDateString(dueDate)}
          </h6>
          <p className="card-text">{description}</p>
          <p className="card-text">Reminder {toDateString(reminderDate)}</p>
        </div>
        <div className="card-footer">
          <button
            className={classNames('btn btn-block', {
              'btn-primary': !resolved,
              'btn-warning': resolved
            })}
            onClick={() => {
              dispatch(toggleTask(id));
            }}
          >
            {!resolved ? 'Resolve' : 'Reopen'}
          </button>
          <small className="text-muted">
            Created on {toDateString(createdDate)}
          </small>
        </div>
      </div>
    </div>
  );
};

TaskItem.defaultProps = {
  description: '',
  reminderDate: null
};

TaskItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string,
  createdDate: PropTypes.number.isRequired,
  reminderDate: PropTypes.number,
  dueDate: PropTypes.number.isRequired,
  resolved: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(TaskItem);
