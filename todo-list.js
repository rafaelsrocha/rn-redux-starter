import React from 'react';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';
import { ButtonGroup, CheckBox } from 'react-native-elements';
import { addTodo, toggleTodo, setVisibilityFilter } from './actions.js';

export class TodoList extends React.Component {
  constructor() {
    super();
    this.state = {
      item: '',
      selectedFilter: 0
    };
  }

  addItem = () => { 
    this.props.addTodo(this.state.item);
    this.setState({ item: '' });
    this._textInput.setNativeProps({ text: '' });
  }

  toggleItem = (item) => { 
    this.props.toggleTodo(item.id);
  }

  selectIndex = (index) => {
    this.setState({ selectedFilter: index });

    let visibilityFilter = 'SHOW_ALL';
    if (index == 1) {
      visibilityFilter = 'SHOW_COMPLETED';
    } else if (index == 2) {
      visibilityFilter = 'SHOW_ACTIVE';
    }
    this.props.setVisibilityFilter(visibilityFilter);
  }

  render() {
    return (
      <View style={styles.container}>
        <ButtonGroup
          onPress={ this.selectIndex }
          selectedIndex={ this.state.selectedFilter }
          buttons={ ['All', 'Done', 'To Do'] }
          containerStyle={ {height: 30} }
        />

        <TextInput 
          ref={ component => this._textInput = component }
          style={ styles.textInput }
          onChangeText={ (text) => { this.setState({ item: text }) } }
        />

        <Button 
          style={ styles.button }
          title='Add'
          onPress={ this.addItem }
        />

        <View style={ styles.container }>
        
        <FlatList
          data={ this.props.todos }
          renderItem={ ({ item })  => (
            <CheckBox
              key={ item.id }
              title={ item.text }
              checked={ item.completed }
              onPress={ () => this.toggleItem(item) }
            />
          )}
          keyExtractor={ item => item.id }
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

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    case 'SHOW_ALL':
    default:
      return todos;
  }
}

export const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter),
  visibilityFilter: state.visibilityFilter 
})

export const mapDispatchToProps = dispatch => { 
	return bindActionCreators({
		addTodo: addTodo,
		toggleTodo: toggleTodo,
		setVisibilityFilter: setVisibilityFilter
  }, dispatch);
}