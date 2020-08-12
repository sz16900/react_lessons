const immutableReducer = (state = [0, 1, 2, 3, 4, 5], action) => {
  switch (action.type) {
    case 'REMOVE_ITEM':
      // don't mutate state here or the tests will fail
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1, state.length),
      ];
    default:
      return state;
  }
};

const removeItem = (index) => {
  return {
    type: 'REMOVE_ITEM',
    index,
  };
};

const store = Redux.createStore(immutableReducer);
