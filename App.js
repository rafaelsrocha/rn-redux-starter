import React from 'react';
import { AppRegistry, StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { ButtonGroup, CheckBox } from 'react-native-elements';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers.js';
import { addTodo } from './actions.js';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ createStore(rootReducer) }>
        <ConnectedTodoList />
      </Provider>
    );
  }
}

class TodoList extends React.Component {
  constructor() {
    super();
    this.state = {
      item: ' ',
    };
  }

  addItem = () => { 
    // console.log(this.state.item);
    addTodo(this.state.item);
  }

  render() {
    // console.log(">>>>>>> props: ");
    // console.log(this.props.todo);
    return (
      <View style={styles.container}>
        <ButtonGroup
          onPress={undefined}
          selectedIndex={undefined}
          buttons={['All', 'Done', 'To Do']}
          containerStyle={{height: 30}}
        />

        <TextInput 
          style={styles.textInput}
          onChangeText={ (text) => { 
            this.setState({ item: text }) 
            // console.log(this.state.item);
          } }
        />

        <Button 
          style={styles.button}
          title='Add'
          onPress={this.addItem}
        />

        <View style={styles.container}>
          <CheckBox
            title='Click Here'
            checked={true}
          />
          <CheckBox
            title='Click Here'
            checked={false}
          />
          <CheckBox
            title='Click Here'
            checked={true}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  textInput: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    marginHorizontal: 10, 
    marginTop: 15
  },
  button: {
    height: 40, 
    alignSelf: 'flex-end'
  }
});

function mapStateToProps(state) {
  return { 
    todos: state.todos, 
    visibilityFilter: state.visibilityFilter 
  }
}
const ConnectedTodoList = connect(mapStateToProps, null)(TodoList);