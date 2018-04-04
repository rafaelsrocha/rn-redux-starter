import React from 'react';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers.js';
import { TodoList, mapStateToProps, mapDispatchToProps } from './todo-list.js';


export default class App extends React.Component {
  render() {
    return (
      <Provider store={ createStore(rootReducer) }>
        <ConnectedTodoList />
      </Provider>
    );
  }
}

const ConnectedTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);