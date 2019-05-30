import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { graphql, compose } from 'react-apollo';
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
        </ScrollView>
      </View>
    );
  }

  componentDidMount() {
    fetch('http://192.168.1.57:3004/api/test').then(response => {
      console.log('ES LA PRIMERA');
      console.log(response);
    }).catch(e =>  console.log(e));
    this.props.testApi.refetch().then(response => {
      console.log('ES LA SEGUNDA');
      console.log(response);
    }).catch(e =>  console.log(e));
  }
}
const TEST_API = gql`
query {
  songTest
}
`

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
)(HomeScreen);
