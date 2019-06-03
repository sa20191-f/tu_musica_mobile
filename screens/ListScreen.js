import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import ListItem from '../components/ListItem';

class ListScreen extends React.Component {
  static navigationOptions = {
    title: 'Your Lists',
  };
  state = {
    albums: [
      {
        title: 'Hola',
        subtitle: 'Que mas pues',
      },
      {
        title: 'Todo',
        subtitle: 'Bien y usted',
      },
      {
        title: 'La puteria',
        subtitle: 'Pana',
      },
      {
        title: 'Hola',
        subtitle: 'Que mas pues',
      }, 
    ]
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={this.state.albums}
          renderItem={
            ({ item }) => <ListItem title={item.title} subtitle={item.subtitle} />
          }
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  listContainer: { 
    backgroundColor: 'yellow'
  }
})
export default ListScreen;