import React from 'react';
import { View, ScrollView, StyleSheet, Text, Button, ImageBackground } from 'react-native';
import { withNavigation } from 'react-navigation';

class InitialScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    response: '',
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/images/bg-1.jpg')}
          style={styles.imageContainer}
        >
          <View style={styles.artistContainer}>
            <View style={styles.artistDetailWrapper}>
              <Text style={styles.slogan}>LA MEJOR MÚSICA</Text>
              <Text style={styles.title}>TU MUSICA</Text>
            </View>
          </View>

          <Button
            onPress={this._navigate}
            title="Go to Login"
          />
        </ImageBackground>
      </View>
    );
  }
  _navigate = () => {
    this.props.navigation.navigate('LoginScreen');
  }
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
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 10,
    textAlign: 'center',
  },
  slogan: {
    fontSize: 22,
    color: '#fff',
    letterSpacing: 5,
    textTransform: 'capitalize',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default withNavigation(InitialScreen);