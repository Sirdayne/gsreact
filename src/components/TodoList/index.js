import React from 'react'
import Add from "./Add"
import List from "./List"
import Logout from "../../components/Logout"

const TodoList = () => (
  <div>
    <List />
    <Add />
    <Logout />
  </div>
)

export default TodoList;
