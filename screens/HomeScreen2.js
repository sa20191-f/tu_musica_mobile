import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Button
} from 'react-native';
import { graphql, compose, Mutation } from 'react-apollo';
import { ReactNativeFile } from 'apollo-upload-client';
import { FileSystem, DocumentPicker } from 'expo';
import gql from 'graphql-tag';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    response: '',
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Mutation mutation={TEST_FILE}>
          {(uploadSongMutation) => 
            <Button
              onPress={() => this._onPressLearnMore(uploadSongMutation)}
              title="Learn More"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          }
        </Mutation>
        </ScrollView>
      </View>
    );
  }

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
  }
}
const TEST_API = gql`
query {
  songTest
}
`
const TEST_FILE = gql`
  mutation uploadSong($file: Upload!) {
    uploadSong(file: $file) {
      filename
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
});

export default compose(
  graphql(TEST_API, {
    name: 'testApi',
  }),
  graphql(TEST_FILE, {
    name: 'testFile',
  }),
)(HomeScreen);
