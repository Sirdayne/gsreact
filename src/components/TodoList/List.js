import React, { Component } from 'react';
import { connect } from "react-redux";

class List extends Component {
  render() {
    const { todos } = this.props;

    return (
      <ul>
        {todos && todos.length
          ? todos.map((todo, index) => {
            return <div key={`todo-${index}`}>{todo.content}</div>;
          })
          : "No todos, yay!"}
      </ul>
    )
  }
}

const mapStateToProps = state => ({
  todos: state.todos
});

export default connect(mapStateToProps)(List);
