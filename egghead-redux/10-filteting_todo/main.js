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

const FilterLink = ({ filter, currentFilter, children }) => {
  if (filter === currentFilter) {
    return <span>{children}</span>;
  }
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',

          filter,
        });
      }}
    >
      {children}
    </a>
  );
};

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
class TodoApp extends Component {
  render() {
    const { todos, visibilityFilter } = this.props;
    const visibleTodos = getVisibleTodos(todos, visibilityFilter);
    return (
      <div>
        <input
          ref={(node) => {
            this.input = node;
          }}
        ></input>
        <button
          onClick={() => {
            store.dispatch({
              type: 'ADD_TODO',
              text: this.input.value,
              id: nextTodoId++,
            });
            this.input.value = '';
          }}
        >
          Add Todo
        </button>
        <ul>
          {visibleTodos.map((todo) => (
            <li
              key={todo.id}
              onClick={() => {
                store.dispatch({ type: 'TOGGLE_TODO', id: todo.id });
              }}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.text}
            </li>
          ))}
        </ul>
        <p>
          Show:{' '}
          <FilterLink filter="SHOW_ALL" currentFilter={visibilityFilter}>
            All
          </FilterLink>{' '}
          <FilterLink filter="SHOW_ACTIVE" currentFilter={visibilityFilter}>
            Active
          </FilterLink>{' '}
          <FilterLink filter="SHOW_COMPLETED" currentFilter={visibilityFilter}>
            Completed
          </FilterLink>{' '}
        </p>
      </div>
    );
  }
}

const render = () => {
  console.log(store.getState());
  ReactDOM.render(
    <TodoApp {...store.getState()} />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();
