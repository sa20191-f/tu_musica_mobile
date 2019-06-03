import React from 'react';
import { StyleSheet, FlatList, View, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
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
      <ImageBackground
        source={require('../assets/images/lists-background.jpg')}
        style={styles.backgroundStyle}
      >
        <View style={styles.container}>
          <Button
            title='Add List'
            style={styles.buttonStyle}
          />
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
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'rgba(0,0,0,0.7)',
  },
  listContainer: { 
    flexGrow: 1,
  },
  buttonStyle: {
    margin: 10,
  },
  backgroundStyle : {
    flex: 1,
    width: '100%',
    height: '100%',
  }
})
export default ListScreen;