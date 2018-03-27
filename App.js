import React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { ButtonGroup, CheckBox } from 'react-native-elements';

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
    return (
      <View style={styles.container}>
        <ButtonGroup
          onPress={undefined}
          selectedIndex={undefined}
          buttons={['All', 'Done', 'To Do']}
          containerStyle={{height: 30}}
        />

        <TextInput 
          style={{height: 40, borderColor: 'gray', borderWidth: 1, marginHorizontal: 10, marginTop: 15}}
          onChangeText={ (text) => { 
            this.setState({ item: text }) 
            console.log(this.state.item);
          } }
        />

        <Button 
          style={{height: 40, alignSelf: 'flex-end'}}
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
});