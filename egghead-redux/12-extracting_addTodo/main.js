// This function is just for creating or updating a single todo
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };
    case 'TOGGLE_TODO':
      // Use the map function to produce a new array (do not change original)
      if (state.id !== action.id) {
        return state;
      }
      return { ...state, completed: !state.completed };

    default:
      return state;
  }
};

// This function is concerned with the state array
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todo(undefined, action)];
    case 'TOGGLE_TODO':
      // Use the map function to produce a new array (do not change original)
      return state.map((t) => todo(t, action));

    default:
      return state;
  }
};

// Visibility Filter
const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

// This is so common that Redux has it in its package
const { combineReducers } = Redux;
const todoApp = combineReducers({ todos, visibilityFilter });

const { createStore } = Redux;
const store = createStore(todoApp);

// Here's the React part

const { Component } = React;

const FilterLink = ({ filter, currentFilter, children, onClick }) => {
  if (filter === currentFilter) {
    return <span>{children}</span>;
  }
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick(filter);
      }}
    >
      {children}
    </a>
  );
};

//  Here Presentational Components

const Footer = (visibilityFilter, onFilterClick) => (
  <p>
    Show:{' '}
    <FilterLink
      filter="SHOW_ALL"
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      All
    </FilterLink>{' '}
    <FilterLink
      filter="SHOW_ACTIVE"
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      Active
    </FilterLink>{' '}
    <FilterLink
      filter="SHOW_COMPLETED"
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      Completed
    </FilterLink>{' '}
  </p>
);

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none',
    }}
  >
    {text}
  </li>
);

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map((todo) => (
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    ))}
  </ul>
);

const AddTodo = ({ onAddClick }) => {
  let input;
  return (
    <div>
      {' '}
      <input
        ref={(node) => {
          input = node;
        }}
      ></input>
      <button
        onClick={() => {
          onAddClick(input.value);
          input.value = '';
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

// end of Presentational

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter((t) => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter((t) => !t.completed);
  }
};

let nextTodoId = 0;
const TodoApp = ({ todos, visibilityFilter }) => (
  <div>
    <AddTodo
      onAddClick={(text) =>
        store.dispatch({ type: 'ADD_TODO', id: nextTodoId++, text })
      }
    />
    <TodoList
      todos={getVisibleTodos(todos, visibilityFilter)}
      onTodoClick={(id) => store.dispatch({ type: 'TOGGLE_TODO', id })}
    />
    <Footer
      visibilityFilter={visibilityFilter}
      onFilterClick={(filter) =>
        store.dispatch({ type: 'SET_VISIBILITY_FILTER', filter })
      }
    />
  </div>
);

const render = () => {
  console.log(store.getState());
  ReactDOM.render(
    <TodoApp {...store.getState()} />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();
