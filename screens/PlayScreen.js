import React from 'react';
import { StyleSheet, ImageBackground,
  View, Slider, Platform, TouchableWithoutFeedback } from 'react-native';
import { StyleText }  from '../components/StyleText';
import { Icon } from 'expo';
import { Audio } from 'expo-av';
import config from '../config';

export default class PlayScreen extends React.Component {
  static navigationOptions = {
    title: 'Playing from music',
  };
  state = {
    title: null,
    artist: null,
    currentPosition: 0,
    trackLength: 0,
    paused: false,
    song: null,
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground 
          source={require('../assets/images/play-background.jpg')}
          style={styles.imageContainer}
        >
          <View style={styles.albumContainer}>

          </View>
          <View style={styles.artistContainer}>
            <View style={styles.artistDetailWrapper}>
              <StyleText style={styles.artistTitle}>{this.state.title}</StyleText>
              <StyleText style={styles.artistText}>{this.state.artist}</StyleText>
            </View>
          </View>
          <View style={styles.sliderContainer}>
            {/* <View>
              @TODO Implement times
            </View> */}
            <Slider
              maximumValue={Math.max(this.state.trackLength, 1, this.state.currentPosition + 1)}
              value={this.state.currentPosition}
              style={styles.sliderStyle}
              minimumTrackTintColor='#fff'
              maximumTrackTintColor='rgba(255, 255, 255, 0.14)'
              thumbStyle={styles.sliderThumb}
              trackStyle={styles.sliderTrack}
            />
          </View>
          <View style={styles.controlContainer}>
            <View style={{ width: 40 }} />
            {/* <Icon.Ionicons 
              name={Platform.OS === 'ios' ? 'ios-skip-backward' : 'md-skip-backward'}
              size={45}
              color="white"
            /> */}
            <View style={{ width: 20 }} />
            {this.state.paused ?
              <TouchableWithoutFeedback onPress={() => this._playSong()}>
                <View style={styles.controlPlayButton}>
                  <Icon.Ionicons 
                    name={Platform.OS === 'ios' ? 'ios-play' : 'md-play'}
                    size={45}
                    color="white"
                  />
              </View>
              </TouchableWithoutFeedback> :
              <TouchableWithoutFeedback onPress={() => this._pauseSong()}>
                <View style={styles.controlPlayButton}>
                  <Icon.Ionicons 
                    name={Platform.OS === 'ios' ? 'ios-pause' : 'md-pause'}
                    size={45}
                    color="white"
                  />
                </View>
              </TouchableWithoutFeedback>
            }
            <View style={{ width: 20 }} />
            {/* <Icon.Ionicons 
              name={Platform.OS === 'ios' ? 'ios-skip-forward' : 'md-skip-forward'}
              size={45}
              color="white"
            /> */}
            <View style={{ width: 40 }} />
          </View>

        </ImageBackground>
      </View>
    );
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const song = navigation.getParam('song', null);
    if (!song) {
      alert('Choose one song to play');
      navigation.navigate('Home');
    }
    this.setState({ title: song.song_name, artist: song.artist, paused: false,  });
    this.song = new Audio.Sound();
    await this.song.loadAsync({ uri: `${config.TUMUSICA_URL}:3002/getfile/${song.path}` });
    const status = await this.song.getStatusAsync();
    this.setState({ trackLength: status.durationMillis ? status.durationMillis : 120 });
    await this.song.playAsync();
  }
  async _playSong() {
    const status = await this.song.getStatusAsync();
    if (status.isLoaded) {
      this.setState({ paused: false });
      await this.song.playAsync();
    }
  }
  async _pauseSong() {
    const status = await this.song.getStatusAsync();
    if (status.isLoaded) {
      this.setState({ paused: true });
      await this.song.pauseAsync();
    }
  }
  async componentWillUnmount() {
    await this.song.pauseAsync();
    await this.song.unloadAsync();
    this.song = null;
  }
  _pad(n, width, z=0) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
  _minutesAndSeconds = (position) => ([
    pad(Math.floor(position / 60), 2),
    pad(position % 60, 2),
  ]);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  albumContainer: {
    flex: 3.5,
    paddingLeft: 24,
    paddingRight: 24,
  },
  artistContainer: {
    flex: 1,
    paddingTop: 24,
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    paddingRight: 20,
  },
  artistDetailWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  artistTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  artistText: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 12,
    marginTop: 4,
  },
  sliderContainer: {
    flex: 0.5,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  sliderStyle: {
    marginTop: -12,
  },
  sliderTrack: {
    height: 2,
    borderRadius: 1,
  },
  sliderThumb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  controlContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  controlPlayButton: {
    height: 72,
    width: 72,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 72 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
