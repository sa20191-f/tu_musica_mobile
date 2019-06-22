import React from 'react';
import { FlatList, View, StyleSheet, ImageBackground, AsyncStorage } from 'react-native';
import { graphql, compose, Mutation } from 'react-apollo';
import { FileSystem, DocumentPicker } from 'expo';
import { ReactNativeFile } from 'apollo-upload-client';
import { Button } from 'react-native-elements';
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
    songs: [],
    listRefreshing: true,
  }
  componentDidMount() {
    this._getSongsData();
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
          <Mutation mutation={UPLOAD_SONG}>
            {(uploadSongMutation) => 
              <Button
                onPress={() => this._onPressLearnMore(uploadSongMutation)}
                title='Agregar canción'
                style={styles.buttonStyle}
              />
            }
          </Mutation>
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={this.state.songs}
            renderItem={
              ({ item }) =>
              <SongItem
                title={item.artist}
                subtitle={item.song_name}
              />
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
    if (response) {
      this.setState({ songs: response.data.songs });
    }
    this.setState({ listRefreshing: false });
  };

  _onPressLearnMore = async(mutation) => {
    const song = await DocumentPicker.getDocumentAsync();
    const infoSong = await FileSystem.getInfoAsync(song.uri);
    const file = new ReactNativeFile({
      uri: infoSong.uri,
      name: song.name,
      type: 'audio/mp3'
    });
    mutation({
      variables: { file },
    });
    await this._getSongsData();
  };
}
const GET_SONG = gql`
  query {
    songs {
      id
      path
      song_name
      artist
    }
  }
`;

const UPLOAD_SONG = gql`
  mutation uploadSong($file: Upload!) {
    uploadSong(file: $file) {
      filename
    }
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
  },
  buttonStyle: {
    margin: 10,
  }
});

export default compose (
  graphql(GET_SONG, {
    name: 'getSongs',
  }),
)(HomeScreen)