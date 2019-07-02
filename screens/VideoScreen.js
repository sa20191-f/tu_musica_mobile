import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

class VideoScreen extends React.Component {
  static navigationOptions = {
    title: 'Buscar videos',
  };
  state = {
    video: '',
  }
  render() {
    return (
      <ImageBackground
        source={require('../assets/images/home-background.jpg')}
        style={styles.backgroundStyle}
      >
        <View style={styles.container}>
          <Input
            placeholder='Busque su video aca'
            onChangeText={(text) => this.setState({ video: text })}
            value={this.state.video}
            label="Busque su video"
            labelStyle={{ color: "#fff" }}
            inputStyle={{ color: "#fff" }}
          />
          <Button
            title='Buscar vídeo'
            style={styles.buttonStyle}
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
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10
  },
  backgroundStyle : {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonStyle: {
    marginTop: 10,
    width: '70%'
  }
});

export default VideoScreen;