import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache();
const client = new ApolloClient({
  link: createUploadLink({
    uri: 'http://192.168.1.72:5000/graphql'
    // uri: 'http://172.20.10.8:5000/graphql'
    // uri: 'http://192.168.99.102:5000/graphiql'  Fede
  }),
  cache,
});

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <ApolloProvider client={client}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </ApolloProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/play-background.jpg'),
        require('./assets/images/music-album.png'),
        require('./assets/images/music-album2.jpg'),
        require('./assets/images/lists-background.jpg'),
        require('./assets/images/home-background.jpg'),
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        'archivo-narrow': require('./assets/fonts/ArchivoNarrow-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
