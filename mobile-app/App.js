import React from 'react';
import { StyleSheet, Text, View, FlatList, ToolbarAndroid } from 'react-native';

export default class App extends React.Component {
  render() {
    var menuItems = [];
    for (var i = 0; i < 100; i++) {
      menuItems.push({
        key: i,
        name: "Menu item name " + i,
      });
    }
    return (
      <View>
        <ToolbarAndroid
          title="Family Menu"
          actions={[{title: 'Settings', show: 'always'}]}
          onActionSelected={this.onActionSelected} 
          style={styles.toolbar}/>      
        <FlatList
          data={menuItems}
          renderItem={({item}) => <Text>{item.name}</Text>}
        />
      </View>
    );
  }

  onActionSelected (position) {
    if (position === 0) { // index of 'Settings'
      // do something
    }
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbar: {
    backgroundColor: '#2196F3',
    height: 56,
    alignSelf: 'stretch',
  },
});
