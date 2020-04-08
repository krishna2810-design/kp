const taskInitialState = [];
const taskReducer = (state = taskInitialState, action) => {
  switch (action.type) {
    case "GET_TASKS": {
      return [...action.payload];
    }
    case "ADD_TASK": {
      return [...state, action.payload];
    }
    case "UPDATE_TASK": {
      return state.map((task) => {
        if (task._id == action.payload._id) {
          return action.payload;
        }
        return task;
      });
    }
    default: {
      return [...state];
    }
  }
};
export default taskReducer;
