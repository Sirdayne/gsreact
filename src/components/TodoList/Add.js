import React, { Component } from 'react';
import { connect } from "react-redux";
import { addTodo } from "../../redux/actions";

class Add extends Component {
  constructor(props) {
    super(props)
    this.state = {
        text: ''
    }
    this.handleAddTodo = this.handleAddTodo.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
  }
  handleAddTodo = () => {
    this.props.addTodo(this.state.text);
    this.setState({ text: "" });
  }
  onChangeText(e) {
    this.setState({ text: e.target.value })
  }
  render() {
    return (
      <div className="todolist">
          <input value={this.state.text} onChange={this.onChangeText}/>
          <button className="add-todo" onClick={this.handleAddTodo}>
            Add
          </button>
      </div>
    )
  }
}

export default connect(
  null,
  { addTodo }
)(Add);
