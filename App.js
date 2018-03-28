import React from 'react';
import { AppRegistry, StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { ButtonGroup, CheckBox } from 'react-native-elements';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers.js';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      item: ' ',
    };
  }

  addItem = () => { 
    console.log(this.state.item);
  }

  render() {
    console.log(this.props.todos);
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
            console.log(this.state.item);
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

const store = createStore(rootReducer);
const AppContainer = () =>
  <Provider store={store}>
    <App />
  </Provider>

AppRegistry.registerComponent('AppContainer', () => AppContainer);

// function mapStateToProps(state) {
//   return { 
//     todos: state.todos, 
//     visibilityFilter: state.visibilityFilter 
//   }
// }
// connect(mapStateToProps, null)(AppContainer);