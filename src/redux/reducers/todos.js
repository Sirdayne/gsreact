import { ADD_TODO, TOGGLE_TODO } from "../actionTypes";

const initialState = [
  {
    id: 0,
    content: "first todo"
  }
];

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return [
        ...state,
        action.payload
      ]
    }
    case TOGGLE_TODO: {
      return state
    }
    default:
      return state;
  }
}
