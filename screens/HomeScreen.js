import React from 'react';
import { FlatList, View, StyleSheet, ImageBackground, AsyncStorage, Button } from 'react-native';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
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
    ],
    listRefreshing: true,
  }
  componentDidMount() {
    /* this._getSongsData(); */
  }
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
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
            onRefresh={this._getSongsData}
            refreshing={this.state.listRefreshing}
          />
        </View>
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </ImageBackground>
    );
  }

  _getSongsData = async() => {
    this.setState({ listRefreshing: true });
    const response = await this.props.getSongs.refetch();
    console.log(response);
    this.setState({ listRefreshing: false });
  }
}
const GET_SONG = gql`
  query {
    songTest
  }
`;

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
});

export default compose (
  graphql(GET_SONG, {
    name: 'getSongs',
  }),
)(HomeScreen)