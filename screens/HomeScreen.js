import React from 'react';
import { FlatList, View, StyleSheet, ImageBackground, AsyncStorage, Platform, Modal, 
  TextInput , Alert } from 'react-native';
import { graphql, compose, Mutation } from 'react-apollo';
import { Permissions, Notifications } from 'expo';
import { DocumentPicker } from 'expo';
import * as FileSystem from 'expo-file-system';
import { ReactNativeFile } from 'apollo-upload-client';
import { Button, Input } from 'react-native-elements';
import gql from 'graphql-tag';
import SongItem from '../components/SongItem';
import ListScreen from './ListScreen';
import config from '../config';

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
    modalVisible: false,
    itemSelected: null,
    alertShowed: false,
    loader: false,
    boxVisible: false,
    infoSong: {
      path: '',
      song_name: '',
      artist: '',
    },
  }
  async componentDidMount() {
    this._getSongsData();
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }
    let tokenPush = await Notifications.getExpoPushTokenAsync();
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
    const token = {
      userID: await AsyncStorage.getItem('userId'),
      tokenType: 1,
      token: tokenPush,
    }
    
    await this.props.addMutation({
      variables: { token }
    });
    
  }
  _handleNotification = (notification) => {
    console.log(`SOY UN ${Platform.OS}`);
    console.log(notification);
    if (!this.state.alertShowed) {
      this.setState({ alertShowed: true });
      Alert.alert(
        notification.data.title,
        notification.data.body,
        [
          { text: 'OK', onPress: () => this.setState({ alertShowed: false }) },
        ],
        { cancelable: false }
      )
    }
    
  };
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
                onPress={() => this._onPressAddSong(uploadSongMutation)}
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
                onPressCard={() => this._onPressSong(item)}
                onPressIcon={() => this._onPressAddToList(item)}
              />
            }
            numColumns={1}
            keyExtractor={(item, index) => index.toString()}
            onRefresh={this._getSongsData}
            refreshing={this.state.listRefreshing}
          />
        </View>
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
            <ListScreen itemSelected={this.state.itemSelected} cancel={() => this.setState({
              modalVisible: false,
            })} />
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.boxVisible}
          onRequestClose={() => {}}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                padding: 10,
                height: 180,
                width: 300,
                backgroundColor: "#fff",
                borderRadius: 15,
              }}
            >
              <Input
                placeholder='Nombre de cancion'
                onChangeText={(text) => this.setState({ infoSong: { ...this.state.infoSong, song_name: text } })}
                value={this.state.infoSong.song_name}
              />
              <Input
                placeholder='Artista'
                onChangeText={(text) => this.setState({ infoSong: { ...this.state.infoSong, artist: text } })}
                value={this.state.infoSong.artist}
              />
              <Button
                onPress={() => this._uploadSong()}
                title='Subir canción'
                style={styles.buttonStyle}
              />
            </View>
          </View>
        </Modal>
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
  _uploadSong = async() => {
    this.setState({ boxVisible: false });
    const infoSong = this.state.infoSong;
    await this.props.uploadSong({
      variables: { infoSong },
    });
    this.setState({
      infoSong: {
        path: '',
        song_name: '',
        artist: '',
      }
    })
  }
  _onPressAddSong = async(mutation) => {
    const song = await DocumentPicker.getDocumentAsync();
    const info = await FileSystem.getInfoAsync(song.uri);
    let data = new FormData();
    const file = new ReactNativeFile({
      uri: info.uri,
      name: 'My song',
      type: 'audio/mp3'
    });
    data.append("myFile", file);
    fetch(`${config.TUMUSICA_URL}:3002/upload_song`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: data,
    }).then(async response => {
      if (response.ok) {
        response.json().then(async json => {
          this.setState({ 
            infoSong: { ...this.state.infoSong, path: json.filename },
            boxVisible: true,
            uploadSong: mutation,
          });
        });
      }
    }).catch(element => console.log("error",element));
  };

  _onPressSong(item) {
    this.props.navigation.navigate('Play', {
      song: item,
    });
  };
  _onPressAddToList(item) {
    this.setState({ modalVisible: true, itemSelected: item });
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
  mutation uploadInfoSong($infoSong : InfoSongInput!) {
    uploadInfoSong(infoSong: $infoSong) {
      song_name
      artist
    }
  }
`;
const ADD_TOKEN = gql`
  mutation addToken($token: TokenInput!) {
    addToken(token: $token)
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
  graphql(ADD_TOKEN, {
    name: 'addMutation'
  }),
  graphql(UPLOAD_SONG, {
    name: 'uploadSong'
  }),
)(HomeScreen)