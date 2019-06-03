import React from 'react';
import { FlatList, View, StyleSheet, ImageBackground } from 'react-native';
import SongItem from '../components/SongItem';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'TU MUSICA',
  };
  constructor(props) {
    super(props);
  }
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
        source={require('../assets/images/home-background.jpg')}
        style={styles.backgroundStyle}
      >
        <View style={styles.container}>
          <FlatList 
            contentContainerStyle={styles.listContainer}
            data={this.state.albums}
            renderItem={
              ({ item }) => <SongItem title={item.title} subtitle={item.subtitle} />
            }
            numColumns={1}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ImageBackground>
    );
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
  backgroundStyle : {
    flex: 1,
    width: '100%',
    height: '100%',
  }
})
export default  HomeScreen;