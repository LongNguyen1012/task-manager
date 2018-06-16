import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TaskItem from './TaskItem';

export class TaskList extends Component {
  constructor(props) {
    super(props);

    this.props.tasks;
  }

  render() {
    const { tasks } = this.props;
    return (
      <section className="row">
        {tasks.map((task, index) => (
          <TaskItem key={task.id} {...task} index={index} />
        ))}
      </section>
    );
  }
}

TaskList.defaultProps = {
  tasks: []
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = state => ({ tasks: state.tasks });

export default connect(
  mapStateToProps,
  null
)(TaskList);
