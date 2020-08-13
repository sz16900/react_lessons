const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ];
    case 'TOGGLE_TODO':
      // Use the map function to produce a new array (do not change original)
      return state.map((todo) => {
        if (todo.id !== action.id) {
          return todo;
        }
        return { ...todo, completed: !todo.completed };
      });

    default:
      return state;
  }
};

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn React',
  };

  const stateAfter = [{ id: 0, text: 'Learn React', completed: false }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(todos(stateBefore, action)).toEqual(stateAfter);
};

const testToggleTodo = () => {
  const stateBefore = [
    { id: 0, text: 'Learn React', completed: false },
    { id: 1, text: 'Go fishing', completed: false },
  ];

  const action = { type: 'TOGGLE_TODO', id: 1 };

  const stateAfter = [
    { id: 0, text: 'Learn React', completed: false },
    { id: 1, text: 'Go fishing', completed: true },
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(todos(stateBefore, action)).toEqual(stateAfter);
};

testAddTodo();
testToggleTodo();
console.log('Test Passed');
